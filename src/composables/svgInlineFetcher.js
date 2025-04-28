// svgInlineFetcher.js

export function fetchAndInlineSVG(element, url) {
  fetch(url)
    .then((response) => response.text())
    .then((svgData) => {
      const parser = new DOMParser();
      const svgDocument = parser.parseFromString(svgData, "image/svg+xml");
      const svgElement = svgDocument.querySelector("svg");

      if (svgElement) {
        const targetElement = document.querySelector(element);
        if (targetElement) {
          targetElement.innerHTML = ""; // Clear existing content
          targetElement.appendChild(svgElement);
        }
      }
    })
    .catch((error) => console.error("Error fetching SVG:", error));
}