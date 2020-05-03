const SOUND_CATEGORIES = [
  "default",
  "Drums",
  "Bass",
  "Synth",
  "Guitar",
  "Ambiant",
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
  Bass: ["", "Acoustic", "Fretless", "Electric", "Picked", "Synth"],
  Synth: [""],
  Guitar: ["", "Acoustic", "Clean", "Overdrive", "Distorsion"],
  Ambiant: [""],
  Voice: ["", "Hi-sing", "Mid-sing", "Low-sing", "Talk", "Noize"],
  Other: [""],
};

export const getSubCategories = (category) => {
  return SUB_CATEGORIES[category];
};

export const getCategories = () => {
  return SOUND_CATEGORIES;
};
