"""Giant (PVM-20M4E TV head) as a minimal, rigged, animated hologram asset.

    blender -b --python build_giant.py

Builds giant_rig.blend and giant.glb next to this file.
Look: plain blocky shapes like the <retro-map> TVs (faint fill + bright
edges), proportions taken from dir4 (Giant). Design units below are the
dir4 units (1 = 100 mm); everything is written out in metres (x0.1).
Character faces -Y in Blender (= +Z in glTF / three.js), Z up (= Y up).
"""
import bpy, bmesh, math, os, sys
from mathutils import Vector, Matrix, Euler, Quaternion

HERE = os.path.dirname(os.path.abspath(__file__))
S = 0.1                                  # dir4 units -> metres
GREEN = (0.266, 1.0, 0.323)              # #8dff9a, linear
EYE_WHITE = (0.75, 1.0, 0.8)
FPS = 30
R = math.radians


def V(*a):
    return Vector(a[0] if len(a) == 1 else a)


# ------------------------------------------------------------------ scene --
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.fps = FPS
sc.world = bpy.data.worlds.new('World')


def coll(name):
    c = bpy.data.collections.new(name)
    sc.collection.children.link(c)
    return c


C_HEAD, C_BODY, C_EYES, C_EDGES, C_FX = (coll(n) for n in ('head', 'body', 'eyes', 'edges', 'fx'))


def pmat(name, alpha, strength=1.0, color=GREEN):
    """Simple emissive material. Base colour = emission colour so glTF lines
    (which three.js reads from baseColor) come out green too."""
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*color, 1)
    b.inputs['Emission Color'].default_value = (*color, 1)
    b.inputs['Emission Strength'].default_value = strength
    b.inputs['Alpha'].default_value = alpha
    b.inputs['Roughness'].default_value = 1.0
    b.inputs['Metallic'].default_value = 0.0
    m.blend_method = 'BLEND' if alpha < 1 else 'OPAQUE'
    m.use_backface_culling = False
    return m


M_FILL = pmat('holo_fill', 0.10)
M_SCREEN = pmat('holo_screen', 0.22)
M_EDGE = pmat('holo_edge', 1.0)
M_EYE = pmat('holo_eye', 1.0, 2.0, EYE_WHITE)
M_FX = pmat('holo_fx', 0.6)


# ------------------------------------------------------------- geometry --
CUBE = [V(((i >> 2) & 1) - 0.5, ((i >> 1) & 1) - 0.5, (i & 1) - 0.5) for i in range(8)]
CUBE_F = [(0, 1, 3, 2), (4, 6, 7, 5), (0, 4, 5, 1), (2, 3, 7, 6), (0, 2, 6, 4), (1, 5, 7, 3)]
CUBE_E = [(i, j) for i in range(8) for j in range(i + 1, 8) if bin(i ^ j).count('1') == 1]


class Part:
    """Fill faces + edge lines for one bone. Points are given in dir4 units."""
    def __init__(self, name, bone, coll_=C_BODY, mat=M_FILL):
        self.name, self.bone, self.coll, self.mat = name, bone, coll_, mat
        self.v, self.f, self.ev, self.e = [], [], [], []

    def box(self, size, center, rot=(0, 0, 0), deform=None, M=None):
        R3 = Euler(rot).to_matrix()
        pts = []
        for c in CUBE:
            p = V(c.x * size[0], c.y * size[1], c.z * size[2])
            p = R3 @ p + V(center)
            if deform: p = deform(p)
            if M is not None: p = M @ p
            pts.append(p * S)
        o = len(self.v); self.v += pts
        self.f += [tuple(o + i for i in f) for f in CUBE_F]
        o = len(self.ev); self.ev += pts
        self.e += [(o + i, o + j) for i, j in CUBE_E]

    def limb(self, p1, p2, w, d, ext=0.0):
        """Box between two joints, w wide (x), d deep."""
        p1, p2 = V(p1), V(p2)
        z = (p2 - p1).normalized()
        x = (V(1, 0, 0) - z * z.x).normalized()
        y = z.cross(x)
        R3 = Matrix((x, y, z)).transposed()
        L = (p2 - p1).length + 2 * ext
        e = R3.to_euler()
        self.box((w, d, L), (p1 + p2) / 2, rot=e)

    def build(self, arm):
        me = bpy.data.meshes.new(self.name + '_fill')
        me.from_pydata([tuple(p) for p in self.v], [], self.f)
        bm = bmesh.new(); bm.from_mesh(me)
        bmesh.ops.recalc_face_normals(bm, faces=bm.faces); bm.to_mesh(me); bm.free()
        for ed in me.edges: ed.use_freestyle_mark = True       # preview renders only
        me.materials.append(self.mat)
        ob = new_obj(self.name + '_fill', me, self.coll, arm, self.bone)
        me2 = bpy.data.meshes.new(self.name + '_edges')
        me2.from_pydata([tuple(p) for p in self.ev], self.e, [])
        me2.materials.append(M_EDGE)
        ob2 = new_obj(self.name + '_edges', me2, C_EDGES, arm, self.bone)
        return ob, ob2


