function zoom(type) {
    var selection = app.project.activeSequence.getSelection();
    for (var i = 0; i < selection.length; i++) {
        var targetClip = selection[i];
        zoomManual(targetClip, type);
    }
}


function zoomManual(clip, type) {
    var targetClip = clip;
    var fillScale = clipFillSequence(targetClip);
    var motionComponent = getComponentFromClip(clip, "Motion");
    var scaleProp = getPropertyFromComponent(motionComponent, "Scale");

    var inPoint = targetClip.inPoint.seconds - crossfadeSeconds;
    var outPoint = targetClip.outPoint.seconds + crossfadeSeconds;

    scaleProp.setTimeVarying(false);
    scaleProp.setTimeVarying(true);
    scaleProp.addKey(inPoint);
    scaleProp.addKey(outPoint);
    var zoomValue = fillScale + (zoomPercent * fillScale / 100)

    if (type == "in") {
        scaleProp.setValueAtKey(inPoint, fillScale);
        scaleProp.setValueAtKey(outPoint, zoomValue);
    } else {
        scaleProp.setValueAtKey(inPoint, zoomValue);
        scaleProp.setValueAtKey(outPoint, fillScale);
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

