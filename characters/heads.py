"""Simplified hologram versions of the four Sony CRTs from retro-3d-assets.

Each builder makes the head in local space (units of 100 mm, bottom at z=0,
front facing -Y) parented to `P`, and returns the screen frame (centre,
normal, axes, size) so eyes can be drawn on the tube.
Proportions follow src/models/*.js; depth is shortened a little so the head
doesn't swamp the body.
"""
import bmesh, math
from mathutils import Vector, Matrix
from holo_lib import *


def _slots(name, P, C, M, xs, ys, z, w, d, along='y'):
    """A field of thin vent slots lying on a top surface at height z."""
    bm = bmesh.new()
    for x in xs:
        for y in ys:
            sx, sy = (w, d) if along == 'x' else (d, w)
            for v in bmesh.ops.create_cube(bm, size=1.0)['verts']:
                v.co = Vector((x + v.co.x * sx, y + v.co.y * sy, z + v.co.z * 0.012))
    return from_bm(name, bm, M, C, 'sharp', parent=P)


def _side_slots(name, P, C, M, x, ys, zs, length, t, axis='z'):
    """Vent slots on a side wall at x (slots run along `axis`)."""
    bm = bmesh.new()
    for y in ys:
        for z in zs:
            sy, sz = (t, length) if axis == 'z' else (length, t)
            for v in bmesh.ops.create_cube(bm, size=1.0)['verts']:
                v.co = Vector((x + v.co.x * 0.012, y + v.co.y * sy, z + v.co.z * sz))
    return from_bm(name, bm, M, C, 'sharp', parent=P)


def _keys(name, P, C, M, centers, w, h, out, y_face, bevel=0.008):
    """Small push keys standing `out` proud of a front face at y_face."""
    bm = bmesh.new()
    for (x, z) in centers:
        for v in bmesh.ops.create_cube(bm, size=1.0)['verts']:
            v.co = Vector((x + v.co.x * w, y_face - out / 2 + v.co.y * out, z + v.co.z * h))
    if bevel: bevel_bm(bm, bevel)
    return from_bm(name, bm, M, C, 'sharp', parent=P)


def _knobs(name, P, C, M, centers, r, length, y_face):
    obs = []
    for i, (x, z) in enumerate(centers):
        obs.append(cyl(f'{name}{i}', r, r * 0.85, length, M, C, segs=20, parent=P,
                       loc=(x, y_face - length / 2, z), rot=(math.pi / 2, 0, 0)))
    return obs


