"""Convert connected silhouettes in the supplied artwork into one GPU-friendly atlas."""
from pathlib import Path
import json, sys
import cv2
import numpy as np
from PIL import Image

SOURCE = Path(sys.argv[1])
OUT = Path(sys.argv[2])
CELL, COLS, PAD = 112, 10, 5

gray = cv2.imread(str(SOURCE), cv2.IMREAD_GRAYSCALE)
mask = (gray < 128).astype(np.uint8)
count, labels, stats, _ = cv2.connectedComponentsWithStats(mask, 8)
parts = [(label_id, stats[label_id]) for label_id in range(1, count) if stats[label_id, 4] >= 40]
parts.sort(key=lambda item: (item[1][1], item[1][0]))
ink_x, ink_y, ink_w, ink_h = cv2.boundingRect(mask)
rows = (len(parts) + COLS - 1) // COLS
atlas = Image.new("RGBA", (COLS * CELL, rows * CELL), (0, 0, 0, 0))
icons = []

for i, (label_id, (x, y, w, h, area)) in enumerate(parts):
    component = ((labels[y:y+h, x:x+w] == label_id) * 255).astype(np.uint8)
    scale = min((CELL - 2*PAD) / max(w, 1), (CELL - 2*PAD) / max(h, 1))
    nw, nh = max(1, round(w*scale)), max(1, round(h*scale))
    alpha = Image.fromarray(component).resize((nw, nh), Image.Resampling.LANCZOS)
    tile = Image.new("RGBA", (nw, nh), (22, 22, 20, 0)); tile.putalpha(alpha)
    col, row = i % COLS, i // COLS
    ox, oy = col*CELL + (CELL-nw)//2, row*CELL + (CELL-nh)//2
    atlas.alpha_composite(tile, (ox, oy))
    icons.append({
        "index": i, "aspect": round(w/max(h,1), 4), "area": int(area),
        "col": col, "row": row, "x": int(x - ink_x), "y": int(y - ink_y),
        "width": int(w), "height": int(h)
    })

OUT.parent.mkdir(parents=True, exist_ok=True)
atlas.save(OUT)
(OUT.parent / "instrument-icons.json").write_text(json.dumps({
    "cell": CELL, "cols": COLS, "rows": rows,
    "sourceWidth": int(ink_w), "sourceHeight": int(ink_h), "icons": icons
}))
print(f"Extracted {len(icons)} silhouettes → {OUT}")
