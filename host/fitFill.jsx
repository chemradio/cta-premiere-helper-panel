function fitFillSelection(type) {
    var activeSequence = app.project.activeSequence;
    var selection = activeSequence.getSelection();
    if (selection.length < 1) {
        return;
    }

    for (var i = 0; i < selection.length; i++) {
        var targetClip = selection[i];
        if (type == "fit") {
            clipFitSequence(targetClip);
            return;
        } else if (type == "fill") {
            clipFillSequence(targetClip);
            return;
        }
    }
}