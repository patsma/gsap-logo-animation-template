import "./index.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { CustomBounce } from "gsap/CustomBounce";
import { CustomWiggle } from "gsap/CustomWiggle";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import GSDevTools from "gsap/GSDevTools";

// Make GSAP available globally for video export
window.gsap = gsap;

// Detect if we're in export mode (gsap-video-export uses headless Chrome)
// This allows us to conditionally disable GSDevTools during video export
const isExportMode = /HeadlessChrome/.test(navigator.userAgent);
window.isExportMode = isExportMode; // Expose for debugging

gsap.registerPlugin(
  ScrollTrigger, 
  ScrollSmoother, 
  SplitText, 
  MorphSVGPlugin, 
  ScrollToPlugin, 
  CustomBounce, 
  CustomEase, 
  CustomWiggle, 
  DrawSVGPlugin,
  GSDevTools
);

document.addEventListener("DOMContentLoaded", function () {
  console.log("Logo animation initialized");

  function loadSVGs(svgs) {
    const fetchPromises = svgs.map((svg) => fetch(svg.url).then((response) => response.text()));

    Promise.all(fetchPromises)
      .then((responses) => {
        responses.forEach((svgContent, index) => {
          document.querySelector(svgs[index].container).innerHTML = svgContent;
        });
        initializeGSAPAnimations();
      })
      .catch(console.error);
  }

  function initializeGSAPAnimations() {
    console.log("Initializing GSAP animations");
    
    // Convert SVG elements to paths first
    MorphSVGPlugin.convertToPath("circle, rect, ellipse, line, polygon, polyline");

    // Get all our mask elements with simple query selectors
    const vbMask = document.querySelector("#letterVBmask");
    const bMask = document.querySelector("#letterBmask");
    const iMask = document.querySelector("#letterImask");
    const dot = document.querySelector("#letterIdot");
    console.log("Masks:", vbMask, bMask, iMask, dot);
    
    // Set initial state
    // gsap.set([vbMask, bMask, iMask], { drawSVG: 0 });

    // Create the main animation timeline
    const mainTimeline = gsap.timeline({
      // repeat: -1,
      // repeatDelay: 3,
      defaults: {
        ease: "power2.inOut",
      },
      onComplete: () => console.log("Animation complete")
    });

    // Make timeline globally accessible for video export
    window.tl = mainTimeline;

    // Create custom bounce effect
    CustomBounce.create("dotBounce", {
      strength: 0.6,
      squash: 2,
      squashID: "dotBounce-squash"
    });

    // Set initial state for dot
    gsap.set(dot, {
      y: -100,
      transformOrigin: "center center"
    });

    // Add drawing animations in sequence
    mainTimeline
      // Draw VB first
      .from(vbMask, {
        drawSVG: 0,
        duration: 2,
      })
      // Draw B next
      .from(bMask, {
        drawSVG: 1,
        duration: 1,
      }, "-=1.25")
      // Draw I last
      .from(iMask, {
        drawSVG: 1,
        duration: 1,
      }, "-=0.75")
      // Bounce in the dot
      .to(dot, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "dotBounce",
      }, "-=0.75")
      // Add squash and stretch effect
      .to(dot, {
        scaleX: 1.2,
        scaleY: 0.8,
        duration: 1.5,
        ease: "dotBounce-squash",
      }, "<");

    // Initialize GSDevTools only in development mode (not during video export)
    // This gives you timeline controls for easy testing without interfering with exports
    if (!isExportMode) {
      GSDevTools.create({
        animation: mainTimeline,
        minimal: true,
        container: document.body
      });
      console.log("GSDevTools enabled - use the controls to test your animation");
    } else {
      console.log("Export mode detected - GSDevTools disabled for clean export");
    }
  }

  // Load SVGs
  loadSVGs([{url: 'logo.svg', container: '.logo'}]);
});