# ------------------------------------------------------------------ KV-5200 --
def kv5200(P, C, m):
    W, BODY_H, D = 1.62, 2.05, 2.8
    BASE_H, BLOCK_H = 0.17, 0.48
    UP0 = BASE_H + BLOCK_H
    FZ_TOP, FZ_LOW = -D / 2, -D / 2 + 0.41           # front y at the top / bottom of the hood
    RY = D / 2 - 0.40                                # silver ends, black rear cover begins
    # upper shell with slanted front (hood)
    upH = BODY_H - UP0
    bm = bm_box(W, RY - FZ_TOP, upH, center=(0, (RY + FZ_TOP) / 2, UP0 + upH / 2))
    for v in bm.verts:
        if v.co.y < 0:
            t = (v.co.z - UP0) / upH
            v.co.y = FZ_LOW + t * (FZ_TOP - FZ_LOW)
    bm.normal_update()
    bevel_bm(bm, 0.06, 1, [e for e in bm.edges if abs(e.verts[0].co.y - e.verts[1].co.y) > 0.5])
    from_bm('5200_shell', bm, m['head'], C, 'sharp', parent=P)
    # hood frame on the slanted front: rim, deep hood, smoked plate, bulged tube
    slant = math.atan2(FZ_LOW - FZ_TOP, upH)        # top leans forward
    Hh = math.hypot(upH, FZ_LOW - FZ_TOP) - 0.02
    Wh = W - 0.02
    hb, f = rr_loft([(Wh, Hh, 0.10, 0.03), (Wh, Hh, 0.10, 0.0),            # rim of the hood
                     (Wh - 0.14, Hh - 0.14, 0.08, 0.0), (Wh - 0.14, Hh - 0.14, 0.08, 0.22),   # inside of the hood
                     (Wh - 0.26, Hh - 0.28, 0.07, 0.22), (Wh - 0.26, Hh - 0.28, 0.07, 0.24),  # smoked face plate
                     (Wh - 0.36, Hh - 0.40, 0.06, 0.225)], segs=3)            # bulged tube
    f.material_index = 1
    R = Matrix.Translation((0, (FZ_LOW + FZ_TOP) / 2 - 0.012, UP0 + upH / 2)) @ Matrix.Rotation(slant, 4, 'X')
    bmesh.ops.transform(hb, matrix=R, verts=hb.verts)
    hb.normal_update()
    fr = face_frame(f)
    from_bm('5200_hood', hb, m['head'], C, 'sharp', mats=[m['screen']], parent=P)
    # lower key block
    BLOCK_W = 1.50
    bfz = FZ_LOW + 0.02
    box('5200_block', (BLOCK_W, RY - bfz, BLOCK_H), (0, (RY + bfz) / 2, BASE_H + BLOCK_H / 2), m['head'], C, bevel=0.04, parent=P)
    box('5200_keypanel', (1.41, 0.02, 0.37), (0, bfz - 0.005, BASE_H + BLOCK_H / 2 + 0.01), m['head'], C, parent=P)
    keys = []
    for row, z in enumerate((BASE_H + 0.33, BASE_H + 0.15)):
        for i in range(7):
            keys.append((-BLOCK_W / 2 + 0.1275 + i * 0.117, z))
    _keys('5200_keys', P, C, m['head'], keys, 0.095, 0.075, 0.035, bfz - 0.015)
    _keys('5200_power', P, C, m['head'], [(-BLOCK_W / 2 + 1.324, BASE_H + 0.25)], 0.18, 0.18, 0.05, bfz - 0.015)
    box('5200_trinitron', (0.30, 0.02, 0.19), (-BLOCK_W / 2 + 1.053, bfz - 0.02, BASE_H + 0.25), m['head'], C, bevel=0.01, parent=P)
    # base
    box('5200_base', (1.28, D - 0.5, BASE_H + 0.02), (0, 0.15, (BASE_H + 0.02) / 2), m['head'], C, bevel=0.03, parent=P)
    # tapered black rear cover
    bm = bm_box(W - 0.02, D / 2 - RY, BODY_H - BASE_H - 0.04, center=(0, (RY + D / 2) / 2, (BODY_H + BASE_H) / 2))
    for v in bm.verts:
        if v.co.y > RY + 0.01:
            v.co.x *= 0.85; v.co.z = (BODY_H + BASE_H) / 2 + (v.co.z - (BODY_H + BASE_H) / 2) * 0.80
    bevel_bm(bm, 0.05)
    from_bm('5200_rear', bm, m['head'], C, 'sharp', parent=P)
    # handle on top: two posts and a bar, front to back
    top, hh = BODY_H, 0.52
    hy0, hy1 = -0.57, 1.03
    for i, y in enumerate((hy0 + 0.09, hy1 - 0.09)):
        box(f'5200_post{i}', (0.25, 0.18, hh), (0, y, top + hh / 2), m['head'], C, bevel=0.03, parent=P)
    box('5200_bar', (0.25, hy1 - hy0, 0.11), (0, (hy0 + hy1) / 2, top + hh - 0.055), m['head'], C, bevel=0.035, parent=P)
    box('5200_grip', (0.15, hy1 - hy0 - 0.12, 0.01), (0, (hy0 + hy1) / 2, top + hh + 0.002), m['head'], C, parent=P)
    # telescopic aerial pulled up out of the handle: the "hair tuft"
    base = Vector((0, hy1 - 0.15, top + hh + 0.03))
    tip1 = base + Vector((0.32, 0.45, 1.25))
    tip2 = Vector((0, hy0 + 0.2, top + hh + 0.03)) + Vector((-0.22, -0.1, 0.70))
    limb('5200_aerial_a', base, base + (tip1 - base) * 0.5, 0.035, m['head'], C, parent=P)
    limb('5200_aerial_b', base + (tip1 - base) * 0.5, tip1, 0.022, m['head'], C, parent=P)
    ball('5200_aerial_tip', 0.065, tip1, m['lamp'], C, parent=P)
    limb('5200_aerial_c', Vector((0, hy0 + 0.25, top + hh + 0.03)), tip2, 0.02, m['head'], C, parent=P)
    ball('5200_aerial_tip2', 0.045, tip2, m['lamp'], C, parent=P)
    cyl('5200_cap', 0.04, 0.04, 0.09, m['head'], C, parent=P, loc=(0, hy0 + 0.02, top + hh + 0.034), rot=(math.pi / 2, 0, 0))
    # PUSH release and top vents
    box('5200_push', (0.23, 0.12, 0.015), (0, -0.76, top + 0.007), m['head'], C, parent=P)
    _slots('5200_vents', P, C, m['head'], [-0.19 - 0.026 * k for k in range(10)] + [0.19 + 0.026 * k for k in range(10)],
           [0.85, 0.98], top + 0.004, 0.0125, 0.09, along='y')
    return fr, BODY_H


