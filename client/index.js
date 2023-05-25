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

var brollBoxGuestButton = document.getElementById('brollBoxGuest');
brollBoxGuestButton.addEventListener('click', () => {
	csInterface.evalScript('brollBoxGuest()');
});
