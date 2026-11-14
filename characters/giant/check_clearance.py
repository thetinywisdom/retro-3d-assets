"""Clearance checks for every clip in giant_rig.blend.

    blender -b giant_rig.blend --python check_clearance.py

1. Head vs torso: how far the head's bottom face dips below the torso top.
2. All block pairs: every *_fill mesh is a set of convex boxes; points sampled
   on each box surface are tested against every other part's boxes. Parts
   that already touch at rest (joints) are judged by how much deeper they go
   than at rest. Reports the worst extra penetration per clip, in mm, split
   into joints (blocks on neighbouring bones, e.g. pelvis/torso at the waist,
   which overlap a little whenever the body bends) and everything else
   (limb into torso, hand into head, ...), which should stay ~0.
"""
import bpy, numpy as np
arm = bpy.data.objects['Giant']; sc = bpy.context.scene
head = bpy.data.objects['head_fill']; torso = bpy.data.objects['torso_fill']
tv = [v.co for v in torso.data.vertices]
top = max(v.z for v in tv)
bot = sorted(head.data.vertices, key=lambda v: v.co.z)[:4]
bot = sorted(bot, key=lambda v: (round(v.co.y, 3), v.co.x))
a, b, c, d = [v.co.copy() for v in bot]
grid = [a.lerp(b, i / 20).lerp(c.lerp(d, i / 20), j / 20) for i in range(21) for j in range(21)]

parts = [o for o in bpy.data.objects if o.type == 'MESH' and o.name.endswith('_fill')]


def boxes(ob):
    """(local corner arrays, local face index lists) for each 8-vert box in the mesh."""
    V = np.array([v.co[:] for v in ob.data.vertices])
    polys = [list(p.vertices) for p in ob.data.polygons]
    out = []
    for k in range(len(V) // 8):
        fs = [p for p in polys if min(p) >= 8 * k and max(p) < 8 * k + 8]
        out.append((V[8 * k:8 * k + 8], fs))
    return out


def surface_points(corners, fs, n=6):
    pts = []
    for f in fs:
        q = corners[[i - (min(min(ff) for ff in fs)) for i in f]]
        for i in range(n + 1):
            for j in range(n + 1):
                u, v = i / n, j / n
                pts.append((q[0] * (1 - u) + q[1] * u) * (1 - v) + (q[3] * (1 - u) + q[2] * u) * v)
    return np.array(pts)


B = {o.name: boxes(o) for o in parts}
P = {o.name: np.vstack([surface_points(cn, fs) for cn, fs in B[o.name]]) for o in parts}


def planes(cn, fs, M):
    base = min(min(f) for f in fs)
    W = (M @ np.c_[cn, np.ones(8)].T).T[:, :3]
    ctr = W.mean(0); out = []
    for f in fs:
        q = W[[i - base for i in f]]
        nrm = np.cross(q[1] - q[0], q[2] - q[0]); nrm /= np.linalg.norm(nrm)
        if np.dot(nrm, ctr - q[0]) > 0: nrm = -nrm
        out.append((nrm, np.dot(nrm, q[0])))
    return out


def depth_table():
    Ms = {o.name: np.array(o.matrix_world) for o in parts}
    W = {n: (Ms[n] @ np.c_[P[n], np.ones(len(P[n]))].T).T[:, :3] for n in P}
    PL = {n: [planes(cn, fs, Ms[n]) for cn, fs in B[n]] for n in P}
    t = {}
    for na in P:
        for nb in P:
            if na == nb: continue
            best = 0.0
            for pl in PL[nb]:
                ds = np.stack([W[na] @ n_ - d_ for n_, d_ in pl], 1)      # <0 inside
                inside = (ds < 0).all(1)
                if inside.any(): best = max(best, float((-ds[inside]).min(1).max()))
            t[(na, nb)] = best
    return t


bones = arm.data.bones
def anc(b, k=3):
    out = []
    while b.parent and k: b = b.parent; out.append(b.name); k -= 1
    return out
def is_joint(na, nb):
    ba, bb = bones[bpy.data.objects[na].parent_bone], bones[bpy.data.objects[nb].parent_bone]
    return (bb.name in anc(ba, 2) or ba.name in anc(bb, 2) or
            (ba.parent and bb.parent and ba.parent.name == bb.parent.name))

arm.animation_data.action = None
for pb in arm.pose.bones:
    pb.rotation_quaternion = (1, 0, 0, 0); pb.location = (0, 0, 0); pb.scale = (1, 1, 1)
sc.frame_set(0); bpy.context.view_layer.update()
rest = depth_table()
only = set(a for a in __import__('sys').argv[__import__('sys').argv.index('--') + 1:]) if '--' in __import__('sys').argv else None
for act in bpy.data.actions:
    if only and act.name not in only: continue
    arm.animation_data.action = act
    worst_h = -1e9; worst = (0.0, None, None); wj = (0.0, None, None)
    for f in range(int(act.frame_range[0]), int(act.frame_range[1]) + 1):
        sc.frame_set(f)
        M = torso.matrix_world.inverted() @ head.matrix_world
        pts = [M @ p for p in grid]
        worst_h = max(worst_h, max([top - p.z for p in pts if abs(p.x) < 0.25 and -0.15 < p.y < 0.12] or [-1]))
        for k, v in depth_table().items():
            extra = v - rest[k]
            if is_joint(*k):
                if extra > wj[0]: wj = (extra, k, f)
            elif extra > worst[0]: worst = (extra, k, f)
    print(f'CLEARANCE {act.name}: head below torso top {worst_h*1000:.1f} mm (<=0 ok); '
          f'non-joint extra penetration {worst[0]*1000:.1f} mm {worst[1]} @f{worst[2]}; '
          f'joint {wj[0]*1000:.1f} mm {wj[1]} @f{wj[2]}')
