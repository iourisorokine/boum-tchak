export const preparePartition = (instruments, length) => {
  if (!instruments) return [];
  const partition = [];
  instruments.forEach(() => {
    const emptyLine = [];
    for (let i = 1; i <= length; i++) {
      emptyLine.push(0);
    }
    partition.push(emptyLine);
  });
  return partition;
};

export const prepareInstruments = (instruments) => {
  if(!instruments.length) return;
  const preparedInstruments = instruments.map((instrument) => {
    if(instrument.category==="Tone Synth") {
      return prepareToneJsInstrument(instrument);
    }
    return prepareSamplesInstrument(instrument);
  });
  return preparedInstruments;
};

export const prepareOneInstrument = (instrument) => {
  if(instrument.category==="Tone Synth") {
    return prepareToneJsInstrument(instrument);
  }
  return prepareSamplesInstrument(instrument);
}

export const prepareToneJsInstrument = (instrument) => {
  const { colors, pitches } = instrument;
  const sounds = [];

  for(let i=0; i<pitches.length;i++){
    sounds.push({});
  }
  return {
    id: instrument._id,
    label: instrument.name,
    isToneJs: true,
    colors,
    sounds,
    pitches,
  };
}

export const prepareSamplesInstrument = (instrument) => {
  const lineSounds = [];
  const linePitches = [];
  instrument.sounds.forEach((el) => {
    if(!el) {
      lineSounds.push({ name: "default", url: "" });
      linePitches.push('');
    }
    if (el.url) {
      lineSounds.push(new Audio(el.url));
      linePitches.push(el.pitch || '');
    } else {
      lineSounds.push(null);
      linePitches.push('');
    }
  });
  return {
    id: instrument._id,
    label: instrument.name,
    colors: instrument.colors,
    isToneJs: false,
    sounds: lineSounds,
    pitches: linePitches,
  };
};