def new_obj(name, data, coll_, arm=None, bone=None, mw=None):
    ob = bpy.data.objects.new(name, data)
    coll_.objects.link(ob)
    if arm is not None:
        ob.parent = arm
        if bone:
            ob.parent_type = 'BONE'; ob.parent_bone = bone
        bpy.context.view_layer.update()
        ob.matrix_world = mw if mw is not None else Matrix.Identity(4)
    return ob


# ------------------------------------------------------------- the rig --
# joints (dir4 units), mirrored for L (+X, the character's left) and R (-X)
HEAD_PIVOT = V(0, 0.05, 6.78)
HEAD_TILT = Euler((R(5), 0, R(3)))         # same gentle tilt as dir4
MH = Matrix.Translation(HEAD_PIVOT) @ HEAD_TILT.to_matrix().to_4x4()   # head local -> world (dir4)
SCR_C, SCR_W, SCR_H = V(0, -1.905, 2.76), 3.86, 2.92                   # screen, head local
EYE_CY = 0.10 * SCR_H                                                   # eye line above screen centre
MOUTH_CY = -0.27 * SCR_H


def arm_pts(s):
    sh = V(s * 2.85, -0.05, 5.85); el = V(s * 3.25, -0.25, 4.15); wr = V(s * 3.2, -0.7, 2.75)
    return sh, el, wr


def leg_pts(s):
    hip = V(s * 1.08, 0.05, 2.55); kn = V(s * 1.18, -0.12, 1.6); an = V(s * 1.2, 0.0, 0.62)
    return hip, kn, an


screen_up = (HEAD_TILT.to_matrix() @ V(0, 0, 1))
eyes_pos = MH @ (SCR_C + V(0, -0.02, EYE_CY))
mouth_pos = MH @ (SCR_C + V(0, -0.02, MOUTH_CY))

BONES = [  # name, head, tail, parent
    ('root', V(0, 0, 0), V(0, 0, 1.0), None),
    ('hips', V(0, 0.05, 2.75), V(0, 0.05, 3.1), 'root'),
    ('spine', V(0, 0.05, 3.1), V(0, 0.1, 4.0), 'hips'),
    ('chest', V(0, 0.1, 4.0), V(0, -0.05, 6.45), 'spine'),
    ('neck', V(0, -0.05, 6.45), HEAD_PIVOT, 'chest'),
    ('head', HEAD_PIVOT, MH @ V(0, 0, 2.3), 'neck'),
    ('eyes_ctrl', eyes_pos, eyes_pos + screen_up * 0.5, 'head'),
    ('mouth_ctrl', mouth_pos, mouth_pos + screen_up * 0.5, 'head'),
    # eyes the site switches in code sit on eyes_code; each expression clip
    # shows its own copy of the eyes on clip_eyes_<name>_ctrl (scale 0 / 1)
    ('eyes_code', eyes_pos, eyes_pos + screen_up * 0.5, 'eyes_ctrl'),
]
CLIP_EXPRS = ['happy', 'surprised', 'sad', 'thinking', 'wink', 'angry', 'dizzy']
BONES += [(f'clip_eyes_{e}_ctrl', eyes_pos, eyes_pos + screen_up * 0.5, 'eyes_ctrl') for e in CLIP_EXPRS]
for side, s in (('L', 1), ('R', -1)):
    sh, el, wr = arm_pts(s)
    hip, kn, an = leg_pts(s)
    BONES += [
        (f'shoulder_{side}', V(s * 0.9, -0.05, 5.85), sh, 'chest'),
        (f'upper_arm_{side}', sh, el, f'shoulder_{side}'),
        (f'forearm_{side}', el, wr, f'upper_arm_{side}'),
        (f'hand_{side}', wr, wr + V(0, -0.15, -0.9), f'forearm_{side}'),
        (f'thigh_{side}', hip, kn, 'root'),
        (f'shin_{side}', kn, an, f'thigh_{side}'),
        (f'foot_{side}', an, V(s * 1.2, -1.1, 0.25), f'shin_{side}'),
    ]

arm_data = bpy.data.armatures.new('Giant_rig')
arm = bpy.data.objects.new('Giant', arm_data)
sc.collection.objects.link(arm)
bpy.context.view_layer.objects.active = arm
arm.select_set(True)
bpy.ops.object.mode_set(mode='EDIT')
for name, h, t, par in BONES:
    b = arm_data.edit_bones.new(name)
    b.head, b.tail = h * S, t * S
    b.roll = 0
    if par:
        b.parent = arm_data.edit_bones[par]
        b.use_connect = False
bpy.ops.object.mode_set(mode='OBJECT')
for pb in arm.pose.bones:
    pb.rotation_mode = 'QUATERNION'

# ------------------------------------------------------------- body parts --
parts = {}
def P(name, bone, **k):
    parts[name] = Part(name, bone, **k); return parts[name]

