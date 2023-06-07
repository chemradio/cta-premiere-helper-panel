app.enableQE();



function getQESequenceBySequence(sequence) {
    var sequenceID = sequence.sequenceID;
    var targetQESequence;

    for (var i = 0; i < qe.project.numSequences; i++) {
        var qeSequence = qe.project.getSequenceAt(i);
        if (qeSequence.guid === sequenceID) {
            var targetQESequence = seq;
        }
    }

    return targetQESequence;
    // // var t2 = qeProject.getItemAt(sequenceID);
    // // var t2 = qeProject.getSequenceAt(sequenceID);
    // var t2 = qeProject.getSequenceItemAt(sequenceID);
    // return
}


var x = getQESequenceBySequence(app.project.activeSequence);
alert(String(x.name))
alert(String(x.guid))

