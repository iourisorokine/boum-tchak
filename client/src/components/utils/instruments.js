export const preparePartition = (instruments, length) => {
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
  const preparedInstruments = instruments.map((line) => {
    const lineSounds = [];
    const lineColors = [];
    line.sounds.forEach((el) => {
      if (el.url) {
        lineSounds.push(new Audio(el.url));
      } else {
        lineSounds.push(null);
      }
      lineColors.push(el.color);
    });
    return {
      id: line._id,
      label: line.name,
      colors: lineColors,
      sounds: lineSounds,
    };
  });
  return preparedInstruments;
};

export const prepareOneInstrument = (instrument) => {
  const lineSounds = [];
  const lineColors = [];
  instrument.sounds.forEach((el) => {
    if (el.url) {
      lineSounds.push(new Audio(el.url));
    } else {
      lineSounds.push(null);
    }
    lineColors.push(el.color);
  });
  return {
    id: instrument._id,
    label: instrument.name,
    colors: lineColors,
    sounds: lineSounds,
  };
};
