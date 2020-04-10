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
    line.sounds.forEach((el) => {
      if (el) {
        lineSounds.push(new Audio(el));
      } else {
        lineSounds.push(null);
      }
    });
    return {
      label: line.name,
      colors: line.colors,
      sounds: lineSounds,
    };
  });
  return preparedInstruments;
};

export const prepareOneInstrument = (instrument) => {
  const lineSounds = [];
  instrument.sounds.forEach((el) => {
    if (el) {
      lineSounds.push(new Audio(el));
    } else {
      lineSounds.push(null);
    }
  });
  return {
    label: instrument.name,
    colors: instrument.colors,
    sounds: lineSounds,
  };
};
