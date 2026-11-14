"""Helpers for building hologram line-art characters in Blender 4.2.

Everything is additive emission (faint fill) + Freestyle edges, so the render
looks like the <retro-map> hologram: phosphor green #8dff9a on black.
Units: 1 = 100 mm. Characters face -Y, Z up.
"""
import bpy, bmesh, math
from mathutils import Vector, Matrix
from bpy_extras.object_utils import world_to_camera_view

GREEN = (0.266, 1.0, 0.323)          # #8dff9a in linear
WHITE = (0.85, 1.0, 0.88)

# ------------------------------------------------------------------ scene --
def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.world = bpy.data.worlds.new('W')
    sc.world.use_nodes = True
    sc.world.node_tree.nodes['Background'].inputs[1].default_value = 0.0
    return sc

def collection(name):
    c = bpy.data.collections.get(name) or bpy.data.collections.new(name)
    if c.name not in bpy.context.scene.collection.children:
        bpy.context.scene.collection.children.link(c)
    return c

_mats = {}
def mat(name, strength, color=GREEN):
    """Additive emission: Transparent + Emission, so overlaps add up like the map."""
    if name in _mats: return _mats[name]
    m = bpy.data.materials.new(name); m.use_nodes = True
    nt = m.node_tree; nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    em = nt.nodes.new('ShaderNodeEmission'); em.inputs[0].default_value = (*color, 1); em.inputs[1].default_value = strength
    tr = nt.nodes.new('ShaderNodeBsdfTransparent')
    add = nt.nodes.new('ShaderNodeAddShader')
    nt.links.new(tr.outputs[0], add.inputs[0]); nt.links.new(em.outputs[0], add.inputs[1])
    nt.links.new(add.outputs[0], out.inputs[0])
    m.blend_method = 'BLEND'
    _mats[name] = m
    return m

def std_mats():
    return dict(
        head=mat('head_fill', 0.035), body=mat('body_fill', 0.016), screen=mat('screen_fill', 0.28),
        eye=mat('eye', 2.4), eye_dim=mat('eye_dim', 0.75), eye_hi=mat('eye_hi', 5.0, WHITE),
        detail=mat('screen_detail', 0.22), fx=mat('fx_line', 0.9), fx_dim=mat('fx_dim', 0.35),
        lamp=mat('lamp', 1.6),
    )

def clear_mat_cache():
    _mats.clear()

# ------------------------------------------------------------------ mesh --
def _mark_edges(me, bm, mode, angle=35, big=0.08):
    marks = []
    if mode == 'none':
        return marks
    maxa = max((f.calc_area() for f in bm.faces), default=1) or 1
    for e in bm.edges:
        if len(e.link_faces) != 2:
            marks.append(e.index); continue
        a = e.calc_face_angle(0)
        if mode == 'sharp' and a > math.radians(angle):
            marks.append(e.index)
        elif mode == 'panel':
            fa = [f.calc_area() for f in e.link_faces]
            if a > math.radians(62) or (a > math.radians(6) and max(fa) > big * maxa):
                marks.append(e.index)
    return marks

def from_bm(name, bm, material, coll, mode='sharp', mats=None, parent=None, loc=(0, 0, 0), rot=(0, 0, 0)):
    bm.edges.index_update(); bm.faces.index_update()
    me = bpy.data.meshes.new(name)
    marks = _mark_edges(me, bm, mode)
    bm.to_mesh(me); bm.free()
    for i in marks: me.edges[i].use_freestyle_mark = True
    me.materials.append(material)
    for m in (mats or []): me.materials.append(m)
    ob = bpy.data.objects.new(name, me)
    coll.objects.link(ob)
    ob.location = loc; ob.rotation_euler = rot
    if parent: ob.parent = parent
    return ob

def bm_box(sx, sy, sz, bevel=0.0, segs=1, center=(0, 0, 0)):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    for v in bm.verts:
        v.co = Vector((v.co.x * sx + center[0], v.co.y * sy + center[1], v.co.z * sz + center[2]))
    if bevel > 0:
        bmesh.ops.bevel(bm, geom=list(bm.verts) + list(bm.edges), offset=bevel, offset_type='OFFSET',
                        segments=segs, profile=0.5, affect='EDGES', clamp_overlap=True)
    return bm

