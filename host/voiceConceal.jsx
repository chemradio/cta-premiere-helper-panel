function voiceConceal() {
	var activeSequence = app.project.activeSequence;
	var selection = activeSequence.getSelection();
	if (selection.length < 1) {
		return;
	}

	for (var i = 0; i < selection.length; i++) {
		var targetClip = selection[i];
		if (targetClip.mediaType == 'Video') {
			continue;
		}

		var targetQEClip = getQEItemByClip(targetClip);
		if (!targetQEClip) {
			continue;
		}

		addAudioEffectToQEClip(targetQEClip, 'Pitch Shifter');

		var pitchShifterComponents = getSameNameComponentsFromClip(targetClip, "Pitch Shifter");
		if (pitchShifterComponents.length < 1) {
			alert("Something went wrong");
			return;
		}

		var precisionProp = getPropertyFromComponent(pitchShifterComponents[0], 'Precision');
		precisionProp.setValue(2);

		var ratioProp = getPropertyFromComponent(pitchShifterComponents[0], 'Transpose Ratio');
		ratioProp.setValue(0.1380711);
	}
}
