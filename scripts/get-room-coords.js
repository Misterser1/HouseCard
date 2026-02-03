// Run this script in browser console (F12 -> Console) on the constructor page
// It will output exact coordinates of all room text elements

const svgObject = document.querySelector('object[data*="floor-plan"]');
const svgDoc = svgObject.contentDocument;
const svgRoot = svgDoc.documentElement;

// Get viewBox
const viewBox = svgRoot.getAttribute('viewBox');
console.log('ViewBox:', viewBox);

// Find all text elements
const texts = svgDoc.querySelectorAll('text');
const rooms = {};

texts.forEach(text => {
    const content = text.textContent.trim();
    // Filter only room names (not areas with m2)
    if (content && !content.includes('м') && !content.match(/^[0-9.,]+$/) && content.length > 1) {
        const bbox = text.getBBox();
        const ctm = text.getCTM();

        // Apply transformation
        const x = ctm ? (ctm.a * bbox.x + ctm.c * bbox.y + ctm.e) : bbox.x;
        const y = ctm ? (ctm.b * bbox.x + ctm.d * bbox.y + ctm.f) : bbox.y;

        rooms[content] = {
            x: Math.round(x),
            y: Math.round(y),
            width: Math.round(bbox.width * (ctm ? ctm.a : 1)),
            height: Math.round(bbox.height * (ctm ? ctm.d : 1))
        };
    }
});

console.log('Room text positions:');
console.table(rooms);