def bevel_bm(bm, bevel, segs=1, edges=None):
    bmesh.ops.bevel(bm, geom=list(bm.verts) + list(edges if edges is not None else bm.edges), offset=bevel,
                    offset_type='OFFSET', segments=segs, profile=0.5, affect='EDGES', clamp_overlap=True)

def box(name, size, center, material, coll, bevel=0.0, segs=1, mode='sharp', parent=None, rot=(0, 0, 0)):
    bm = bm_box(*size, bevel=bevel, segs=segs)
    return from_bm(name, bm, material, coll, mode, parent=parent, loc=center, rot=rot)

def cyl(name, r1, r2, depth, material, coll, segs=24, mode='sharp', parent=None, loc=(0, 0, 0), rot=(0, 0, 0)):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=segs, radius1=r1, radius2=r2, depth=depth)
    return from_bm(name, bm, material, coll, mode, parent=parent, loc=loc, rot=rot)

def ball(name, r, center, material, coll, parent=None, scale=(1, 1, 1), u=20, v=12):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=u, v_segments=v, radius=r)
    for vv in bm.verts: vv.co = Vector((vv.co.x * scale[0], vv.co.y * scale[1], vv.co.z * scale[2]))
    return from_bm(name, bm, material, coll, 'none', parent=parent, loc=center)

def limb(name, p1, p2, r1, material, coll, r2=None, segs=20, parent=None):
    p1, p2 = Vector(p1), Vector(p2)
    d = p2 - p1
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=segs, radius1=r1, radius2=r2 or r1, depth=d.length)
    q = Vector((0, 0, 1)).rotation_difference(d.normalized())
    M = Matrix.Translation((p1 + p2) / 2) @ q.to_matrix().to_4x4()
    bmesh.ops.transform(bm, matrix=M, verts=bm.verts)
    return from_bm(name, bm, material, coll, 'sharp', parent=parent)

def torus(name, R, r, center, material, coll, rot=(0, 0, 0), scale=(1, 1, 1), parent=None, major=48, minor=8, arc=None):
    """Torus (or a partial arc when arc=(a0,a1) radians) in the XY plane."""
    bm = bmesh.new()
    a0, a1 = arc if arc else (0, 2 * math.pi)
    closed = arc is None
    n = major
    rings = []
    for i in range(n if closed else n + 1):
        t = a0 + (a1 - a0) * i / n
        c = Vector((math.cos(t) * R * scale[0], math.sin(t) * R * scale[1], 0))
        out = Vector((math.cos(t), math.sin(t), 0))
        ring = []
        for j in range(minor):
            s = 2 * math.pi * j / minor
            ring.append(bm.verts.new(c + out * (math.cos(s) * r) + Vector((0, 0, math.sin(s) * r))))
        rings.append(ring)
    for i in range(len(rings) - (0 if closed else 1)):
        A, B = rings[i], rings[(i + 1) % len(rings)]
        for j in range(minor):
            bm.faces.new((A[j], A[(j + 1) % minor], B[(j + 1) % minor], B[j]))
    if not closed:
        bm.faces.new(rings[0][::-1]); bm.faces.new(rings[-1])
    return from_bm(name, bm, material, coll, 'none', parent=parent, loc=center, rot=rot)

def cable(name, pts, r, material, coll, parent=None):
    cu = bpy.data.curves.new(name, 'CURVE'); cu.dimensions = '3D'
    sp = cu.splines.new('BEZIER'); sp.bezier_points.add(len(pts) - 1)
    for bp, p in zip(sp.bezier_points, pts):
        bp.co = p; bp.handle_left_type = bp.handle_right_type = 'AUTO'
    cu.bevel_depth = r; cu.bevel_resolution = 2; cu.resolution_u = 16; cu.use_fill_caps = True
    tmp = bpy.data.objects.new(name + '_tmp', cu); coll.objects.link(tmp)
    bpy.context.view_layer.update()
    me = bpy.data.meshes.new_from_object(tmp.evaluated_get(bpy.context.evaluated_depsgraph_get()))
    bpy.data.objects.remove(tmp); bpy.data.curves.remove(cu)
    me.materials.clear(); me.materials.append(material)
    ob = bpy.data.objects.new(name, me); coll.objects.link(ob)
    if parent: ob.parent = parent
    return ob

