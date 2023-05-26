voiceConceal()

function voiceConceal() {
    var firstClipFirstTrackQE = qe.project.getActiveSequence()
    return
        var firstClipFirstTrack = app.project.activeSequence.audioTracks[0].clips[0];
        var firstClipFirstTrackQE = qe.project.getActiveSequence().getAudioTrackAt(0).getItemAt(0);
    // applyPitchShifter()
    firstClipFirstTrackQE.addAudioEffect(qe.project.getAudioEffectByName("Pitch Shifter"));
    var firstClipFirstTrackComponents = app.project.activeSequence.audioTracks[0].clips[0].components;

    for (var i = 0; i< firstClipFirstTrackComponents.length; i++){
        if (firstClipFirstTrackComponents[i].displayName == "Pitch Shifter") {
            var pitchShifterEffect = firstClipFirstTrackComponents[i];
            for (var j = 0; j< pitchShifterEffect.properties.length; j++){
                if (pitchShifterEffect.properties[j].displayName == "Precision" ){
                    pitchShifterEffect.properties[j].setValue(2);
                }
                if (pitchShifterEffect.properties[j].displayName == "Transpose Ratio" ){
                    pitchShifterEffect.properties[j].setValue(.1380711);
                    // var x  =pitchShifterEffect.properties[j].getValue();
                    // alert(String(x))
                }
                
                // alert(String(pitchShifterEffect.properties[j].displayName));
                // "Transpose Ratio" "Frequency" "Overlapping" "Use Default Setting" "Use Positive Cents"
            }
        }
    }

    return





    var originalSequenceID = app.project.activeSequence.sequenceID;
    var activeSequence = app.project.activeSequence;
    var selection = activeSequence.getSelection();
    var selectedClip = selection[0];
    // clipFitSequence(selectedClip);

    var nestedSequence = nestSelection();

    // open nested sequence
    for (var i = 0; i < app.project.sequences.numSequences; i++) {
        if (app.project.sequences[i].name == nestedSequence.name) {
            app.project.openSequence(app.project.sequences[i].sequenceID)
        }
    }


    // // remove audio tracks
    // lockVideoTracks(true)
    // var qeSequence = qe.project.getActiveSequence()
    // qeSequence.removeTracks()
    // lockVideoTracks(false)


    var currentTrack = 0;
    var currentClip = app.project.activeSequence.videoTracks[currentTrack].clips[0];
    var currentProjectItem = currentClip.projectItem;

    // set clip to fill screen
    clipFillSequence(currentClip);

    currentProjectItem.clearInPoint();
    currentProjectItem.clearOutPoint();
    currentProjectItem.setInPoint(currentClip.inPoint.ticks, 1)
    currentProjectItem.setOutPoint(currentClip.outPoint.ticks, 1)
    currentProjectItem.setInPoint(0, 2)
    currentProjectItem.setOutPoint(0, 2)


    // todo lock all audio tracks
    app.project.activeSequence.videoTracks[currentTrack + 1].insertClip(currentProjectItem, currentClip.start);
    clipFitSequence(app.project.activeSequence.videoTracks[currentTrack + 1].clips[0]);
    applyBlurToFirstClipFirstTrack()

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

    // var subSequence = app.project.sequences[app.project.sequences.numSequences - 1];
    // app.project.openSequence(subSequence.sequenceID);
    // talert(projectSequences)
    // talert(projectSequences[projectSequences.numSequences - 1].id)
    // // app.project.openSequence(app.project.sequences[nestedSequence.id].sequenceID)

    // open sequence
    return
}
