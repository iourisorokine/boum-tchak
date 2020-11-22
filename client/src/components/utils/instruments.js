export const preparePartition = (instruments, length) => {
  if (!instruments) return [];
  const partition = [];
  instruments.forEach((el) => {
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
    return prepareOneInstrument(instrument);
  });
  return preparedInstruments;
};

export const prepareOneInstrument = (instrument) => {
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
    sounds: lineSounds,
    pitches: linePitches,
  };
};