for side, s in (('L', 1), ('R', -1)):
    sh, el, wr = arm_pts(s)
    hip, kn, an = leg_pts(s)
    p = P(f'foot_{side}', f'foot_{side}')
    p.box((1.35, 1.9, 0.5), (s * 1.2, -0.3, 0.25))
    p = P(f'shin_{side}', f'shin_{side}')
    p.box((1.08, 1.08, 1.05), (s * 1.19, -0.06, 1.05))       # shin
    p.box((1.26, 1.26, 0.30), (s * 1.18, -0.12, 1.6))        # knee band
    p = P(f'thigh_{side}', f'thigh_{side}')
    p.limb(kn, hip, 1.02, 1.02, ext=-0.12)
    p = P(f'shoulder_{side}', f'shoulder_{side}')
    p.box((1.0, 1.56, 1.56), sh)                             # pauldron
    p = P(f'upper_arm_{side}', f'upper_arm_{side}')
    p.limb(sh, el, 0.80, 0.80, ext=0.22)
    p = P(f'forearm_{side}', f'forearm_{side}')
    p.limb(el, wr, 0.92, 0.92, ext=0.18)
    p = P(f'hand_{side}', f'hand_{side}')
    p.box((0.95, 0.9, 1.05), wr + V(0, -0.2, -0.6))

p = P('pelvis', 'hips')
p.box((3.3, 2.1, 0.95), (0, 0.05, 2.75))

def torso_deform(v):
    v = v.copy()
    if v.z > 5.0: v.y -= 0.25             # gently hunched forward at the top
    if v.z < 4.0: v.x *= 0.82             # narrower at the waist
    return v

p = P('torso', 'chest')
p.box((5.0, 2.7, 3.3), (0, 0.1, 4.85), deform=torso_deform)
p.box((2.6, 0.06, 1.4), (0, -1.44, 5.2), rot=(R(4.3), 0, 0))   # one plain chest panel
p = P('neck', 'neck')
p.box((1.4, 1.4, 0.4), (0, -0.05, 6.6))

# head: a plain box (the 20M4E case) and a screen rectangle on its front
p = P('head', 'head', coll_=C_HEAD)
p.box((4.5, 3.8, 4.58), (0, 0, 2.29), M=MH)

built = {}
for name, part in parts.items():
    built[name] = part.build(arm)

# screen: one quad, brighter fill; its outline joins head_edges
sw, sh_ = SCR_W / 2, SCR_H / 2
q = [MH @ (SCR_C + V(x, 0, z)) * S for x, z in ((-sw, -sh_), (sw, -sh_), (sw, sh_), (-sw, sh_))]
me = bpy.data.meshes.new('screen')
me.from_pydata([tuple(v) for v in q], [], [(0, 1, 2, 3)])
for ed in me.edges: ed.use_freestyle_mark = True
me.materials.append(M_SCREEN)
new_obj('screen', me, C_HEAD, arm, 'head')
he = built['head'][1].data
n0 = len(he.vertices)
he.vertices.add(4); he.edges.add(4)
for i, v in enumerate(q): he.vertices[n0 + i].co = v
for i in range(4): he.edges[len(he.edges) - 4 + i].vertices = (n0 + i, n0 + (i + 1) % 4)
he.update()

# -------------------------------------------------------- eye expressions --
# 2D shapes on the screen, in dir4 units, x = viewer's right, y = screen up,
# relative to the eye line. Bold strokes so they read at ~100-150 px tall.
EX = 0.215 * SCR_W       # eye centres at +-EX
ES = 0.44 * SCR_H        # eye box size
ET = 0.09 * SCR_H        # stroke
BROW = ES * 0.5 + 0.13 * SCR_H   # brow height above the eye centre


def rect(cx, cy, w, h, ang=0.0):
    c, s_ = math.cos(ang), math.sin(ang)
    pts = [(-w / 2, -h / 2), (w / 2, -h / 2), (w / 2, h / 2), (-w / 2, h / 2)]
    return [(cx + x * c - y * s_, cy + x * s_ + y * c) for x, y in pts]


def ring(cx, cy, w, h, t):
    """Square outline from 4 bars."""
    return [rect(cx, cy + h / 2 - t / 2, w, t), rect(cx, cy - h / 2 + t / 2, w, t),
            rect(cx - w / 2 + t / 2, cy, t, h - 2 * t), rect(cx + w / 2 - t / 2, cy, t, h - 2 * t)]


def eye_open(cx, cy=0.0, size=ES, pup=0.36, dx=0.0, dy=0.0, h=None):
    h = h or size
    return ring(cx, cy, size, h, ET) + [rect(cx + dx, cy + dy, size * pup, min(size * pup, h - 2.6 * ET))]


def arch(cx, cy, w, h, t):
    """Upside-down U: closed 'happy' eye."""
    return [rect(cx, cy + h / 2 - t / 2, w, t), rect(cx - w / 2 + t / 2, cy - t / 2, t, h - t), rect(cx + w / 2 - t / 2, cy - t / 2, t, h - t)]


def both(fn):
    return fn(-EX, -1) + fn(EX, 1)


def spiral(cx, cy, turns=2.4, n=18, rad=None):
    """Short bars along an Archimedean spiral: the dizzy eyes."""
    rad = ES * 0.48 if rad is None else rad
    bars = [rect(cx, cy, ET * 1.35, ET * 1.35)]
    for i in range(n):
        u = (i + 0.5) / n
        ang = u * turns * 2 * math.pi - math.pi / 2
        r = rad * (0.16 + 0.84 * u)
        bars.append(rect(cx + math.cos(ang) * r, cy + math.sin(ang) * r,
                         ET * 2.15, ET * 0.92, ang + math.pi / 2))
    return bars