# --------------------------------------------------------------- PVM-9042QM --
def pvm9042qm(P, C, m):
    W, FOOT, BODY_H, D, BEZEL_D = 2.17, 0.09, 2.08, 2.9, 0.30
    Y1 = FOOT + BODY_H
    FY = -D / 2
    # front bezel block (30 mm deep) and the cover behind it: the seam reads as a panel line
    bm = bm_box(W, BEZEL_D, BODY_H, center=(0, FY + BEZEL_D / 2, FOOT + BODY_H / 2))
    bevel_bm(bm, 0.035, 1)
    bm.normal_update()
    f = front_face(bm)
    # screen: centred 0.86 below the top, 1.99 x 1.32 opening, funnel then bulged tube
    # inset leaves room for the control strip below: use a separate screen frame
    from_bm('9042_bezel', bm, m['head'], C, 'sharp', parent=P)
    scr_c = Vector((0, FY, Y1 - 0.86))
    sbm, sf = rr_loft([(1.86, 1.28, 0.08, 0.02), (1.86, 1.28, 0.08, -0.01), (1.86, 1.28, 0.08, 0.12),
                       (1.56, 1.16, 0.06, 0.13), (1.56, 1.16, 0.06, 0.15), (1.50, 1.12, 0.05, 0.11)], segs=3, cz=scr_c.z)
    bmesh.ops.translate(sbm, vec=(0, FY, 0), verts=sbm.verts)
    sf.material_index = 1
    fr = face_frame(sf)
    from_bm('9042_screen', sbm, m['head'], C, 'sharp', mats=[m['screen']], parent=P)
    box('9042_cover', (W - 0.06, D - BEZEL_D, BODY_H - 0.04), (0, FY + BEZEL_D + (D - BEZEL_D) / 2, FOOT + BODY_H / 2),
        m['head'], C, bevel=0.06, parent=P)
    # tally window, Trinitron/SONY badges
    box('9042_tally', (0.22, 0.02, 0.155), (0, FY - 0.006, Y1 - 0.1025), m['lamp'], C, bevel=0.01, parent=P)
    box('9042_badge', (0.33, 0.012, 0.075), (0, FY - 0.004, Y1 - 1.655), m['head'], C, parent=P)
    # control strip: recessed panel, 2x4 buttons, trims, 6 knobs, LED, power
    pz = Y1 - 1.743 - 0.1385
    box('9042_panel', (1.845, 0.03, 0.277), (0, FY - 0.003, pz), m['head'], C, bevel=0.01, parent=P)
    fx = lambda v: v / 100 - W / 2
    fy = lambda v: Y1 - v / 100
    btn = [(fx(c), fy(r)) for c in (21.7, 33.2, 45, 56.5) for r in (183.9, 193.4)]
    _keys('9042_buttons', P, C, m['head'], btn, 0.085, 0.06, 0.03, FY - 0.01)
    _keys('9042_trims', P, C, m['head'], [(fx(c), fy(r)) for c in (67, 76.7) for r in (180.9, 188.4, 195.9)], 0.04, 0.04, 0.02, FY - 0.01, bevel=0.0)
    _knobs('9042_knob', P, C, m['head'], [(fx(88.5 + 15.35 * i), fy(187.2)) for i in range(6)], 0.0525, 0.096, FY - 0.012)
    ball('9042_led', 0.022, (fx(177.5), FY - 0.03, fy(188)), m['lamp'], C, parent=P)
    _keys('9042_power', P, C, m['head'], [(fx(190.7), fy(189.2))], 0.12, 0.17, 0.05, FY - 0.01)
    # front tube handles either side of the control strip
    for s in (-1, 1):
        torus(f'9042_fhandle{s}', 0.12, 0.03, (s * (W / 2 - 0.04), FY - 0.06, pz + 0.02), m['head'], C,
              rot=(0, s * math.pi / 2, 0), arc=(0, math.pi), major=16, minor=8, scale=(1, 1.0, 1), parent=P)
    # top: carry-handle tray, fold-flat strap with end blocks, vent slots
    box('9042_tray', (0.80, 2.2, 0.012), (0, FY + 0.30 + 1.30, Y1 + 0.006), m['head'], C, bevel=0.0, parent=P)
    for i, y in enumerate((FY + 0.30 + 0.62, FY + 0.30 + 2.0)):
        box(f'9042_block{i}', (0.27, 0.33, 0.06), (0, y, Y1 + 0.03), m['head'], C, bevel=0.015, parent=P)
    box('9042_strap', (0.25, 1.40, 0.045), (0, FY + 0.30 + 1.31, Y1 + 0.04), m['head'], C, bevel=0.012, parent=P)
    ys = [FY + 0.42 + g + k * 0.0505 for g in (0.0, 0.76, 1.52) for k in range(10)]
    _slots('9042_vents', P, C, m['head'], [-0.915, -0.675, 0.675, 0.915], ys, Y1 + 0.004, 0.16, 0.017, along='x')
    # side vents
    for s in (-1, 1):
        _side_slots(f'9042_svent{s}', P, C, m['head'], s * (W / 2 - 0.025), [FY + 0.62 + k * 0.09 for k in range(7)] + [FY + 1.62 + k * 0.09 for k in range(7)],
                    [FOOT + 0.4, FOOT + 1.55], 0.16, 0.016, axis='z')
    for x in (-0.815, 0.815):
        for y in (FY + 0.45, FY + 2.6):
            box('9042_foot', (0.18, 0.18, FOOT), (x, y, FOOT / 2), m['head'], C, parent=P)
    return fr, Y1


