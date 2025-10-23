# GSAP Logo Animation Template

A production-ready boilerplate for creating logo animations with GSAP (GreenSock Animation Platform) and seamless video export capabilities.

## Features

- **GSAP Premium Plugins** - Includes DrawSVG, MorphSVG, CustomBounce, and more
- **Vite** - Fast development with hot module replacement
- **TailwindCSS v3** - Utility-first CSS framework
- **Easy Export** - One-command export to video and GIF
- **Clean Structure** - Simple, modular, and well-documented

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **gsap-video-export** (for exporting animations)
- **FFmpeg** (for video/GIF generation)

## Quick Start

### 1. Install Dependencies

```bash
npm install
# or
yarn
```

### 2. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The dev server runs on `http://localhost:5000`

### 3. Customize Your Animation

Edit `src/main.js` to create your animation:
- Replace `public/logo.svg` with your logo
- Adjust timeline animations and timing
- Modify colors, easing, and effects

### 4. Export Your Animation

See [EXPORT.md](./EXPORT.md) for detailed export instructions.

Quick export:
```bash
npm run export:video      # Standard resolution
npm run export:video:hd   # 1080p HD
npm run export:video:4k   # 4K resolution
npm run export:gif        # Convert to GIF
```

## Project Structure

```
.
├── public/
│   └── logo.svg          # Your logo SVG file
├── src/
│   ├── main.js           # Main animation logic
│   └── index.scss        # Styling
├── exports/              # Generated export files (gitignored)
├── index.html            # HTML entry point
├── EXPORT.md             # Detailed export guide
├── CLAUDE.md             # AI assistant context
└── example-export.*      # Example outputs
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 5000 |
| `npm run build` | Build for production |
| `npm run serve` | Preview production build |
| `npm run export:video` | Export animation as MP4 (60fps) |
| `npm run export:video:hd` | Export as 1080p HD video |
| `npm run export:video:4k` | Export as 4K video |
| `npm run export:gif` | Convert exported video to optimized GIF |

## Customization Guide

### Replace the Logo

1. Replace `public/logo.svg` with your logo
2. Ensure your SVG has proper mask IDs for animation
3. Update mask selectors in `src/main.js` if needed

### Adjust Animation Timing

In `src/main.js`, modify the timeline:

```javascript
mainTimeline
  .from(element1, {
    drawSVG: 0,
    duration: 2,  // ← Change duration
  })
  .from(element2, {
    drawSVG: 1,
    duration: 1,
  }, "-=1.25")  // ← Adjust overlap
```

### Change Colors

Update fill colors in your SVG file or dynamically in `src/main.js`:

```javascript
gsap.to(element, {
  fill: "#your-color",
  duration: 1
})
```

### Add Custom Easing

GSAP includes premium easing functions:

```javascript
CustomBounce.create("myBounce", {
  strength: 0.7,
  squash: 3
});

gsap.to(element, {
  y: 100,
  ease: "myBounce"
});
```

## GSAP Premium Plugins

This template includes GSAP premium plugins from `gsap-bonus.tgz`:

- **DrawSVGPlugin** - Animate SVG strokes (draw on/off effect)
- **MorphSVGPlugin** - Morph between SVG shapes
- **CustomBounce/CustomEase/CustomWiggle** - Custom easing functions
- **SplitText** - Advanced text animation
- **ScrollTrigger/ScrollSmoother** - Scroll-based animations
- **GSDevTools** - Timeline debugging tool

For commercial use, ensure you have a valid [GSAP license](https://greensock.com/licensing/).

## Animation Export

This template is optimized for exporting animations using `gsap-video-export`.

The main timeline is exposed globally for export:
```javascript
window.gsap = gsap;
window.tl = mainTimeline;
```

For detailed export instructions, see [EXPORT.md](./EXPORT.md).

## Tips

- Use `GSDevTools` for debugging timelines (uncomment in `src/main.js`)
- Comment out `repeat: -1` when exporting to prevent infinite loops
- Export at higher resolutions (HD/4K) for better quality
- Test animation in browser before exporting
- Keep animation duration reasonable (3-10 seconds is ideal)

## Example Output

Check `example-export.mp4` and `example-export.gif` to see the expected output quality.

## Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Troubleshooting

### Animation doesn't play
- Check browser console for errors
- Ensure GSAP plugins are registered
- Verify SVG elements exist before animating

### Export fails
- Make sure dev server is running (`npm run dev`)
- Install `gsap-video-export` globally
- Check [EXPORT.md](./EXPORT.md) troubleshooting section

### SVG not loading
- Verify `public/logo.svg` exists
- Check fetch URL in `loadSVGs()` function
- Ensure SVG is valid XML

## Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [gsap-video-export](https://github.com/workeffortwaste/gsap-video-export)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)

## License

GPL-3.0

---

**Happy animating!** For questions or issues, check the documentation links above.