EXPRESSIONS = {
    'neutral':   both(lambda x, s: eye_open(x)),
    'happy':     both(lambda x, s: arch(x, 0.02 * SCR_H, ES, ES * 0.5, ET * 1.1)),
    'blink':     both(lambda x, s: [rect(x, -0.04 * SCR_H, ES * 1.05, ET * 1.1)]),
    'surprised': both(lambda x, s: eye_open(x, 0.02 * SCR_H, ES * 1.12, pup=0.22)),
    'sad':       both(lambda x, s: eye_open(x, -0.04 * SCR_H, dy=-0.035 * SCR_H)
                      + [rect(x, BROW - 0.04 * SCR_H, ES * 1.0, ET, ang=s * -0.30)]),
    'thinking':  both(lambda x, s: eye_open(x, dx=0.035 * SCR_H, dy=0.035 * SCR_H))
                 + [rect(EX, BROW + 0.01 * SCR_H, ES * 1.0, ET, ang=0.12)],
    'wink':      eye_open(-EX) + arch(EX, 0.02 * SCR_H, ES, ES * 0.5, ET * 1.1),
    'angry':     both(lambda x, s: eye_open(x, -0.04 * SCR_H)
                      + [rect(x, BROW - 0.06 * SCR_H, ES * 1.0, ET, ang=s * 0.32)]),
    'dizzy':     both(lambda x, s: spiral(x, 0.01 * SCR_H)),
}

# local axes of the Eyes empty: x = screen right, y = screen up, z = out of the screen (-Y)
Rloc = Matrix(((1, 0, 0), (0, 0, 1), (0, -1, 0))).transposed()
eyes_root_mw = Matrix.Translation(eyes_pos * S) @ (HEAD_TILT.to_matrix() @ Rloc).to_4x4()
eyes_empty = new_obj('Eyes', None, C_EYES, arm, 'eyes_code', eyes_root_mw)
eyes_empty.empty_display_size = 0.05


def shape_mesh(name, polys, lift=0.0):
    bm = bmesh.new()
    for poly in polys:
        bm.faces.new([bm.verts.new((x * S, y * S, lift)) for x, y in poly])
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    me.materials.append(M_EYE)
    return me


for k, (name, polys) in enumerate(EXPRESSIONS.items()):
    ob = bpy.data.objects.new(f'eyes_{name}', shape_mesh(f'eyes_{name}', polys, 0.001))
    C_EYES.objects.link(ob)
    ob.parent = eyes_empty
    ob.hide_render = ob.hide_viewport = (name != 'neutral')   # default: neutral

# clip-driven copies of the eyes (same mesh data), one bone each
for e in CLIP_EXPRS:
    new_obj(f'clip_eyes_{e}', bpy.data.meshes[f'eyes_{e}'], C_EYES, arm, f'clip_eyes_{e}_ctrl', eyes_root_mw)

# mouth: one bold bar, only shown while talking (scaled to 0 by the other clips)
mouth_mw = Matrix.Translation(mouth_pos * S) @ (HEAD_TILT.to_matrix() @ Rloc).to_4x4()
mouth = bpy.data.objects.new('mouth', shape_mesh('mouth', [rect(0, 0, 0.30 * SCR_W, 0.13 * SCR_H)], 0.001))
C_EYES.objects.link(mouth)
mouth.parent = arm; mouth.parent_type = 'BONE'; mouth.parent_bone = 'mouth_ctrl'
bpy.context.view_layer.update(); mouth.matrix_world = mouth_mw

# floor ring (hologram projector base), separate so the site can hide it
def flat_ring(r, w, n=64):
    out = []
    for i in range(n):
        a0, a1 = 2 * math.pi * i / n, 2 * math.pi * (i + 1) / n
        out.append([(math.cos(a0) * (r + w / 2), math.sin(a0) * (r + w / 2)), (math.cos(a1) * (r + w / 2), math.sin(a1) * (r + w / 2)),
                    (math.cos(a1) * (r - w / 2), math.sin(a1) * (r - w / 2)), (math.cos(a0) * (r - w / 2), math.sin(a0) * (r - w / 2))])
    return out

bm = bmesh.new()
for r, w in ((2.6, 0.05), (3.5, 0.035)):
    for poly in flat_ring(r, w):
        bm.faces.new([bm.verts.new((x * S, (y - 0.1) * S, 0.002)) for x, y in poly])
me = bpy.data.meshes.new('floor_ring'); bm.to_mesh(me); bm.free(); me.materials.append(M_FX)
new_obj('floor_ring', me, C_FX, arm, 'root')

# -------------------------------------------------------------- animation --
pb = arm.pose.bones
REST = {b.name: b.matrix_local.to_quaternion() for b in arm_data.bones}


def world_rot(bone, x=0.0, y=0.0, z=0.0):
    """Small rotation given about the armature's X (nod), Y (side tilt), Z (turn) axes, in degrees."""
    qw = Euler((R(x), R(y), R(z)), 'XYZ').to_quaternion()
    r = REST[bone]
    return r.inverted() @ qw @ r