def front_face(bm, normal=Vector((0, -1, 0))):
    best, score = None, -1
    for f in bm.faces:
        s = f.normal.dot(normal)
        if s > 0.7:
            sc = f.calc_area() * s
            if sc > score: best, score = f, sc
    return best

def inset(bm, face, thickness, depth=0.0):
    """Inset a face, then push it along its normal (depth < 0 goes in).
    Done as two steps: inset_region with both at once overshoots on rounded corners."""
    n = face.normal.copy()
    bmesh.ops.inset_region(bm, faces=[face], thickness=max(thickness, 1e-5), depth=0.0, use_even_offset=True)
    if depth:
        bmesh.ops.translate(bm, vec=n * depth, verts=list(face.verts))
    bm.normal_update()
    return face

def face_frame(face):
    """centre, normal, x-axis, up-axis, width, height of a (roughly planar) face."""
    c = face.calc_center_median(); n = face.normal.normalized()
    x = Vector((1, 0, 0)); x = (x - n * x.dot(n)).normalized()
    up = n.cross(x).normalized()
    xs = [(v.co - c).dot(x) for v in face.verts]; ys = [(v.co - c).dot(up) for v in face.verts]
    return dict(c=c.copy(), n=n.copy(), x=x, up=up, w=max(xs) - min(xs), h=max(ys) - min(ys))

def frame_matrix(fr, lift=0.006, dx=0.0, dy=0.0):
    c = fr['c'] + fr['n'] * lift + fr['x'] * dx + fr['up'] * dy
    M = Matrix.Identity(4)
    M.col[0][:3] = fr['x']; M.col[1][:3] = fr['up']; M.col[2][:3] = fr['n']
    M.col[3][:3] = c
    return M

# ------------------------------------------------------------- 2D shapes --
def shape2d(name, polys, M, material, coll, parent=None):
    """polys: list of 2D outlines (lists of (x, y)) placed with matrix M (x, up, normal)."""
    bm = bmesh.new()
    for poly in polys:
        vs = [bm.verts.new(M @ Vector((x, y, 0))) for x, y in poly]
        bm.faces.new(vs)
    return from_bm(name, bm, material, coll, 'none', parent=parent)

def rect(cx, cy, w, h):
    return [(cx - w / 2, cy - h / 2), (cx + w / 2, cy - h / 2), (cx + w / 2, cy + h / 2), (cx - w / 2, cy + h / 2)]

def ellipse(cx, cy, rx, ry, n=40):
    return [(cx + rx * math.cos(2 * math.pi * i / n), cy + ry * math.sin(2 * math.pi * i / n)) for i in range(n)]

def ring2d(cx, cy, rx, ry, t, n=48):
    """An elliptical ring as n quads."""
    out = []
    for i in range(n):
        a0, a1 = 2 * math.pi * i / n, 2 * math.pi * (i + 1) / n
        out.append([(cx + rx * math.cos(a0), cy + ry * math.sin(a0)), (cx + rx * math.cos(a1), cy + ry * math.sin(a1)),
                    (cx + (rx - t) * math.cos(a1), cy + (ry - t) * math.sin(a1)), (cx + (rx - t) * math.cos(a0), cy + (ry - t) * math.sin(a0))])
    return out

def capsule(cx, cy, length, t, n=10):
    pts = []
    r = t / 2; x0, x1 = cx - length / 2 + r, cx + length / 2 - r
    for i in range(n + 1):
        a = -math.pi / 2 + math.pi * i / n
        pts.append((x1 + r * math.cos(a), cy + r * math.sin(a)))
    for i in range(n + 1):
        a = math.pi / 2 + math.pi * i / n
        pts.append((x0 + r * math.cos(a), cy + r * math.sin(a)))
    return pts

def star4(cx, cy, r, k=0.28):
    pts = []
    for i in range(8):
        a = math.pi / 2 + i * math.pi / 4
        rr_ = r if i % 2 == 0 else r * k
        pts.append((cx + rr_ * math.cos(a), cy + rr_ * math.sin(a)))
    return pts

