# Animation Export Guide

This guide explains how to export your GSAP animations to video and GIF formats using `gsap-video-export`.

## Prerequisites

### 1. Install gsap-video-export globally

```bash
npm install -g gsap-video-export
```

### 2. Install FFmpeg

**macOS (using Homebrew):**
```bash
brew install ffmpeg
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install ffmpeg
```

**Windows:**
Download from [ffmpeg.org](https://ffmpeg.org/download.html) or use [Chocolatey](https://chocolatey.org/):
```bash
choco install ffmpeg
```

### 3. Start the Development Server

The export tool needs your animation running locally:
```bash
npm run dev
# Server will run on http://localhost:5000
```

## Quick Start

### Export Video (Standard Resolution)
```bash
npm run export:video
```
Exports to `exports/animation.mp4` at 60fps

### Export Video (HD - 1080p)
```bash
npm run export:video:hd
```
Exports to `exports/animation-1080.mp4` at 1920x1080, 60fps

### Export Video (4K)
```bash
npm run export:video:4k
```
Exports to `exports/animation-4k.mp4` at 3840x2160, 60fps

### Export GIF
First export a video, then convert it to GIF:
```bash
npm run export:video
npm run export:gif
```
Creates an optimized GIF at `exports/animation.gif`

## Advanced Usage

### Custom Export Command

Use `gsap-video-export` directly for full control:

```bash
gsap-video-export http://localhost:5000 \
  --output ./exports/my-animation.mp4 \
  --width 1280 \
  --height 720 \
  --fps 30
```

### Available Options

- `--output` - Output file path (default: `output.mp4`)
- `--width` - Video width in pixels
- `--height` - Video height in pixels
- `--fps` - Frames per second (default: 60)
- `--codec` - Video codec (default: `libx264`)
- `--format` - Output format (default: `mp4`)
- `--timeline` - GSAP timeline selector if you have multiple timelines
- `--selector` - CSS selector to export specific element only

### Custom Resolution Examples

**Instagram Square (1080x1080):**
```bash
gsap-video-export http://localhost:5000 \
  --output ./exports/instagram.mp4 \
  --width 1080 \
  --height 1080 \
  --fps 30
```

**Instagram Story (1080x1920):**
```bash
gsap-video-export http://localhost:5000 \
  --output ./exports/story.mp4 \
  --width 1080 \
  --height 1920 \
  --fps 30
```

**Twitter (1280x720):**
```bash
gsap-video-export http://localhost:5000 \
  --output ./exports/twitter.mp4 \
  --width 1280 \
  --height 720 \
  --fps 30
```

## GIF Export Options

### High Quality GIF (Larger File Size)
```bash
ffmpeg -i ./exports/animation.mp4 \
  -vf "fps=30,scale=720:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" \
  -loop 0 \
  ./exports/animation-hq.gif
```

### Optimized GIF (Smaller File Size)
```bash
ffmpeg -i ./exports/animation.mp4 \
  -vf "fps=15,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" \
  -loop 0 \
  ./exports/animation-optimized.gif
```

### Different GIF Sizes
- **Small (320px width):** Change `scale=480:-1` to `scale=320:-1`
- **Medium (640px width):** Change `scale=480:-1` to `scale=640:-1`
- **Large (1080px width):** Change `scale=480:-1` to `scale=1080:-1`

## How It Works

### Timeline Exposure
The animation code in `src/main.js` exposes the GSAP timeline globally:

```javascript
// Make GSAP available globally for video export
window.gsap = gsap;

// Make timeline globally accessible for video export
window.tl = mainTimeline;
```

This allows `gsap-video-export` to:
1. Control the animation timeline
2. Step through frame-by-frame
3. Capture each frame at the exact moment
4. Compile frames into a video using FFmpeg

### Export Process
1. `gsap-video-export` opens the URL in a headless browser (Puppeteer)
2. It steps through your GSAP timeline frame-by-frame
3. Each frame is captured as an image
4. FFmpeg compiles the frames into a video file
5. Temporary frames are cleaned up automatically

## Troubleshooting

### "gsap-video-export: command not found"
Install it globally: `npm install -g gsap-video-export`

### "Connection refused" or "Cannot connect"
Make sure the dev server is running on port 5000:
```bash
npm run dev
```

### Animation doesn't loop in the export
Remove or comment out the `repeat` property in your timeline (in `src/main.js`):
```javascript
const mainTimeline = gsap.timeline({
  // repeat: -1,  // Comment this out for export
});
```

### Export is too fast/slow
Adjust the `--fps` parameter:
- Higher FPS = smoother but larger file (60fps recommended)
- Lower FPS = smaller file but less smooth (30fps is standard)

### Video quality is poor
Use a higher resolution export:
```bash
npm run export:video:hd
# or
npm run export:video:4k
```

### GIF file is too large
- Reduce FPS: Change `fps=30` to `fps=15` or `fps=10`
- Reduce size: Change `scale=480:-1` to smaller value like `scale=320:-1`
- Reduce colors: Add `,dither=bayer:bayer_scale=5` before the `split` in the filter

### Timeline not found
If you have multiple timelines or renamed the timeline variable, specify it:
```bash
gsap-video-export http://localhost:5000 \
  --timeline myTimelineName \
  --output ./exports/animation.mp4
```

## Best Practices

1. **Test your animation first** - Make sure it works in the browser before exporting
2. **Remove infinite loops** - Comment out `repeat: -1` for exports
3. **Use high FPS for smooth motion** - 60fps for professional results
4. **Export video first, then convert to GIF** - Better workflow and quality
5. **Keep export files organized** - All exports go to `exports/` directory
6. **Export multiple resolutions** - Different platforms need different sizes

## Example Workflow

```bash
# 1. Start dev server
npm run dev

# 2. In a new terminal, export HD video
npm run export:video:hd

# 3. Convert to optimized GIF
npm run export:gif

# 4. Done! Files are in exports/ directory
ls exports/
```

## Additional Resources

- [gsap-video-export GitHub](https://github.com/workeffortwaste/gsap-video-export)
- [GSAP Documentation](https://greensock.com/docs/)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)
