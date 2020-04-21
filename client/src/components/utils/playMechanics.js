/* Plays one beat of the music, 
each note of the beat being the note on each line corresponding 
to the selected index */
export const playBeat = (lines, partition, beatNumber) => {
  partition.forEach((line, i) => {
    if (line[beatNumber]) {
      const soundIndex = line[beatNumber];
      lines[i].sounds[soundIndex].currentTime = 0;
      lines[i].sounds[soundIndex].play();
    }
  });
};