# ------------------------------------------------------------------ KV-9PR1 --
def kv9pr1(P, C, m):
    W, D, BASE_H, SHELL_H = 2.18, 2.6, 0.13, 1.71
    CY = BASE_H + SHELL_H / 2
    FY = -D / 2
    SHELL_BY = FY + 1.76
    RIB_BY = SHELL_BY + 0.55
    # soft rounded shell (front section)
    bm = bm_box(W, SHELL_BY - FY, SHELL_H, center=(0, (FY + SHELL_BY) / 2, CY))
    # round the four long edges strongly, the front edge softly
    long_e = [e for e in bm.edges if abs(e.verts[0].co.y - e.verts[1].co.y) > 0.5]
    bevel_bm(bm, 0.15, 4, long_e)
    bm.normal_update()
    front_e = [e for e in bm.edges if all(v.co.y < FY + 0.001 for v in e.verts)]
    bevel_bm(bm, 0.05, 2, front_e)
    bm.normal_update()
    f = front_face(bm)
    from_bm('9pr1_shell', bm, m['head'], C, 'panel', parent=P)
    # bezel: raised rounded frame, sloping down to the tube
    bbm, bf = rr_loft([(2.06, 1.58, 0.10, 0.03), (2.06, 1.58, 0.10, -0.01), (1.80, 1.27, 0.06, -0.01),   # flat bezel face
                       (1.70, 1.21, 0.06, 0.07), (1.70, 1.21, 0.06, 0.085), (1.66, 1.18, 0.05, 0.045)],     # slope, tube
                      segs=4, cz=CY)
    bmesh.ops.translate(bbm, vec=(0, FY - 0.01, 0), verts=bbm.verts)
    bf.material_index = 1
    fr = face_frame(bf)
    from_bm('9pr1_bezel', bbm, m['head'], C, 'panel', mats=[m['screen']], parent=P)
    box('9pr1_badge', (0.28, 0.01, 0.056), (0, FY - 0.025, CY - 0.79 + 0.076), m['head'], C, parent=P)
    # ribbed rear section + end cap
    bm = bm_box(W - 0.04, RIB_BY - SHELL_BY, SHELL_H - 0.04, center=(0, (SHELL_BY + RIB_BY) / 2, CY))
    bevel_bm(bm, 0.13, 3, [e for e in bm.edges if abs(e.verts[0].co.y - e.verts[1].co.y) > 0.2])
    from_bm('9pr1_rib', bm, m['head'], C, 'panel', parent=P)
    bm = bm_box(W - 0.30, D / 2 - RIB_BY, SHELL_H - 0.44, center=(0, (RIB_BY + D / 2) / 2, CY + 0.08))
    bevel_bm(bm, 0.10, 3, [e for e in bm.edges if abs(e.verts[0].co.y - e.verts[1].co.y) > 0.1])
    from_bm('9pr1_cap', bm, m['head'], C, 'panel', parent=P)
    for s in (-1, 1):
        _side_slots(f'9pr1_ribs{s}', P, C, m['head'], s * (W / 2 - 0.02), [(SHELL_BY + RIB_BY) / 2],
                    [BASE_H + 0.18 + k * 0.047 * 2 for k in range(15)], 0.5, 0.013, axis='y')
    # pedestal base
    box('9pr1_base', (1.32, 1.70, BASE_H + 0.04), (0, FY + 0.08 + 0.85, (BASE_H + 0.04) / 2), m['head'], C, bevel=0.02, parent=P)
    box('9pr1_window', (0.32, 0.012, 0.088), (0.39, FY + 0.07, 0.064), m['lamp'], C, parent=P)
    # round speaker grille on the left side (-X): rings of holes
    bmh = bmesh.new()
    sx = -W / 2 - 0.004
    for r in range(0, 9):
        n = 1 if r == 0 else round((2 * math.pi * r * 5) / 5.4)
        for i in range(n):
            a = (i / n) * math.pi * 2 + r * 0.31
            y, z = FY + 0.9 + math.cos(a) * r * 0.05, 1.0 + math.sin(a) * r * 0.05
            vs = [bmh.verts.new((sx, y + 0.0135 * math.cos(2 * math.pi * k / 8), z + 0.0135 * math.sin(2 * math.pi * k / 8))) for k in range(8)]
            bmh.faces.new(vs)
    from_bm('9pr1_speaker', bmh, m['detail'], C, 'none', parent=P)
    torus('9pr1_speaker_rim', 0.46, 0.012, (sx, FY + 0.9, 1.0), m['head'], C, rot=(0, math.pi / 2, 0), parent=P)
    # top control strip with 6 rounded keys, aerial stub
    top = BASE_H + SHELL_H
    box('9pr1_strip', (0.96, 0.30, 0.012), (0.52, FY + 0.6, top + 0.004), m['head'], C, parent=P)
    for i, (dx, w) in enumerate([(-0.36, 0.18), (-0.15, 0.12), (-0.01, 0.12), (0.15, 0.12), (0.29, 0.12), (0.405, 0.07)]):
        box(f'9pr1_key{i}', (w, 0.09, 0.03), (0.52 + dx, FY + 0.6 - 0.03, top + 0.02), m['head'], C, bevel=0.012, parent=P)
    cyl('9pr1_aerial', 0.04, 0.034, 0.2, m['head'], C, parent=P, loc=(-0.74, FY + 1.5, top + 0.1))
    cyl('9pr1_aerial2', 0.022, 0.022, 0.12, m['head'], C, parent=P, loc=(-0.74, FY + 1.5, top + 0.26))
    return fr, top