# ------------------------------------------------------------ render --
def empty(name, loc=(0, 0, 0), rot=(0, 0, 0), scale=1.0, coll=None, parent=None):
    e = bpy.data.objects.new(name, None)
    (coll or bpy.context.scene.collection).objects.link(e)
    e.location = loc; e.rotation_euler = rot; e.scale = (scale, scale, scale)
    if parent: e.parent = parent
    return e

def setup_render(sc, res=(1080, 1350), samples=24):
    sc.render.engine = 'CYCLES'
    sc.cycles.device = 'CPU'
    sc.cycles.samples = samples
    sc.cycles.use_denoising = False
    sc.cycles.use_adaptive_sampling = False
    sc.cycles.max_bounces = 0
    sc.cycles.transparent_max_bounces = 128
    sc.cycles.transmission_bounces = 0
    sc.render.resolution_x, sc.render.resolution_y = res
    sc.render.resolution_percentage = 100
    sc.render.film_transparent = False
    sc.view_settings.view_transform = 'Standard'
    sc.view_settings.look = 'None'
    sc.render.image_settings.file_format = 'PNG'
    sc.render.image_settings.color_depth = '16'
    sc.render.use_freestyle = True
    sc.render.line_thickness_mode = 'ABSOLUTE'

def lineset(vl, name, coll, visibility, thickness, alpha, color=GREEN):
    fs = vl.freestyle_settings
    ls = fs.linesets.new(name)
    ls.select_by_visibility = True; ls.visibility = visibility
    ls.select_by_edge_types = True
    ls.select_silhouette = True; ls.select_border = True; ls.select_crease = False
    ls.select_edge_mark = True; ls.select_external_contour = True
    ls.select_by_collection = True; ls.collection = coll
    st = ls.linestyle
    st.color = color; st.alpha = alpha; st.thickness = thickness
    st.caps = 'ROUND'
    st.chaining = 'PLAIN'
    return ls

def setup_lines(sc, head_coll, body_coll):
    vl = sc.view_layers[0]
    fs = vl.freestyle_settings
    fs.mode = 'EDITOR'
    fs.crease_angle = math.radians(120)
    for l in list(fs.linesets): fs.linesets.remove(l)
    lineset(vl, 'head_visible', head_coll, 'VISIBLE', 2.4, 1.0)
    lineset(vl, 'head_hidden', head_coll, 'HIDDEN', 1.1, 0.2)
    lineset(vl, 'body_visible', body_coll, 'VISIBLE', 1.9, 0.78)
    lineset(vl, 'body_hidden', body_coll, 'HIDDEN', 1.0, 0.15)

def world_bbox(objs):
    mn = Vector((1e9,) * 3); mx = Vector((-1e9,) * 3)
    for o in objs:
        if o.type != 'MESH': continue
        for c in o.bound_box:
            w = o.matrix_world @ Vector(c)
            mn = Vector(map(min, mn, w)); mx = Vector(map(max, mx, w))
    return mn, mx

def corners(mn, mx):
    return [Vector((x, y, z)) for x in (mn.x, mx.x) for y in (mn.y, mx.y) for z in (mn.z, mx.z)]

