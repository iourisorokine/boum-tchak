/* 
    Generate a random music sequence for 1 line
    depth: how many different sounds per note
    length: how long is the line
    density: determines if the line will be more or less populated with sounds
*/

export const applyMotif = (sequence: number[], depth: number, length: number ) => {
  const motif = Math.ceil(Math.random() * length * 1.5);
  const offset = Math.ceil(Math.random() * motif);
  const note = Math.ceil(Math.random() * depth);
  for (let i = 0; i < length; i++) {
    const currentNote = (i + offset) % motif === 0 ? note : 0;
    sequence[i] = !!sequence[i]? sequence[i]: currentNote ;
  }
  return sequence;
}

export const getRandomSequence = (depth: number, length: number, density: number) => {
  let sequence: number[] = []
  const numberOfMotifs = Math.ceil(Math.random()*(density));
  for( let i = 0; i < numberOfMotifs; i++){
    sequence = applyMotif(sequence, depth, length)
  }

  return sequence;
};
