var csInterface = new CSInterface();

var wingsButton = document.getElementById('wings');
wingsButton.addEventListener('click', () => {
	csInterface.evalScript('addWings()');
});

var zoomInButton = document.getElementById('zoomIn');
zoomInButton.addEventListener('click', () => {
	csInterface.evalScript('zoom("in")');
});

var zoomOutButton = document.getElementById('zoomOut');
zoomOutButton.addEventListener('click', () => {
	csInterface.evalScript('zoom("out")');
});

var slideshowButton = document.getElementById('slideshow');
slideshowButton.addEventListener('click', () => {
	csInterface.evalScript('slideshow()');
});

var voiceConcealButton = document.getElementById('voiceConceal');
voiceConcealButton.addEventListener('click', () => {
	csInterface.evalScript('voiceConceal()');
});

var fitButton = document.getElementById('fit');
fitButton.addEventListener('click', () => {
	csInterface.evalScript('fitFillSelection("fit")');
});

var fillButton = document.getElementById('fill');
fillButton.addEventListener('click', () => {
	csInterface.evalScript('fitFillSelection("fill")');
});

//
var brollBoxGuestButton = document.getElementById('brollBoxGuest');
brollBoxGuestButton.addEventListener('click', () => {
	csInterface.evalScript('broll("box", "guest")');
});

var brollBoxVideoButton = document.getElementById('brollBoxVideo');
brollBoxVideoButton.addEventListener('click', () => {
	csInterface.evalScript('broll("box", "video")');
});

var brollOverlayGuestButton = document.getElementById('brollOverlayGuest');
brollOverlayGuestButton.addEventListener('click', () => {
	csInterface.evalScript('broll("overlay", "guest")');
});

var brollOverlayVideoButton = document.getElementById('brollOverlayVideo');
brollOverlayVideoButton.addEventListener('click', () => {
	csInterface.evalScript('broll("overlay", "video")');
});
