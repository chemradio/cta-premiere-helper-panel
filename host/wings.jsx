function addWings() {
    function configureBlur(clip) {
        var clipDimensions = getClipDimensions(clip);
        var blurStrength = clipDimensions[0] / app.project.activeSequence.frameSizeHorizontal * 50;
        var blurEffect = clip.components[clip.components.numItems - 1];
        blurEffect.properties[0].setValue(blurStrength)
    }

    // nest selection
    var originalSequenceID = app.project.activeSequence.sequenceID;
    var activeSequence = app.project.activeSequence;
    var selection = activeSequence.getSelection();
    var selectedClip = selection[0];
    var nestedSequence = nestSelection();

    // open nested sequence
    for (var i = 0; i < app.project.sequences.numSequences; i++) {
        var tempSequence = app.project.sequences[i];
        if (tempSequence.sequenceID == nestedSequence.sequenceID) {
            app.project.openSequence(tempSequence.sequenceID);
        }
    }

    var currentTrack = 0;
    var currentClip = app.project.activeSequence.videoTracks[currentTrack].clips[0];
    var currentProjectItem = currentClip.projectItem;

    // set clip to fill screen
    clipFillSequence(currentClip);

    var savedInPoint = currentProjectItem.getInPoint();
    var savedOutPoint = currentProjectItem.getOutPoint();

    currentProjectItem.clearInPoint();
    currentProjectItem.clearOutPoint();
    currentProjectItem.setInPoint(currentClip.inPoint.ticks, 1)
    currentProjectItem.setOutPoint(currentClip.outPoint.ticks, 1)
    currentProjectItem.setInPoint(0, 2)
    currentProjectItem.setOutPoint(0, 2)

    app.project.activeSequence.videoTracks[currentTrack + 1].insertClip(currentProjectItem, currentClip.start);

    currentProjectItem.setInPoint(savedInPoint, 4);
    currentProjectItem.setOutPoint(savedOutPoint, 4);

    var bottomClip = app.project.activeSequence.videoTracks[currentTrack].clips[0];
    var topClip = app.project.activeSequence.videoTracks[currentTrack + 1].clips[0];

    clipFitSequence(topClip);
    var qeClip = getQEItemByClip(bottomClip);

    addVideoEffectToQEClip(qeClip, "Fast Blur");
    configureBlur(bottomClip);


    // delete audio in the new sequence
    var auTracks = app.project.activeSequence.audioTracks;
    for (var i = 0; i < auTracks.numTracks; i++) {
        try {
            var auClips = auTracks[i].clips;
            while (true) {
                auClips[0].remove(0, 0)
            }
        } catch (e) {
            // talert(e)
        }
    }

    app.project.openSequence(originalSequenceID)
    lockAudioTracks(false)
    return
}

