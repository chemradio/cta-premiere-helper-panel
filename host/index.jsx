app.enableQE();
if (ExternalObject.AdobeXMPScript == undefined) {
    ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
}
function talert(input) {
    alert(String(input))
}


var zoomPercent = 15;
var crossfadeSeconds = .1;

#include "utils.jsx";
#include "wings.jsx";
#include "zoomInOut.jsx";