def place_camera(sc, objs, azim_deg, elev_deg, lens=70, frame=(0.07, 0.80, 0.10, 0.84)):
    """Point a camera at the character and fit its box into frame=(x0,x1,y0,y1) in NDC (0..1)."""
    bpy.context.view_layer.update()
    mn, mx = world_bbox(objs)
    cd = bpy.data.cameras.new('Cam'); cd.lens = lens; cd.sensor_fit = 'VERTICAL'; cd.sensor_height = 36
    cam = bpy.data.objects.new('Cam', cd); sc.collection.objects.link(cam); sc.camera = cam
    a, e = math.radians(azim_deg), math.radians(elev_deg)
    dirv = Vector((math.sin(a) * math.cos(e), -math.cos(a) * math.cos(e), math.sin(e)))
    tgt = (mn + mx) / 2
    dist = (mx - mn).length * 2.2
    pts = corners(mn, mx)
    for _ in range(8):
        cam.location = tgt + dirv * dist
        cam.rotation_euler = (-dirv).to_track_quat('-Z', 'Y').to_euler()
        bpy.context.view_layer.update()
        ps = [world_to_camera_view(sc, cam, p) for p in pts]
        x0, x1 = min(p.x for p in ps), max(p.x for p in ps)
        y0, y1 = min(p.y for p in ps), max(p.y for p in ps)
        fx = (x1 - x0) / (frame[1] - frame[0]); fy = (y1 - y0) / (frame[3] - frame[2])
        f = max(fx, fy)
        # shift target so box centre lands on frame centre
        cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
        tx, ty = (frame[0] + frame[1]) / 2, (frame[2] + frame[3]) / 2
        M = cam.matrix_world.to_3x3()
        right, upv = M.col[0], M.col[1]
        half_h = math.tan(math.atan(18 / lens)) * dist  # half view height at target distance
        half_w = half_h * sc.render.resolution_x / sc.render.resolution_y
        tgt = tgt + right * (cx - tx) * 2 * half_w + upv * (cy - ty) * 2 * half_h
        dist *= f
    cam.location = tgt + dirv * dist
    cam.rotation_euler = (-dirv).to_track_quat('-Z', 'Y').to_euler()
    bpy.context.view_layer.update()
    return cam

def project_bbox(sc, cam, objs):
    mn, mx = world_bbox(objs)
    ps = [world_to_camera_view(sc, cam, p) for p in corners(mn, mx)]
    W, H = sc.render.resolution_x, sc.render.resolution_y
    return dict(x0=min(p.x for p in ps) * W, x1=max(p.x for p in ps) * W,
                y0=(1 - max(p.y for p in ps)) * H, y1=(1 - min(p.y for p in ps)) * H)

def project_point(sc, cam, p):
    q = world_to_camera_view(sc, cam, Vector(p))
    return (q.x * sc.render.resolution_x, (1 - q.y) * sc.render.resolution_y)


def rr_points(w, h, r, segs=4, cx=0.0, cz=0.0):
    """Convex rounded-rectangle outline in the XZ plane (counter-clockwise seen from +Y)."""
    r = min(r, w / 2 - 1e-4, h / 2 - 1e-4)
    pts = []
    for (qx, qz, a0) in ((w / 2 - r, h / 2 - r, 0), (-w / 2 + r, h / 2 - r, 90), (-w / 2 + r, -h / 2 + r, 180), (w / 2 - r, -h / 2 + r, 270)):
        for i in range(segs + 1):
            a = math.radians(a0 + 90 * i / segs)
            pts.append((cx + qx + r * math.cos(a), cz + qz + r * math.sin(a)))
    return pts


def rr_slab(w, h, r, depth, segs=4, cz=0.0):
    """Rounded-rect slab: front face at y=0 (normal -Y), back at y=+depth. Returns (bm, front_face)."""
    bm = bmesh.new()
    vs = [bm.verts.new((x, depth, z)) for x, z in rr_points(w, h, r, segs, 0.0, cz)]
    f = bm.faces.new(vs)
    ext = bmesh.ops.extrude_face_region(bm, geom=[f])
    nv = [g for g in ext['geom'] if isinstance(g, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, vec=(0, -depth, 0), verts=nv)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.normal_update()
    return bm, front_face(bm)


def rr_loft(rings, segs=4, cz=0.0):
    """Loft rounded-rect rings (w, h, r, y) front to back like the repo's `loft`.
    rings[0] is capped at the back (y of rings[0]), the last ring is capped as the
    glass. Every ring has the same vertex count so corners never fold over.
    Returns (bm, glass_face)."""
    bm = bmesh.new()
    loops = []
    for (w, h, r, y) in rings:
        loops.append([bm.verts.new((x, y, z)) for x, z in rr_points(w, h, r, segs, 0.0, cz)])
    n = len(loops[0])
    for A, B in zip(loops, loops[1:]):
        for i in range(n):
            j = (i + 1) % n
            bm.faces.new((A[i], A[j], B[j], B[i]))
    back = bm.faces.new(loops[0])
    glass = bm.faces.new(loops[-1][::-1])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.normal_update()
    if glass.normal.y > 0:   # make sure the glass looks forward
        glass.normal_flip()
    return bm, glass
