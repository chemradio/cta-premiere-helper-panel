function zoom(type) {
    var selection = app.project.activeSequence.getSelection();
    for (var i = 0; i < selection.length; i++) {
        var targetClip = selection[i];
        zoomManual(targetClip, type);
    }
}


function zoomManual(clip, type) {
    var targetClip = clip;
    var duration = targetClip.end;
    var fillScale = clipFillSequence(targetClip);
    var clipComponents = targetClip.components;
    for (var j = 0; j < clipComponents.length; j++) {
        if (clipComponents[j].displayName == "Motion") {
            var componentParams = clipComponents[j].properties;
            for (var l = 0; l < componentParams.length; l++) {
                if (componentParams[l].displayName == "Scale") {
                    var scaleParam = componentParams[l];

                    var inPoint = targetClip.inPoint.seconds - crossfadeSeconds;
                    var outPoint = targetClip.outPoint.seconds + crossfadeSeconds;

                    scaleParam.setTimeVarying(false);
                    scaleParam.setTimeVarying(true);
                    scaleParam.addKey(inPoint);
                    scaleParam.addKey(outPoint);
                    var zoomValue = fillScale + (zoomPercent * fillScale / 100)

                    if (type == "in") {
                        scaleParam.setValueAtKey(inPoint, fillScale);
                        scaleParam.setValueAtKey(outPoint, zoomValue);
                    } else {
                        scaleParam.setValueAtKey(inPoint, zoomValue);
                        scaleParam.setValueAtKey(outPoint, fillScale);
                    }
                    break;
                }
            }
            break;
        }
    }

}


function slideshow() {
    var selection = app.project.activeSequence.getSelection();
    var currentType = 'in';

    for (var i = 0; i < selection.length; i++) {
        var targetClip = selection[i];
        zoomManual(targetClip, currentType);
        if (currentType == 'in') {
            currentType = "out";
        } else {
            currentType = "in";
        }

    }

}