# --------------------------------------------------------------- PVM-20M4E --
def pvm20m4e(P, C, m):
    W, H, D, FOOT = 4.50, 4.58, 3.8, 0.12
    BODY_H = H - FOOT
    CY = FOOT + BODY_H / 2
    FY = -D / 2
    bm = bm_box(W, D, BODY_H, center=(0, 0, CY))
    bevel_bm(bm, 0.07, 1, [e for e in bm.edges if abs(e.verts[0].co.y - e.verts[1].co.y) > 1])
    bm.normal_update()
    bevel_bm(bm, 0.03, 1, [e for e in bm.edges if all(v.co.y < FY + 0.001 for v in e.verts)])
    from_bm('20m4_case', bm, m['head'], C, 'sharp', parent=P)
    # screen: 406 x 312 opening, shallow funnel, then the tube
    scy = H - 0.26 - 1.56
    sbm, sf = rr_loft([(4.08, 3.14, 0.11, 0.02), (4.08, 3.14, 0.11, -0.01), (4.06, 3.12, 0.10, 0.0),
                       (3.96, 3.02, 0.14, 0.15), (3.92, 2.98, 0.13, 0.175), (3.86, 2.92, 0.12, 0.105)], segs=3, cz=scy)
    bmesh.ops.translate(sbm, vec=(0, FY, 0), verts=sbm.verts)
    sf.material_index = 1
    fr = face_frame(sf)
    from_bm('20m4_screen', sbm, m['head'], C, 'sharp', mats=[m['screen']], parent=P)
    # tally, badges
    box('20m4_tally', (0.18, 0.02, 0.08), (0, FY - 0.006, H - 0.13), m['lamp'], C, parent=P)
    for x, w in ((0, 0.46), (-1.43, 1.2), (1.76, 0.6)):
        box('20m4_badge', (w, 0.012, 0.10), (x, FY - 0.004, FOOT + 0.86), m['head'], C, parent=P)
    # control strip: 13 buttons, 6 knobs, power with LED
    pcy = FOOT + 0.40
    box('20m4_panel', (4.20, 0.03, 0.46), (0, FY - 0.004, pcy), m['head'], C, bevel=0.015, parent=P)
    y = pcy - 0.02
    xs = [-196, -180, -164, -144, -120, -104, -88, -72, -52, -26, -10, 6, 22]
    _keys('20m4_buttons', P, C, m['head'], [(x / 100, y) for x in xs], 0.11, 0.07, 0.04, FY - 0.015)
    bm = bmesh.new()
    for x in xs[:8]:
        for v in bmesh.ops.create_circle(bm, cap_ends=True, segments=10, radius=0.0125)['verts']:
            v.co = Vector((x / 100 + v.co.x, FY - 0.022, y + 0.095 + v.co.y))
    from_bm('20m4_lamps', bm, m['lamp'], C, 'none', parent=P)
    _knobs('20m4_knob', P, C, m['head'], [((52 + i * 23) / 100, y - 0.01) for i in range(6)], 0.073, 0.11, FY - 0.015)
    _keys('20m4_power', P, C, m['head'], [(1.98, y - 0.01)], 0.124, 0.184, 0.06, FY - 0.015)
    ball('20m4_led', 0.022, (1.85, FY - 0.03, y + 0.11), m['lamp'], C, parent=P)
    # side carry grips and vents
    for s in (-1, 1):
        box(f'20m4_grip{s}', (0.02, 1.30, 0.40), (s * (W / 2 + 0.005), -0.3, FOOT + BODY_H * 0.66), m['head'], C, bevel=0.008, parent=P)
        _side_slots(f'20m4_svent{s}', P, C, m['head'], s * (W / 2 + 0.002), [0.6, 1.5], [FOOT + 0.6 + k * 0.07 for k in range(14)], 0.70, 0.026, axis='y')
    _slots('20m4_tvents', P, C, m['head'], [-1.4, 0, 1.4], [D / 2 - 0.4 - k * 0.075 for k in range(26)], H + 0.004, 1.1, 0.028, along='x')
    for x in (-1.8, 1.8):
        for yy in (FY + 0.6, D / 2 - 0.7):
            cyl('20m4_foot', 0.15, 0.13, FOOT, m['head'], C, parent=P, loc=(x, yy, FOOT / 2))
    return fr, H
