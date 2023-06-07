app.enableQE();


function lockAudioTracks(lock) {
    var audioTracks = app.project.activeSequence.audioTracks;
    var converter = (lock) ? 1 : 0
    for (var i = 0; i < audioTracks.numTracks; i++) {
        audioTracks[i].setLocked(converter)
    }
}

function lockVideoTracks(lock) {
    var videoTracks = app.project.activeSequence.videoTracks;
    var converter = (lock) ? 1 : 0
    for (var i = 0; i < videoTracks.numTracks; i++) {
        videoTracks[i].setLocked(converter)
    }
}

function getClipDimensions(clip) {
    var projectItem = clip.projectItem;
    var meta = String(projectItem.getProjectMetadata())
    var inPoint = "<premierePrivateProjectMetaData:Column.Intrinsic.VideoInfo>";
    var outPoint = "</premierePrivateProjectMetaData:Column.Intrinsic.VideoInfo>";
    var dimensionsString = meta.substring(meta.lastIndexOf(inPoint) + inPoint.length, meta.lastIndexOf(outPoint))
    var videoWidth = Number(dimensionsString.substring(0, dimensionsString.lastIndexOf(" x")));
    var videoheight = Number(dimensionsString.substring(dimensionsString.lastIndexOf(" x ") + 3, dimensionsString.lastIndexOf(" (")));
    return [videoWidth, videoheight]
}



function clipFillSequence(clip) {
    var sequenceSizeHorizontal = app.project.activeSequence.frameSizeHorizontal;
    var sequenceSizeVertical = app.project.activeSequence.frameSizeVertical;
    var sequenceRatio = sequenceSizeHorizontal / sequenceSizeVertical;

    var clipDimensions = getClipDimensions(clip);
    var clipRatio = clipDimensions[0] / clipDimensions[1];
    var scaleProperty = clip.components[1].properties[1];

    if (clipRatio < sequenceRatio) {
        var clipTargetScale = Math.ceil(sequenceSizeHorizontal * 100 / clipDimensions[0])
        scaleProperty.setValue(clipTargetScale);
    } else {
        var clipTargetScale = Math.ceil(sequenceSizeVertical * 100 / clipDimensions[1])
        scaleProperty.setValue(clipTargetScale);
    }
    return clipTargetScale
}

function clipFitSequence(clip) {
    var sequenceSizeHorizontal = app.project.activeSequence.frameSizeHorizontal;
    var sequenceSizeVertical = app.project.activeSequence.frameSizeVertical;
    var sequenceRatio = sequenceSizeHorizontal / sequenceSizeVertical;

    var clipDimensions = getClipDimensions(clip);
    var clipRatio = clipDimensions[0] / clipDimensions[1];
    var scaleProperty = clip.components[1].properties[1];

    if (clipRatio > sequenceRatio) {
        var clipTargetScale = Math.ceil(sequenceSizeHorizontal * 100 / clipDimensions[0])
        scaleProperty.setValue(clipTargetScale);
    } else {
        var clipTargetScale = Math.ceil(sequenceSizeVertical * 100 / clipDimensions[1])
        scaleProperty.setValue(clipTargetScale);
    }
    return clipTargetScale
}

function nestSelection() {
    var activeSequence = app.project.activeSequence;
    // Get the current selection in the active sequence
    var selection = activeSequence.getSelection();

    if (selection.length < 1) {
        return;
    }
    // We'll put the the sequence on the same track as the first item in the selection. The "cleaner" solution would be checking whether all clips are on the same track.
    var trackId = selection[0].parentTrackIndex;
    // In order to restore the previous in / out point we'll store the current values
    var oldInPoint = activeSequence.getInPointAsTime();
    var oldOutPoint = activeSequence.getOutPointAsTime();
    // Get the start and end times of the selection
    var start = selection[0].start;
    var end = selection[selection.length - 1].end;
    // Set the inPoint and outPoint of the active sequence to the start and end of the selection
    activeSequence.setInPoint(start.seconds);
    activeSequence.setOutPoint(end.seconds);
    // Create a new subsequence from the active sequence
    var newSequence = activeSequence.createSubsequence(true);
    newSequence.projectItem.setInPoint(0, 2)
    newSequence.projectItem.setOutPoint(0, 2)



    // Overwrite the first video track of the active sequence with the new subsequence
    activeSequence.videoTracks[trackId].overwriteClip(
        newSequence.projectItem,
        start.seconds
    );
    // Restore the original inPoint and outPoint of the active sequence
    activeSequence.setInPoint(oldInPoint.seconds);
    activeSequence.setOutPoint(oldOutPoint.seconds);
    // Return newly created sequence
    return newSequence;
}

function getQEItemsBySelection() {
    var activeSequence = app.project.activeSequence;
    var selectedClips = activeSequence.getSelection();
    if (selectedClips.length < 1) {
        return;
    }

    var tempClips = [];
    for (var i = 0; i < selectedClips.length; i++) {
        var searchClip = selectedClips[i];

        // figure out clip index
        var lookupTrack;
        if (searchClip.mediaType == 'Video') {
            lookupTrack =
                app.project.activeSequence.videoTracks[
                searchClip.parentTrackIndex
                ];
        } else {
            lookupTrack =
                app.project.activeSequence.audioTracks[
                searchClip.parentTrackIndex
                ];
        }

        for (var j = 0; j < lookupTrack.clips.numItems; j++) {
            var tempClip = lookupTrack.clips[j];
            if (
                tempClip.name == searchClip.name &&
                tempClip.start.seconds == searchClip.start.seconds
            ) {
                tempClips.push({ clipId: j, clip: searchClip });
            }
        }
    }

    if (tempClips.length < 1) {
        return;
    }

    var qeClips = [];
    for (var j = 0; j < tempClips.length; j++) {
        var clip = tempClips[j].clip;
        var clipId = tempClips[j].clipId;

        var qeSeq = qe.project.getActiveSequence();
        var targetTrack;

        if (clip.mediaType == 'Video') {
            targetTrack = qeSeq.getVideoTrackAt(clip.parentTrackIndex);
        } else {
            targetTrack = qeSeq.getAudioTrackAt(clip.parentTrackIndex);
        }
        var qeClip = targetTrack.getItemAt(clipId);
        qeClips.push({ qeClip: qeClip, clip: clip });
    }
    return qeClips;
}

