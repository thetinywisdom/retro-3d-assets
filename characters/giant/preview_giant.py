"""Hologram-style preview renders of giant_rig.blend (Cycles CPU + Freestyle).

    blender -b giant_rig.blend --python preview_giant.py -- still
    blender -b giant_rig.blend --python preview_giant.py -- expr
    blender -b giant_rig.blend --python preview_giant.py -- clip idle [step]

Raw renders go to previews/raw/; giant_post.py adds the glow + scanlines.
Preview materials are swapped in at render time only (the .blend/.glb keep
their simple emissive materials).
"""
import bpy, sys, os, math, json
HERE = os.path.dirname(os.path.abspath(bpy.data.filepath))
sys.path.insert(0, os.path.dirname(HERE))
import holo_lib as H
from mathutils import Vector

argv = sys.argv[sys.argv.index('--') + 1:]
mode = argv[0]
RAW = os.path.join(HERE, 'previews', 'raw'); os.makedirs(RAW, exist_ok=True)
sc = bpy.context.scene
arm = bpy.data.objects['Giant']
C = bpy.data.collections
sc.world.use_nodes = True
sc.world.node_tree.nodes['Background'].inputs[1].default_value = 0.0

# hologram preview materials, like dir4 / <retro-map>
m = H.std_mats()
swap = {'holo_fill': None, 'holo_screen': m['screen'], 'holo_eye': m['eye'], 'holo_fx': m['fx']}
for ob in bpy.data.objects:
    if ob.type != 'MESH' or not ob.data.materials: continue
    n = ob.data.materials[0].name
    if n == 'holo_fill':
        ob.data.materials[0] = m['head'] if ob.users_collection[0].name == 'head' else m['body']
    elif n in swap and swap[n]:
        ob.data.materials[0] = swap[n]
    if ob.users_collection[0].name == 'edges':
        ob.hide_render = True          # line-only meshes: Freestyle draws the edges instead


def lines(scale):
    vl = sc.view_layers[0]; fs = vl.freestyle_settings
    fs.mode = 'EDITOR'; fs.crease_angle = math.radians(120)
    for l in list(fs.linesets): fs.linesets.remove(l)
    for cn, vis, th, al in (('head', 'VISIBLE', 2.4, 1.0), ('head', 'HIDDEN', 1.1, 0.2),
                            ('body', 'VISIBLE', 1.9, 0.78), ('body', 'HIDDEN', 1.0, 0.15)):
        ls = H.lineset(vl, f'{cn}_{vis}', C[cn], vis, max(0.8, th * scale), al)


def setup(res, samples):
    H.setup_render(sc, res=res, samples=samples)
    sc.render.image_settings.color_depth = '8'
    lines(res[1] / 1350)


def set_expr(name):
    for ob in C['eyes'].objects:
        if ob.name.startswith('eyes_'):
            ob.hide_render = ob.name != f'eyes_{name}'


def set_clip(name, frame):
    arm.animation_data.action = bpy.data.actions[name]
    sc.frame_set(frame)


def body_objs():
    return [o for cn in ('head', 'body') for o in C[cn].objects if o.type == 'MESH']


def camera(azim=24, elev=8, frame=(0.08, 0.92, 0.07, 0.93), objs=None, lens=70):
    for o in [o for o in bpy.data.objects if o.type == 'CAMERA']: bpy.data.objects.remove(o)
    return H.place_camera(sc, objs or body_objs(), azim, elev, lens=lens, frame=frame)


def render(path):
    sc.render.filepath = path
    bpy.ops.render.render(write_still=True)


EXPRS = ['neutral', 'happy', 'blink', 'surprised', 'sad', 'thinking', 'wink', 'angry', 'dizzy']
set_expr('neutral')
set_clip('idle', 0)

if mode == 'still':
    setup((1080, 1350), 32)
    camera(frame=(0.12, 0.88, 0.1, 0.9))
    render(os.path.join(RAW, 'rest_front.png'))
elif mode == 'expr':
    # head close-ups, nearly front-on
    setup((600, 520), 24)
    camera(azim=10, elev=4, objs=[bpy.data.objects['head_fill']], frame=(0.1, 0.9, 0.08, 0.92))
    for e in EXPRS:
        set_expr(e); render(os.path.join(RAW, f'expr_head_{e}.png'))
    # whole body for the small-size readability row
    setup((432, 540), 24)
    camera(frame=(0.1, 0.9, 0.06, 0.94))
    for e in EXPRS:
        set_expr(e); render(os.path.join(RAW, f'expr_body_{e}.png'))
elif mode == 'clip':
    name = argv[1]; step = int(argv[2]) if len(argv) > 2 else 1
    frames = argv[3] if len(argv) > 3 else None
    act = bpy.data.actions[name]
    setup((432, 540), int(os.environ.get('SAMPLES', 8)))
    set_clip('idle', 0)
    camera(frame=(0.18, 0.82, 0.08, 0.92))        # same framing for every clip, room for the motion
    out = os.path.join(RAW, name); os.makedirs(out, exist_ok=True)
    fl = [int(x) for x in frames.split(',')] if frames else range(0, int(act.frame_range[1]) + 1, step)
    for f in fl:
        set_clip(name, f)
        render(os.path.join(out, f'{f:04d}.png'))
print('DONE', mode)
