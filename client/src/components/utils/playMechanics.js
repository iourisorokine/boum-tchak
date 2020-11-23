import * as Tone from 'tone';
/* Plays one beat of the music, 
each note of the beat being the note on each line corresponding 
to the selected index */
export const playBeat = (instruments, partition, beatNumber) => {
  partition.forEach((partitionLine, i) => {
    if (partitionLine[beatNumber]) {
      const soundIndex = partitionLine[beatNumber];

        if(!instruments[i].isToneJs){
          // stops if a sound was playing
          instruments[i].sounds.forEach((sound) => {
            if (sound) {
              sound.pause();
              sound.currentTime = 0;
            }
          });
  
          //plays selected sound
          instruments[i].sounds[soundIndex].play();
        }else if(instruments[i].isToneJs){
          const synth = new Tone.Synth().toDestination();
          const now = Tone.now();
          synth.triggerAttackRelease(instruments[i].pitches[soundIndex], "8n", now);
        }
      }
  });
};