function getQEItemByClipBad(clip) {
    var lookupTrack;
    // alert(clip.mediaType);
    if (clip.mediaType == 'Video') {
        lookupTrack =
            app.project.activeSequence.videoTracks[
            clip.parentTrackIndex
            ];
    } else {
        lookupTrack =
            app.project.activeSequence.audioTracks[
            clip.parentTrackIndex
            ];
    }

    // alert('pre target index');
    var targetIndex;
    for (var j = 0; j < lookupTrack.clips.numItems; j++) {
        var tempClip = lookupTrack.clips[j];
        if (
            tempClip.name == clip.name &&
            tempClip.start.seconds == clip.start.seconds
        ) {
            var targetIndex = j;
            break;
        } else {
            return;
        }
    }

    // alert('pre target track');
    var targetTrack;
    var qeSeq = qe.project.getActiveSequence();
    if (clip.mediaType == 'Video') {
        targetTrack = qeSeq.getVideoTrackAt(clip.parentTrackIndex);
    } else {
        targetTrack = qeSeq.getAudioTrackAt(clip.parentTrackIndex);
    }

    // alert('pre return');
    // alert(String(targetIndex));
    var result = targetTrack.getItemAt(targetIndex);
    return result;
}

function getQEItemByClip(clip) {
    var lookupTrack;
    if (clip.mediaType == 'Video') {
        lookupTrack =
            app.project.activeSequence.videoTracks[
            clip.parentTrackIndex
            ];
    } else {
        lookupTrack =
            app.project.activeSequence.audioTracks[
            clip.parentTrackIndex
            ];
    }

    var targetTrack;
    var qeSeq = qe.project.getActiveSequence();
    if (clip.mediaType == 'Video') {
        targetTrack = qeSeq.getVideoTrackAt(clip.parentTrackIndex);
    } else {
        targetTrack = qeSeq.getAudioTrackAt(clip.parentTrackIndex);
    }

    for (var i = 0; i < targetTrack.numItems; i++) {
        var tempQEClip = targetTrack.getItemAt(i);
        try {
            if (
                tempQEClip.name == clip.name &&
                Math.floor(tempQEClip.start.secs) == Math.floor(clip.start.seconds) &&
                Math.floor(tempQEClip.end.secs) == Math.floor(clip.end.seconds)
            ) {
                return tempQEClip
            }
        } catch (e) {
            continue;
        }

    }
}


function addVideoEffectToQEClip(qeVideoClip, effectName) {
    var effect = qe.project.getVideoEffectByName(effectName);
    qeVideoClip.addVideoEffect(effect);
}

function addAudioEffectToQEClip(qeAudioClip, effectName) {
    var effect = qe.project.getAudioEffectByName(effectName);
    qeAudioClip.addAudioEffect(effect);
}

function getComponentFromClip(clip, componentName) {
    var clipComponents = clip.components;
    for (var j = 0; j < clip.components.length; j++) {
        if (clip.components[j].displayName == componentName) {
            return clipComponents[j];
        }
    }
}

function getSameNameComponentsFromClip(clip, componentName) {
    var sameNameComponents = [];
    var clipComponents = clip.components;
    for (var j = 0; j < clip.components.length; j++) {
        if (clip.components[j].displayName == componentName) {
            sameNameComponents.push(clipComponents[j]);
        }
    }
    return sameNameComponents;
}

function getPropertyFromComponent(component, propertyName) {
    var componentProps = component.properties;
    for (var l = 0; l < componentProps.length; l++) {
        if (componentProps[l].displayName == propertyName) {
            return componentProps[l];
        }
    }
}

function clearSelectionFromActiveSequence() {
    var activeSequence = app.project.activeSequence;
    var selection = activeSequence.getSelection();
    if (selection.length < 1) {
        return;
    }

    for (var i = 0; i < selection.length; i++) {
        var targetClip = selection[i];
        if (targetClip.isSelected()) {
            targetClip.setSelected(0, 0)
        }
    }
}

function findVideoClipInActiveSequence(clipName, clipStart, clipDuration) {
    var videoTracks = app.project.activeSequence.videoTracks;
    for (var i = 0; i < videoTracks.numTracks; i++) {
        var videoTrackClips = videoTracks[i].clips;
        if (videoTrackClips.numItems < 1) {
            continue;
        }

        for (var j = 0; j < videoTrackClips.numItems; j++) {
            var procClip = videoTrackClips[j];
            if (
                procClip.name == clipName &&
                procClip.start.seconds == clipStart.seconds &&
                procClip.duration.seconds == clipDuration.seconds
            ) {
                return procClip;
            }
        }
    }
}


function filterArrayClipsOnlyVideo(arrayItem) {
    return (arrayItem.mediaType == "Video") ? true : false;
}