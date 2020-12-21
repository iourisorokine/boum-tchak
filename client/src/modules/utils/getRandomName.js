export const getRandomName = () => {
  const first = ["Anonymous", "Mysterious", "Unknown", "Forgotten"];
  const second = [
    "Musician",
    "Troubadour",
    "Creator",
    "Barde",
    "Artist",
    "Beats Maker",
    "Sounds Juggler",
  ];

  const randomIndex = (n) => Math.floor(Math.random() * n);

  const randomName = `${first[randomIndex(first.length)]} ${
    second[randomIndex(second.length)]
  }`;

  return randomName;
};
