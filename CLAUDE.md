# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **GSAP logo animation template/boilerplate** (branch: `gsap-template`) built with Vite, vanilla JavaScript, and GSAP (GreenSock Animation Platform). It includes a working example (Vibeuu logo) demonstrating SVG animation using GSAP plugins including DrawSVG, MorphSVG, and CustomBounce.

**Purpose:** Serve as a reusable template for creating logo animations with easy video/GIF export capabilities.

**Note:** As of 2025, all GSAP plugins are completely free for all uses (including commercial), installed via the standard npm package.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run serve
```

## Export Commands

```bash
# Export animation as MP4 video (60fps)
npm run export:video

# Export as 1080p HD video
npm run export:video:hd

# Export as 4K video
npm run export:video:4k

# Convert video to optimized GIF
npm run export:gif
```

**Prerequisites for export:**
1. Install `gsap-video-export` globally: `npm install -g gsap-video-export`
2. Install FFmpeg: `brew install ffmpeg` (macOS) or see [EXPORT.md](./EXPORT.md)
3. Dev server must be running (`npm run dev`) during export

## Architecture & Key Concepts

### GSAP Plugins (All Free!)
The project uses GSAP plugins installed via the standard npm package. As of 2025, all GSAP plugins are completely free for all uses. The following plugins are available:
- **DrawSVGPlugin** - Animates SVG strokes (used for drawing the logo letters)
- **MorphSVGPlugin** - Morphs between SVG shapes
- **CustomBounce/CustomEase/CustomWiggle** - Custom easing functions
- **SplitText** - Text animation utilities
- **ScrollTrigger/ScrollSmoother** - Scroll-based animations
- **GSDevTools** - Animation debugging tool (smart-enabled, see below)

### GSDevTools (Smart Mode)
The project includes intelligent GSDevTools integration:
- **Automatically enabled** during development (`npm run dev`) for easy timeline control and testing
- **Automatically disabled** during video export to ensure clean output without UI controls
- **Detection method**: Checks for HeadlessChrome user agent (used by gsap-video-export)
- **Available via**: `window.isExportMode` flag for debugging
- **Controls**: Play/pause, scrub timeline, speed control, loop toggle in minimal UI mode

### Animation Structure
The main animation (`src/main.js`) follows this sequence:
1. **SVG Loading**: Fetches `logo.svg` from the public folder and injects it into `.logo` container
2. **Path Conversion**: Converts SVG shapes to paths for morphing compatibility
3. **Timeline Creation**: Builds a GSAP timeline with the following sequence:
   - Draw the "VB" letters using DrawSVGPlugin (2s duration)
   - Draw the "B" letter mask (1s, overlapping by 1.25s)
   - Draw the "I" letter mask (1s, overlapping by 0.75s)
   - Bounce in the dot above "I" using CustomBounce (1.5s with squash/stretch effect)

### SVG Mask System
The logo uses SVG masks to reveal letters progressively:
- `#letterVBmask` - Masks for the VB letters
- `#letterBmask` - Mask for the B letter
- `#letterImask` - Mask for the I letter
- `#letterIdot` - The dot above the I (bounces in separately)

### Video Export System
The animation is configured for seamless export using `gsap-video-export`:

**Global Exposure (required for gsap-video-export):**
- `window.gsap` - GSAP is exposed globally (line 15 in src/main.js)
- `window.tl` - Main timeline is exposed globally (line 73 in src/main.js)

**How gsap-video-export works:**
1. Opens the dev server URL in a headless browser (Puppeteer)
2. Steps through the GSAP timeline frame-by-frame (not screen recording)
3. Captures each frame as an image at the exact moment
4. Compiles frames into video using FFmpeg
5. Cleans up temporary frames automatically

**Export process:**
```bash
# 1. Ensure dev server is running
npm run dev

# 2. In another terminal, run export
npm run export:video:hd
```

**Output location:** All exports go to `exports/` directory (gitignored)

### Styling
- **TailwindCSS v3** configured but minimally used
- **SCSS** in `src/index.scss` handles layout:
  - Body: White background, centered flexbox
  - Logo container: 40vw wide, centered in viewport
  - SVG: Responsive 100% width/height

## Important Files

- `src/main.js` - Main animation logic and GSAP setup
- `public/logo.svg` - The Vibeuu logo SVG with mask definitions
- `src/index.scss` - Minimal styling (primarily centering)
- `prepare.js` - Export mode configuration
- `index.html` - Simple HTML structure with `.logo` container

## Animation Customization

To modify the animation timing:
- Timeline is in `src/main.js` starting at line 63
- Durations and overlaps are defined in the timeline chain (lines 89-118)
- CustomBounce settings are at lines 76-80
- Repeat/repeatDelay are commented out (lines 64-65) but can be enabled

## Template Usage

This is a boilerplate template. To use for a new logo animation:

1. **Replace the logo:**
   - Replace `public/logo.svg` with your logo
   - Update mask IDs if different from the example

2. **Customize animation:**
   - Edit timeline in `src/main.js` (starting at line 89)
   - Adjust durations, easing, and timing
   - Add/remove animation steps as needed

3. **Test in browser:**
   - Run `npm run dev`
   - Open http://localhost:5000
   - Verify animation works as expected

4. **Export:**
   - Keep dev server running
   - Run export commands from another terminal
   - Find outputs in `exports/` directory

**Example files:** `example-export.mp4` and `example-export.gif` show the Vibeuu animation output

## Development Notes

- The dev server runs on port 5000 (not the default Vite port 5173)
- SVG is dynamically loaded via fetch to enable manipulation
- MorphSVGPlugin.convertToPath() must be called before animations start
- GSDevTools is available (commented out at line 120) for debugging timelines
- For detailed export instructions, troubleshooting, and advanced options, see [EXPORT.md](./EXPORT.md)

## Key Files

- `src/main.js` - Main animation logic and GSAP timeline
- `public/logo.svg` - The logo SVG with mask definitions
- `EXPORT.md` - Comprehensive export documentation
- `README.md` - Template usage guide
- `exports/` - Output directory for generated videos/GIFs (gitignored)
- `example-export.mp4` / `example-export.gif` - Example outputs
