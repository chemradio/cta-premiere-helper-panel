function broll(type, role) {
    var activeSequence = app.project.activeSequence;
    var selection = activeSequence.getSelection();

    if (selection.length < 1) {
        return;
    }
    var filteredSelection = [];
    for (var i = 0; i < selection.length; i++) {
        if (selection[i].mediaType == "Video") {
            filteredSelection.push(selection[i]);
        }
    }
    if (filteredSelection.length < 1) {
        return;
    }
    selection = filteredSelection;

    // clear selection for nesting
    clearSelectionFromActiveSequence();

    for (var i = 0; i < selection.length; i++) {
        var targetClip = selection[i];
        targetClip.setSelected(1, 1);
        var nestedSequence = nestSelection();

        var nestedClip = findVideoClipInActiveSequence(nestedSequence.name, targetClip.start, targetClip.duration);
        var qeNestedClip = getQEItemByClip(nestedClip);
        // nestedClip.setSelected(1, 1);

        addVideoEffectToQEClip(qeNestedClip, "Crop");
        var cropComponent = getComponentFromClip(nestedClip, "Crop");

        addVideoEffectToQEClip(qeNestedClip, "Transform");
        var transformComponent = getComponentFromClip(nestedClip, "Transform");

        getPropertyFromComponent(transformComponent, "Uniform Scale").setValue(1, 1);

        var motionComponent = getComponentFromClip(nestedClip, "Motion");

        if (type == "box") {
            if (role == "guest") {
                getPropertyFromComponent(cropComponent, "Left").setValue(32, 1);
                getPropertyFromComponent(transformComponent, "Scale Height").setValue(70.8, 1);
                getPropertyFromComponent(transformComponent, "Position").setValue([0.8278, 0.5333], 1);
                continue;
            } else if (role == "video") {
                getPropertyFromComponent(transformComponent, "Scale Height").setValue(70.8, 1);
                getPropertyFromComponent(transformComponent, "Position").setValue([0.3447, 0.5333], 1);
                continue;
            }
        } else if (type == "overlay") {
            if (role == "guest") {
                getPropertyFromComponent(motionComponent, "Anchor Point").setValue([0, 0], 1);
                getPropertyFromComponent(motionComponent, "Scale").setValue(45.0814, 1);
                getPropertyFromComponent(motionComponent, "Position").setValue([0.5493, 0.2999], 1);
                continue;
            } else if (role == "video") {
                getPropertyFromComponent(motionComponent, "Anchor Point").setValue([0, 0], 1);
                getPropertyFromComponent(motionComponent, "Scale").setValue(70.9235, 1);
                getPropertyFromComponent(motionComponent, "Position").setValue([-0.0541, 0.1783], 1);
                getPropertyFromComponent(cropComponent, "Right").setValue(7.2, 1);
                continue;
            }
        }
        return
    }
}