def clip(name, frames, fn):
    act = bpy.data.actions.new(name)
    act.use_fake_user = True
    arm.animation_data_create()
    arm.animation_data.action = act
    # Keep each bone's quaternion on one continuous path. A spin of more than
    # half a turn (dizzy) would otherwise flip back at the 360° wrap, because
    # a quaternion and its negative are the same pose.
    prev_q = {}
    for f in range(frames + 1):
        t = f / frames
        pose = fn(t, f)
        for b in pb:
            rot = pose.get(b.name, {})
            q = world_rot(b.name, *rot.get('r', (0, 0, 0)))
            prev = prev_q.get(b.name)
            if prev is not None and prev.dot(q) < 0:
                q.negate()
            b.rotation_quaternion = q
            prev_q[b.name] = q.copy()
            b.keyframe_insert('rotation_quaternion', frame=f, group=b.name)
            # head and hips are always keyed (lifts / bounces). Any other bone
            # is keyed only when the pose sets 'l', so older clips stay put.
            # Offsets are armature axes in dir4 units.
            if b.name in ('head', 'hips') or 'l' in rot:
                b.location = REST[b.name].inverted() @ (V(rot.get('l', (0, 0, 0))) * S)
                b.keyframe_insert('location', frame=f, group=b.name)
            if b.name in SCALE_DEFAULT:                    # only these ever scale
                b.scale = rot.get('s', SCALE_DEFAULT[b.name])
                b.keyframe_insert('scale', frame=f, group=b.name)
    for fc in act.fcurves:
        for kp in fc.keyframe_points: kp.interpolation = 'LINEAR'
    act.use_frame_range = True
    act.frame_start, act.frame_end = 0, frames
    tr = arm.animation_data.nla_tracks.new(); tr.name = name
    st = tr.strips.new(name, 0, act); st.name = name
    tr.mute = True
    arm.animation_data.action = None
    return act


def blink(f, at, d=3):
    """Eye scale for a quick blink centred on frame `at`."""
    k = abs(f - at)
    if k >= d: return 1.0
    return 0.08 + 0.92 * (k / d) ** 1.5


sin, cos, pi = math.sin, math.cos, math.pi
HIDE = (0.0, 0.0, 0.0)
SHOW = (1.0, 1.0, 1.0)
# scale-driven bones and their value when a clip doesn't set them:
# code-chosen eyes shown, clip eyes and mouth hidden
SCALE_DEFAULT = {'eyes_ctrl': SHOW, 'mouth_ctrl': HIDE, 'eyes_code': SHOW,
                 **{f'clip_eyes_{e}_ctrl': HIDE for e in CLIP_EXPRS}}


def idle(t, f):
    a = 2 * pi * t
    return {
        'hips': {'r': (0, 0.7 * sin(a), 0)},
        'spine': {'r': (0.8 * sin(a), 0, 0)},
        'chest': {'r': (-1.2 * sin(a + 0.6), -0.6 * sin(a), 0)},
        'neck': {'r': (0.6 * sin(a + 1.2), 0, 0)},
        'head': {'r': (1.6 * sin(2 * a + 1.0), 1.2 * sin(a + 0.8), 0.8 * sin(a + 2.0))},
        'upper_arm_L': {'r': (1.8 * sin(a + 0.5), 0, 0)}, 'upper_arm_R': {'r': (1.8 * sin(a + 0.9), 0, 0)},
        'forearm_L': {'r': (1.5 * sin(a + 1.1), 0, 0)}, 'forearm_R': {'r': (1.5 * sin(a + 1.5), 0, 0)},
        'eyes_ctrl': {'s': (1, blink(f, 70), 1)},
        'mouth_ctrl': {'s': HIDE},
    }


def talk(t, f):
    a = 2 * pi * t
    lift = 0.5 - 0.5 * cos(a)                      # right hand rises and settles once per loop
    op = abs(sin(7 * pi * t)) * (0.55 + 0.45 * abs(sin(3 * pi * t)))
    return {
        'hips': {'r': (0, 0.5 * sin(a), 0)},
        'chest': {'r': (1.0 * sin(2 * a + 0.5), 0, 1.5 * sin(a))},
        'neck': {'r': (0.5 * sin(2 * a + 0.3), 0, 0)},
        'head': {'r': (1.8 * sin(2 * a), 1.0 * sin(a + 0.4), 2.5 * sin(a + 1.0)),
                 'l': (0, 0, 0.06 * (0.5 + 0.5 * sin(2 * a - 0.5)))},   # tiny lift keeps the head clear of the torso
        'upper_arm_R': {'r': (-7 * lift, 0, 0)}, 'forearm_R': {'r': (-20 * lift, 0, 0)},
        'hand_R': {'r': (-6 * lift, 0, 0)},
        'upper_arm_L': {'r': (1.5 * sin(a + 0.7), 0, 0)}, 'forearm_L': {'r': (1.5 * sin(a + 1.3), 0, 0)},
        'eyes_ctrl': {'s': (1, blink(f, 46), 1)},
        'mouth_ctrl': {'s': (1 - 0.15 * op, 0.25 + 0.75 * op, 1)},
    }


def yes(t, f):
    k = sin(2 * pi * t) ** 2 * (1 - 0.2 * t)        # two nods, back to rest at both ends
    return {
        'chest': {'r': (3.5 * k, 0, 0)},                # a small bow of the upper body
        'neck': {'r': (3.0 * k, 0, 0)},
        'head': {'r': (9.0 * k, 0, 0), 'l': (0, 0, 0.2 * k)},   # head lifts as it tips so it clears the torso
        'eyes_ctrl': {'s': (1, 1, 1)},
        'mouth_ctrl': {'s': HIDE},
    }


