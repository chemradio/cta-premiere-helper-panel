var csInterface = new CSInterface();
var timButton = document.querySelector('.tim');
timButton.addEventListener('click', sayHi);

function sayHi() {
	csInterface.evalScript('tim2()');
}
