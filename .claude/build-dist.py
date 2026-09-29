"""Copy the site into dist/ for deployment (e.g. Netlify), leaving out
development files: .claude/, README files and the .png originals of the news
photos (the page uses their .jpg copies).

    python .claude/build-dist.py
"""
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / 'dist'

SKIP_DIRS = {'.claude', 'dist', '.git', 'node_modules', '.netlify'}
SKIP_FILES = {'README.md', 'README.txt'}
SKIP_GLOBS = ['assets/images/news/*.png']


def skipped(path: Path) -> bool:
    rel = path.relative_to(ROOT)
    if rel.parts[0] in SKIP_DIRS or path.name in SKIP_FILES:
        return True
    return any(rel.match(pattern) for pattern in SKIP_GLOBS)


def main() -> None:
    if DIST.exists():
        shutil.rmtree(DIST)
    count = size = 0
    for path in ROOT.rglob('*'):
        if path.is_dir() or skipped(path):
            continue
        target = DIST / path.relative_to(ROOT)
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, target)
        count += 1
        size += path.stat().st_size
    print(f'dist/: {count} files, {size / 1_048_576:.1f} MB')


if __name__ == '__main__':
    main()