def no(t, f):
    y = 15 * sin(4 * pi * t) * sin(pi * t)           # two shakes, eased in and out
    return {
        'chest': {'r': (0, 0, 0.12 * y)},
        'neck': {'r': (0, 0, 0.25 * y)},
        'head': {'r': (1.5 * sin(pi * t) ** 2, 0, y)},
        'eyes_ctrl': {'s': (1, 1, 1)},
        'mouth_ctrl': {'s': HIDE},
    }


# ------------------------------------------------- expression body language --
def ss(a, b, t):
    x = min(1.0, max(0.0, (t - a) / (b - a)))
    return x * x * (3 - 2 * x)


def env(t, a, b):
    """0 at both ends (with zero slope), 1 between a and b."""
    return ss(0, a, t) * (1 - ss(b, 1, t))


def show_eyes(e, f, n, loop=False):
    """Swap the code-chosen eyes for this clip's eyes; back to the code eyes at
    the first and last frame so the clip starts and ends at rest."""
    k = 1.0 if loop else (0.0 if f in (0, n) else 0.5 if f in (1, n - 1) else 1.0)
    return {'eyes_code': {'s': (1 - k,) * 3}, f'clip_eyes_{e}_ctrl': {'s': (k,) * 3}}


def merge(*ds):
    out = {}
    for d in ds:
        for b, v in d.items():
            out.setdefault(b, {}).update(v)
    return out


def happy(t, f, n=60):
    e = env(t, 0.18, 0.8)
    hop = abs(sin(3 * pi * t)) * e                      # three little bounces
    return merge({
        'hips': {'l': (0, 0, 0.12 * hop), 'r': (-2 * e, 0, 0)},   # part of each lean goes in the hips
        'spine': {'r': (-0.5 * e, 0, 0)},                  # so the torso doesn't sink into the pelvis
        'chest': {'r': (-3 * e, 0, 0)},                    # chest up
        'head': {'r': (-3 * e, 4 * e * sin(4 * pi * t), 0), 'l': (0, 0, 0.1 * e)},
        'shoulder_L': {'r': (0, -3 * e, 0)}, 'shoulder_R': {'r': (0, 3 * e, 0)},
        'upper_arm_L': {'r': (-4 * e, -14 * e, 0)}, 'upper_arm_R': {'r': (-4 * e, 14 * e, 0)},
        'forearm_L': {'r': (-12 * e, -6 * e, 0)}, 'forearm_R': {'r': (-12 * e, 6 * e, 0)},
    }, show_eyes('happy', f, n))


def surprised(t, f, n=54):
    j = ss(0, 0.12, t) * (1 - ss(0.55, 1, t))          # fast startle, slow settle
    return merge({
        'hips': {'l': (0, 0, 0.1 * j), 'r': (-3 * j, 0, 0)},
        'spine': {'r': (-1 * j, 0, 0)},
        'chest': {'r': (-5 * j, 0, 0)},                    # lean back
        'head': {'r': (-6 * j, 0, 0), 'l': (0, 0, 0.15 * j)},   # head pulls back
        'shoulder_L': {'r': (0, -7 * j, 0)}, 'shoulder_R': {'r': (0, 7 * j, 0)},   # shoulders up
        'upper_arm_L': {'r': (-5 * j, -10 * j, 0)}, 'upper_arm_R': {'r': (-5 * j, 10 * j, 0)},
        'forearm_L': {'r': (-25 * j, 0, 0)}, 'forearm_R': {'r': (-25 * j, 0, 0)},
    }, show_eyes('surprised', f, n))


def sad(t, f, n=75):
    e = ss(0, 0.4, t) * (1 - ss(0.72, 1, t))           # slow slump, hold, recover
    return merge({
        'hips': {'l': (0, 0, -0.08 * e), 'r': (4 * e, 0, 0)},
        'spine': {'r': (1.5 * e, 0, 0)},
        'chest': {'r': (3.5 * e, 0, 0)},
        'neck': {'r': (3 * e, 0, 0)},
        'head': {'r': (7 * e, 3 * e, 0), 'l': (0, 0, 0.24 * e)},   # droops; lifts a touch to clear the torso
        'shoulder_L': {'r': (0, 6 * e, 0)}, 'shoulder_R': {'r': (0, -6 * e, 0)},   # shoulders fall
        'upper_arm_L': {'r': (-3 * e, 0, 0)}, 'upper_arm_R': {'r': (-3 * e, 0, 0)},
        'eyes_ctrl': {'s': (1, blink(f, 44, 5), 1)},
    }, show_eyes('sad', f, n))


