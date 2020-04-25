/* Plays one beat of the music, 
each note of the beat being the note on each line corresponding 
to the selected index */
export const playBeat = (lines, partition, beatNumber) => {
  partition.forEach((partitionLine, i) => {
    if (partitionLine[beatNumber]) {
      const soundIndex = partitionLine[beatNumber];
      lines[i].sounds.forEach((el) => {
        if (el) {
          el.pause();
          el.currentTime = 0;
        }
      });
      lines[i].sounds[soundIndex].play();
    }
  });
};
