"""Hologram post pass for the Giant previews (same recipe as ../post.py):
soft glow, faint scan band, 1 px dark scanline every 3 px, slight grain,
DotGothic16 labels.

    python3 giant_post.py            -> previews/*.png, *.mp4, *.gif
"""
import os, glob, subprocess, json
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
PRE = os.path.join(HERE, 'previews'); RAW = os.path.join(PRE, 'raw')
FONT = '/usr/share/fonts/truetype/sand-box/google/DotGothic16/DotGothic16-Regular.ttf'
GREEN = np.array([141, 255, 154]) / 255.0
BG = np.array([10, 12, 10]) / 255.0
G8 = (141, 255, 154)


def blur(a, r):
    return np.stack([np.asarray(Image.fromarray((np.clip(a[..., i], 0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r)), dtype=np.float32) / 255 for i in range(3)], -1)


def holo(img, seed=0, band=0.58):
    holo = np.asarray(img.convert('RGB'), dtype=np.float32) / 255
    H, W = holo.shape[:2]; s = H / 1350
    out = holo + blur(holo, max(1, 3 * s)) * 0.45 + blur(holo, 14 * s) * 0.24 + blur(holo, 40 * s) * 0.12
    yy = np.arange(H)[:, None]; xs = np.arange(W)[None, :]
    b = np.exp(-((yy - H * band) / (16 * s)) ** 2)
    out = out * (1 + 0.35 * b[..., None]) + b[..., None] * GREEN * 0.04
    vign = 1 - 0.35 * (((xs - W / 2) / (W * 0.7)) ** 2 + ((yy - H / 2) / (H * 0.67)) ** 2)
    out = BG * vign[..., None] + out
    out[np.arange(H) % 3 == 0] *= 0.65
    rng = np.random.default_rng(seed)
    out = out + rng.normal(0, 0.022, (H, W, 1)) * (0.6 + 0.4 * out.mean(-1, keepdims=True))
    return Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8))


def label(img, text, size, xy, anchor='la'):
    d = ImageDraw.Draw(img)
    d.text(xy, text, font=ImageFont.truetype(FONT, size), fill=G8, anchor=anchor)


def rest():
    im = holo(Image.open(os.path.join(RAW, 'rest_front.png')))
    label(im, 'GIANT  /  REST POSE', 34, (540, 1290), 'mm')
    im.save(os.path.join(PRE, 'rest_front.png'))


EXPRS = ['neutral', 'happy', 'blink', 'surprised', 'sad', 'thinking', 'wink', 'angry']


def expressions():
    cw, ch, g = 600, 520, 10
    small_h = 130
    cols = 4
    rows = 2
    sheet = Image.new('RGB', (cols * cw + (cols + 1) * g, rows * (ch + 40) + g * 2 + 60 + 220), (6, 8, 6))
    d = ImageDraw.Draw(sheet)
    f = ImageFont.truetype(FONT, 30)
    d.text((g, 18), 'GIANT  EYE EXPRESSIONS  (object name: eyes_<name>)', font=f, fill=G8)
    y0 = 60
    for i, e in enumerate(EXPRS):
        x = g + (i % cols) * (cw + g); y = y0 + (i // cols) * (ch + 40)
        sheet.paste(holo(Image.open(os.path.join(RAW, f'expr_head_{e}.png')), seed=i, band=0.7), (x, y))
        d.text((x + cw / 2, y + ch + 20), e.upper(), font=f, fill=G8, anchor='mm')
    # small-size row: whole body at ~130 px tall, as on the site
    y = y0 + rows * (ch + 40) + 10
    d.text((g, y), 'AT SITE SIZE (160 px frame, character ~140 px tall, 1:1 pixels)', font=ImageFont.truetype(FONT, 24), fill=G8)
    for i, e in enumerate(EXPRS):
        im = holo(Image.open(os.path.join(RAW, f'expr_body_{e}.png')).resize((int(432 * 160 / 540), 160), Image.LANCZOS), seed=i)
        x = g + i * (im.width + 16)
        sheet.paste(im, (x, y + 36))
        d.text((x + im.width / 2, y + 36 + 160 + 12), e, font=ImageFont.truetype(FONT, 18), fill=G8, anchor='mm')
    sheet.save(os.path.join(PRE, 'expressions_sheet.png'))


def strip(name, frames, fps=30):
    ims = []
    for k, f in enumerate(frames):
        im = holo(Image.open(os.path.join(RAW, name, f'{f:04d}.png')), seed=k)
        label(im, f'{name}  f{f}  {f / fps:.2f}s', 22, (12, 12))
        ims.append(im)
    W, Hh = ims[0].size
    out = Image.new('RGB', (len(ims) * W + (len(ims) - 1) * 6, Hh), (6, 8, 6))
    for k, im in enumerate(ims): out.paste(im, (k * (W + 6), 0))
    out.save(os.path.join(PRE, f'strip_{name}.png'))


def video(name, fps=30):
    tmp = os.path.join(RAW, name + '_post'); os.makedirs(tmp, exist_ok=True)
    files = sorted(glob.glob(os.path.join(RAW, name, '*.png')))
    for k, p in enumerate(files):
        im = holo(Image.open(p), seed=k)
        label(im, name, 24, (12, 12))
        im.save(os.path.join(tmp, f'{k:04d}.png'))
    n = len(files) - 1      # drop the last frame (== first) so the loop does not stutter
    mp4 = os.path.join(PRE, f'{name}.mp4'); gif = os.path.join(PRE, f'{name}.gif')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', str(fps), '-i', os.path.join(tmp, '%04d.png'),
                    '-frames:v', str(n), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', mp4], check=True)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', str(fps), '-i', os.path.join(tmp, '%04d.png'),
                    '-frames:v', str(n), '-vf', 'fps=15,scale=324:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=64[p];[b][p]paletteuse',
                    '-loop', '0', gif], check=True)


if __name__ == '__main__':
    import sys
    a = sys.argv[1:]
    if a[0] == 'rest': rest()
    elif a[0] == 'expr': expressions()
    elif a[0] == 'strip': strip(a[1], [int(x) for x in a[2].split(',')])
    elif a[0] == 'video': video(a[1])
