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

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, MorphSVGPlugin, ScrollToPlugin, CustomBounce, CustomEase, CustomWiggle, DrawSVGPlugin);

document.addEventListener("DOMContentLoaded", function () {
  console.log("works");
  // const mediaQuery = window.matchMedia("(min-width: 768px)");

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
    MorphSVGPlugin.convertToPath("circle, rect, ellipse, line, polygon, polyline");

    const logoGroup = document.querySelector("#logoGroup");
    const kompot = document.querySelectorAll("#kompot *");
    const logoIconGroup = document.querySelector("#logoIconGroup");
    const logoFrame = document.querySelector("#logoFrame");
    const logoW = document.querySelector("#logoW");
    const sliwka = document.querySelectorAll("#sliwka *");
    const clipGroup = document.querySelector("#clipGroup");

    // New selectors from updated SVG
    const morphGroup = document.querySelector("#morphGroup");
    const plum = document.querySelector("#plum path");

    gsap.set(morphGroup, { yPercent: -150 });
    gsap.set([plum], { autoAlpha: 0 });

    // Clean timeline configuration
    window.mainTimeline = gsap.timeline({
      onComplete: () => console.log("Animation complete")
    });

    window.mainTimeline
      .from(sliwka, { autoAlpha: 0, stagger: 0.1, duration: 0.25 })
      .from(logoFrame, { autoAlpha: 0, yPercent: 15, duration: 0.5, ease: "back.out" })
      .to(morphGroup, { yPercent: 0, duration: 0.5, ease: "back.out" }, '<')
      .from(logoW, {
        morphSVG: { shape: plum, shapeIndex: 6 },
        fill: "#8e4585",
        duration: 0.5,
        ease: "sine.inOut",
      }, '-=0.5')
      .from(kompot, { 
        autoAlpha: 0, 
        stagger: 0.1, 
        duration: 0.25 
      }, '-=0.15')
      .to(logoW, {
        morphSVG: {
          shape: plum,
          shapeIndex: 6
        },
        fill: "#8e4585",
        ease: "sine.inOut",
        repeat: 5,
        yoyo: true,
        repeatDelay: 1
      });

    // For normal viewing, you might want the timeline to repeat
    // But for export, we keep it finite
    if (!window.isExporting) {
      window.mainTimeline.eventCallback("onComplete", () => {
        // window.mainTimeline.restart();
      });
    }
  }

  // Load SVGs
  loadSVGs([{url: 'logo.svg', container: '.logo'}]);
});