def solve_think_arm():
    """Right hand up beside the screen (the 'hmm' hand at the side of the TV):
    a small random search over upper-arm / forearm / hand angles that keeps
    the arm out of the torso and the head. (Under the chin was tried first,
    but Giant's arms are too short to get there without going through the
    chest.)"""
    import random
    random.seed(4)
    sh, el, wr = arm_pts(-1)
    tip0 = wr + V(0, -0.2, -1.1)
    target = MH @ V(-2.85, -1.0, 2.3)                  # beside the screen, character's right
    def Q(a): return Euler((R(a[0]), R(a[1]), R(a[2]))).to_matrix()
    def fk(p):
        D1 = Q(p[0:3]); e_ = sh + D1 @ (el - sh)
        D2 = D1 @ Q((p[3], 0, p[4])); w_ = e_ + D2 @ (wr - el)
        D3 = D2 @ Q((p[5], 0, 0)); tp = w_ + D3 @ (tip0 - wr)
        return e_, w_, tp
    def inside_torso(q, r):
        if not (3.1 < q.z < 6.6): return 0.0
        k = (q.z - 3.2) / 3.3
        hw = 2.05 + 0.45 * k; yf = -1.25 - 0.25 * k
        return max(0.0, min(hw + r - abs(q.x), q.y - (yf - r)))
    Mi = MH.inverted()
    def inside_head(q, r):
        h = Mi @ q
        return max(0.0, min(2.25 + r - abs(h.x), 1.9 + r - abs(h.y), h.z + r, 4.58 + r - h.z))
    def cost(p):
        e_, w_, tp = fk(p)
        for i in range(5):
            c0 = w_.lerp(tp, i / 4)
            if i == 0: c = 0.0
            c += 300 * inside_head(c0, 0.55) ** 2 + 300 * inside_head(e_.lerp(w_, i / 4), 0.55) ** 2
        c += (tp - target).length ** 2
        for i in range(9):
            a = i / 8
            c += 300 * inside_torso(sh.lerp(e_, a), 0.55) ** 2 + 300 * inside_torso(e_.lerp(w_, a), 0.58) ** 2
        c += 300 * inside_torso(tp, 0.58) ** 2 + 300 * inside_torso(w_, 0.58) ** 2
        c += 1e-5 * sum(x * x for x in p)
        return c
    lo = (-90, -40, -60, -150, -60, -60); hi = (20, 40, 60, 0, 60, 40)
    best = None
    for _ in range(6000):
        p = [random.uniform(a, b) for a, b in zip(lo, hi)]
        c = cost(p)
        if best is None or c < best[0]: best = (c, p)
    c, p = best; step = 10.0
    while step > 0.05:
        improved = False
        for i in range(6):
            for d in (step, -step):
                q = list(p); q[i] += d; cq = cost(q)
                if cq < c: c, p, improved = cq, q, True
        if not improved: step *= 0.5
    e_, w_, tp = fk(p)
    print('THINK IK angles', [round(x, 1) for x in p], 'tip error (dir4 units)', round((tp - target).length, 3), 'cost', round(c, 4))
    return [round(x, 2) for x in p]


CHIN = solve_think_arm()


def thinking(t, f, n=90):
    a = 2 * pi * t                                     # seamless loop, held thinking pose
    tap = sin(2 * a)
    return merge({
        'hips': {'r': (0, 0.8 * sin(a), 0)},
        'chest': {'r': (0.5 * sin(a), 0.6 * sin(a + 0.5), 0)},
        'head': {'r': (-2.5 + 0.8 * sin(a + 1.0), 4.5 + 1.2 * sin(a), -5 + 1.0 * sin(a + 0.6)), 'l': (0, 0, 0.14)},   # tilts away from the hand, looks up
        'upper_arm_R': {'r': tuple(CHIN[0:3])},
        'forearm_R': {'r': (CHIN[3], 0, CHIN[4])},
        'hand_R': {'r': (CHIN[5] + 3 * tap, 0, 0)},     # little tap on the side of the set
        'upper_arm_L': {'r': (-6 + 1.5 * sin(a + 0.5), 0, 0)}, 'forearm_L': {'r': (-18 + 1.5 * sin(a + 1.1), 0, 0)},
        'eyes_ctrl': {'s': (1, blink(f, 60), 1)},
    }, show_eyes('thinking', f, n, loop=True))


def wink(t, f, n=54):
    e = env(t, 0.2, 0.75)
    shrug = sin(2 * pi * t) ** 2 * e                   # two quick shrugs
    pump = sin(4 * pi * t) * e
    return merge({
        'hips': {'r': (0, 1.0 * e, 0)},
        'chest': {'r': (0, 0, -4 * e)},
        'head': {'r': (0, -8 * e, -4 * e), 'l': (0, 0, 0.16 * e)},   # playful tilt
        'shoulder_L': {'r': (0, -6 * shrug, 0)}, 'shoulder_R': {'r': (0, 6 * shrug, 0)},
        'upper_arm_R': {'r': (-20 * e, 0, 0)},
        'forearm_R': {'r': (-105 * e - 8 * pump, 0, 0)},  # little fist-up gesture
        'hand_R': {'r': (-15 * e, 0, 0)},
    }, show_eyes('wink', f, n))


def angry(t, f, n=60):
    e = env(t, 0.15, 0.8)
    stomp = math.exp(-((t - 0.36) / 0.07) ** 2) * e
    shake = sin(12 * pi * t) * math.exp(-((t - 0.55) / 0.13) ** 2) * e
    return merge({
        'hips': {'l': (0, 0, -0.15 * stomp), 'r': (3 * e + 1 * stomp, 0, 0)},
        'spine': {'r': (1 * e + 1 * stomp, 0, 0)},
        'chest': {'r': (3 * e, 0, 1.2 * shake)},           # stiff forward lean
        'head': {'r': (-3 * e, 0, 3 * shake), 'l': (0, 0, 0.05 * e)},
        'shoulder_L': {'r': (0, -3 * e, 0)}, 'shoulder_R': {'r': (0, 3 * e, 0)},   # tense
        'upper_arm_L': {'r': (5 * e, -4 * e, 0)}, 'upper_arm_R': {'r': (5 * e, 4 * e, 0)},   # fists pushed down
        'forearm_L': {'r': (3 * e, 0, 0)}, 'forearm_R': {'r': (3 * e, 0, 0)},
    }, show_eyes('angry', f, n))


