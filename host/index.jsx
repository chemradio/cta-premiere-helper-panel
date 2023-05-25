app.enableQE();
if (ExternalObject.AdobeXMPScript == undefined) {
    ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
}
function talert(input) {
    alert(String(input))
}


#include "utils.jsx";

#include "wings.jsx";

var zoomPercent = 15;
var crossfadeSeconds = 0;
#include "zoomInOut.jsx";

#include "voiceConceal.jsx";

#include "brolls.jsx";