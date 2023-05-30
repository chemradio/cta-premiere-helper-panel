function voiceConceal() {
	var qeClips = getQEItemsBySelection();
	if (!qeClips) {
		return;
	}

	if (qeClips.length < 1) {
		return;
	}

	for (var i = 0; i < qeClips.length; i++) {
		var clip = qeClips[i].clip;
		if (clip.mediaType == 'Video') {
			continue;
		}

		var qeClip = qeClips[i].qeClip;
		addAudioEffectToQEClip(qeClip, 'Pitch Shifter');

		// configure pitch shifter
		for (var j = 0; j < clip.components.length; j++) {
			var component = clip.components[j];

			if (component.displayName == 'Pitch Shifter') {
				for (var k = 0; k < component.properties.length; k++) {
					if (component.properties[k].displayName == 'Precision') {
						component.properties[k].setValue(2);
					}
					if (
						component.properties[k].displayName == 'Transpose Ratio'
					) {
						component.properties[k].setValue(0.1380711);
					}
				}
			}
		}
	}
}