def dizzy_eyes(f):
    """Surprised eyes through the recoil, spiral eyes from frame 21, held to the end.
    Frame 0 stays on the code-chosen eyes so a cross-fade out of idle is clean."""
    code = sur = diz = 0.0
    if f <= 0:
        code = 1.0
    elif f < 21:
        sur = 1.0
    else:
        diz = 1.0
    return {
        'eyes_code': {'s': (code, code, code)},
        'clip_eyes_surprised_ctrl': {'s': (sur, sur, sur)},
        'clip_eyes_dizzy_ctrl': {'s': (diz, diz, diz)},
    }


def dizzy(t, f, n=150):
    """5 s one-shot. Recoil and hop, then a 2.5-turn spin, a wobble, a fall, a held lie.
    Does not return to rest: play idle (LoopOnce + clampWhenFinished) to stand him up."""
    recoil = ss(0.012, 0.07, t) * (1 - ss(0.12, 0.16, t))
    hop = math.exp(-((f - 14) / 4.2) ** 2)
    spin_u = ss(21 / n, 96 / n, t)
    spin = 900.0 * spin_u                         # 2.5 turns, starting at frame 21
    wob_u = 0.0
    if 96 <= f <= 120:
        wob_u = math.sin(math.pi * (f - 96) / 24.0)
    wob = math.sin((f - 96) / 24.0 * 6 * math.pi) * wob_u
    lie = 1.0 if f >= 142 else ss(114 / n, 138 / n, t)
    bounce = math.exp(-((f - 136) / 2.6) ** 2)
    # +X lays him onto his back. Root stays still during the recoil so the
    # head does not swing through the torso; the hop is on the hips.
    # The held pose is lifted so the body sits a few cm above the floor.
    rx = 80 * lie - 9 * bounce
    arms = max(recoil, spin_u * (1.0 - lie))
    return merge({
        'root': {'r': (rx, 18 * wob, spin), 'l': (0, 0.15 * lie, 1.45 * lie - 0.35 * bounce)},
        'hips': {'l': (0, 0, 0.9 * hop), 'r': (-3 * recoil, 0, 0)},
        'spine': {'r': (-1 * recoil, 4 * wob, 0)},
        'chest': {'r': (-5 * recoil, 6 * wob, 0)},
        'neck': {'r': (-2 * recoil, 2 * wob, 0)},
        'head': {'r': (-6 * recoil + 10 * wob, 6 * wob, 0),
                 'l': (0, 0, 0.2 * recoil - 0.40 * wob_u)},   # wobble: TV sinks 4 cm into the shoulders
        'shoulder_L': {'r': (0, -8 * recoil, 0)}, 'shoulder_R': {'r': (0, 8 * recoil, 0)},
        'upper_arm_L': {'r': (-16 * arms, -12 * arms, 0)}, 'upper_arm_R': {'r': (-16 * arms, 12 * arms, 0)},
        'forearm_L': {'r': (-30 * arms, 0, 0)}, 'forearm_R': {'r': (-30 * arms, 0, 0)},
        'thigh_L': {'r': (14 * lie, 0, 0)}, 'thigh_R': {'r': (14 * lie, 0, 0)},
        'shin_L': {'r': (-16 * lie, 0, 0)}, 'shin_R': {'r': (-16 * lie, 0, 0)},
    }, dizzy_eyes(f))


CLIPS = [('idle', 108, idle), ('talk', 72, talk), ('yes', 45, yes), ('no', 45, no),
         ('happy', 60, happy), ('surprised', 54, surprised), ('sad', 75, sad),
         ('thinking', 90, thinking), ('wink', 54, wink), ('angry', 60, angry),
         ('dizzy', 150, dizzy)]
for name, n, fn in CLIPS:
    clip(name, n, fn)

for b in pb:
    b.rotation_quaternion = (1, 0, 0, 0); b.scale = (1, 1, 1); b.location = (0, 0, 0)
sc.frame_start, sc.frame_end = 0, 108
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, 'giant_rig.blend'))

# ------------------------------------------------------------------ export --
# eye meshes: all visible in the file; the site picks one (hidden objects
# would be dropped by the exporter otherwise)
for o in C_EYES.objects: o.hide_render = o.hide_viewport = False
bpy.ops.object.select_all(action='DESELECT')
bpy.ops.export_scene.gltf(
    filepath=os.path.join(HERE, 'giant.glb'), export_format='GLB', export_yup=True,
    export_apply=True, export_animations=True, export_animation_mode='ACTIONS',
    export_force_sampling=True, export_frame_step=1, export_anim_slide_to_zero=True,
    export_reset_pose_bones=True, export_optimize_animation_size=False,
    export_def_bones=False, export_skins=False, use_mesh_edges=True,
    export_materials='EXPORT', export_extras=False, export_cameras=False, export_lights=False,
    use_selection=False, use_visible=False, export_texcoords=False, export_normals=True)
print('EXPORTED')
