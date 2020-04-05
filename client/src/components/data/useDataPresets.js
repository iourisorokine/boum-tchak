export const useDataPresets = () => {
  const startPartition = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  const partitions = [
    [
      [0, 0, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 0, 0, 0],
      [1, 2, 3, 2, 0, 1, 2, 1]
    ],
    [
      [0, 0, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 1, 0],
      [0, 0, 1, 2, 0, 0, 1, 1]
    ],
    [
      [0, 0, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 0, 0, 0],
      [1, 2, 3, 2, 0, 1, 2, 1]
    ]
  ];

  const soundsList = [
    "clap1",
    "poc",
    "openHat1",
    "snare1",
    "snare2",
    "kick1",
    "kick2",
    "hiHat1",
    "hiHat2",
    "hiHat3",
    "hiHat4",
    "kick3",
    "kick4",
    "kick5",
    "tom1",
    "vinyl1",
    "vinyl2",
    "vinyl3",
    "vinyl4"
  ];

  const sounds = {};

  soundsList.forEach(el => {
    sounds[el] = new Audio(`sounds/${el}.wav`);
  });

  const musicLines = [
    {
      label: "Clap",
      colors: ["#ddd", "#7b7", "#7e7"],
      sounds: [null, sounds.clap1, sounds.poc]
    },
    {
      label: "Snares",
      colors: ["#ddd", "#6f5", "#bfc"],
      sounds: [null, sounds.snare1, sounds.snare2]
    },
    {
      label: "Kicks",
      colors: ["#ddd", "#baa", "#ecb"],
      sounds: [null, sounds.kick1, sounds.kick2]
    },
    {
      label: "Hi-Hats",
      colors: ["#ddd", "#b75", "#da6", "#fb9"],
      sounds: [null, sounds.hiHat1, sounds.hiHat2, sounds.hiHat3]
    },
    {
      label: "Vinyl",
      colors: ["#ddd", "#44a", "#55d", "#67f"],
      sounds: [null, sounds.vinyl1, sounds.vinyl2, sounds.vinyl3]
    }
  ];

  const songs = [
    {
      title: "Bipappalouda",
      partition: partitions[0],
      instruments: musicLines,
      tempo: 120
    },
    {
      title: "Song 2",
      partition: partitions[1],
      instruments: musicLines,
      tempo: 120
    }
  ];

  return {
    startPartition,
    soundsList,
    sounds,
    musicLines,
    partitions,
    songs
  };
};
