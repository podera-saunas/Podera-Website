# Generates PODERA brand LUTs (.cube, 33^3). Owned by PODERA; no third-party data.
#   podera_warm   : filmic S-curve, warm graphite shadows, cream highlights, -8% saturation
#   podera_night  : for blue-hour exteriors — keeps the sky blue, warms the lights, deeper blacks
#   podera_film   : softer contrast, lifted blacks, gentle halation-like warmth in highlights
import sys, numpy as np
N = 33
def s_curve(x, k):
    return x + k * (x - x * x) * (2 * x - 1) * -1  # gentle S around mid-grey
def apply(rgb, name):
    r, g, b = rgb
    l = 0.2126 * r + 0.7152 * g + 0.0722 * b
    if name == 'podera_warm':
        sat = 0.92; lift = 0.012
        r, g, b = [l + (c - l) * sat for c in (r, g, b)]
        r, g, b = [s_curve(c, 0.18) for c in (r, g, b)]
        sh = (1 - l) ** 2; hi = l ** 2
        r += 0.03 * sh + 0.025 * hi; g += 0.012 * sh + 0.02 * hi; b += -0.02 * sh - 0.01 * hi
        r, g, b = [lift + c * (1 - lift) for c in (r, g, b)]
    elif name == 'podera_night':
        sat = 0.95
        r, g, b = [l + (c - l) * sat for c in (r, g, b)]
        r, g, b = [s_curve(c, 0.25) for c in (r, g, b)]
        warm = np.clip((r - b) * 2, 0, 1)  # warm pixels (lamps, sauna glow) get warmer
        r += 0.04 * warm; g += 0.015 * warm; b -= 0.03 * warm
        r, g, b = [c * 0.97 for c in (r, g, b)]
    elif name == 'podera_film':
        sat = 0.88; lift = 0.035
        r, g, b = [l + (c - l) * sat for c in (r, g, b)]
        r, g, b = [s_curve(c, 0.1) for c in (r, g, b)]
        hi = np.clip((l - 0.7) / 0.3, 0, 1)
        r += 0.03 * hi; g += 0.012 * hi
        r, g, b = [lift + c * (1 - lift - 0.02) for c in (r, g, b)]
    return [float(np.clip(c, 0, 1)) for c in (r, g, b)]
for name in ('podera_warm', 'podera_night', 'podera_film'):
    with open(f"{sys.argv[1]}/{name}.cube", 'w') as fh:
        fh.write(f'TITLE "{name}"\nLUT_3D_SIZE {N}\n')
        for bi in range(N):
            for gi in range(N):
                for ri in range(N):
                    v = apply((ri / (N - 1), gi / (N - 1), bi / (N - 1)), name)
                    fh.write(f"{v[0]:.6f} {v[1]:.6f} {v[2]:.6f}\n")
