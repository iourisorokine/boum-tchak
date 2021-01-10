/* 
    Generate a random music sequence for 1 line
    depth: how many different sounds per note
    length: how long is the line
    density: determines if the line will be more or less populated with sounds
*/

export const getRandomSequence = (depth, length, density) => {
    const sequence = [];
    const numberOfMotifs = Math.floor(Math.random()*(density+1));
    const motif1 = Math.ceil(Math.random()*length);
    const offset1 = Math.ceil(Math.random()*motif1);
    const note1 = Math.ceil(Math.random()*depth);

    for(let i = 0; i < length; i++){
        const note = (i+offset1)%motif1===0?note1:0;
        sequence[i] = note;
    }
    return sequence;
}