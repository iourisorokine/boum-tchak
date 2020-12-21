const SOUND_CATEGORIES = [
  "default",
  "Drums",
  "Bass",
  "Synth",
  "Guitar",
  "Tone Synth",
  "Piano",
  "Brass",
  "Strings",
  "Flute",
  "Effects",
  "Voice",
  "Other",
];

const SUB_CATEGORIES = {
  "": [""],
  default: [""],
  Drums: [
    "",
    "Kick",
    "Snare",
    "Tom",
    "Hi-hat",
    "Cymbal",
    "Vinnyl",
    "Percussion",
    "Clang",
    "Other",
  ],
  Bass: ["", "Acoustic", "Fretless", "Electric", "Picked", "Synth", "Slap"],
  Synth: ["", "Piano", "Ambiant", "Lead", "Pad", "Effect", "Electronic"],
  Guitar: [
    "",
    "Acoustic",
    "Clean",
    "Overdrive",
    "Distorsion",
    "Muted",
    "Jazz",
    "Fuzz",
    "Wah",
    "Funk",
  ],
  "Tone Synth": ["", "Synth", "AMSynth", "FMSynth"],
  Piano: ["", "Grand", "Acoustic", "Clavesin"],
  Brass: ["", "Horn", "Trumpet", "Tuba", "Trombone"],
  Strings: ["", "Violin", "Cello", "Double Bass", "Harp", "Mixed-strings"],
  Flute: ["", "Flute", "Clarinet", "Pipeau", "Peruvian", "Bass", "Recorder"],
  Effects: ["", "Scratch", "Noise", "Clang", "Electronic", "Mystic"],
  Voice: ["", "Hi-sing", "Mid-sing", "Low-sing", "Talk", "Noize"],
  Other: [""],
};

export const getSubCategories = (category) => {
  return SUB_CATEGORIES[category];
};

export const getCategories = () => {
  return SOUND_CATEGORIES;
};
