/*
 * Inspired by https://codepen.io/BangEqual/pen/VLNowO
 */

export const gradientBuilder = (value1, value2, steps) => {
  //return a workable RGB int array [r,g,b] from hex representation
  function processHEX(val) {
    //does the hex contain extra char?
    const hex = val.length > 6 ? val.substr(1, val.length - 1) : val;
    let r, g, b;
    // is it a six character hex?
    if (hex.length > 3) {
      //scrape out the numerics
      r = hex.substr(0, 2);
      g = hex.substr(2, 2);
      b = hex.substr(4, 2);

      // if not six character hex,
      // then work as if its a three character hex
    } else {
      // just concat the pieces with themselves
      r = hex.substr(0, 1) + hex.substr(0, 1);
      g = hex.substr(1, 1) + hex.substr(1, 1);
      b = hex.substr(2, 1) + hex.substr(2, 1);
    }
    // return our clean values
    return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
  }

  /**
   * padding function:
   * cba to roll my own, thanks Pointy!
   * ==================================
   * source: http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
   */
  const pad = (n, width, z) => {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  };

  const val1RGB = processHEX(value1);
  const val2RGB = processHEX(value2);
  const colors = [
    // somewhere to dump gradient
  ];

  //the percentage representation of the step
  const stepsPerc = 100 / (steps + 1);

  // diffs between two values
  const valClampRGB = [
    val2RGB[0] - val1RGB[0],
    val2RGB[1] - val1RGB[1],
    val2RGB[2] - val1RGB[2],
  ];

  // build the color array out with color steps
  for (let i = 0; i < steps; i++) {
    const clampedR =
      valClampRGB[0] > 0
        ? pad(
            Math.round((valClampRGB[0] / 100) * (stepsPerc * (i + 1))).toString(
              16
            ),
            2
          )
        : pad(
            Math.round(
              val1RGB[0] + (valClampRGB[0] / 100) * (stepsPerc * (i + 1))
            ).toString(16),
            2
          );

    const clampedG =
      valClampRGB[1] > 0
        ? pad(
            Math.round((valClampRGB[1] / 100) * (stepsPerc * (i + 1))).toString(
              16
            ),
            2
          )
        : pad(
            Math.round(
              val1RGB[1] + (valClampRGB[1] / 100) * (stepsPerc * (i + 1))
            ).toString(16),
            2
          );

    const clampedB =
      valClampRGB[2] > 0
        ? pad(
            Math.round((valClampRGB[2] / 100) * (stepsPerc * (i + 1))).toString(
              16
            ),
            2
          )
        : pad(
            Math.round(
              val1RGB[2] + (valClampRGB[2] / 100) * (stepsPerc * (i + 1))
            ).toString(16),
            2
          );
    colors[i] = ["#", clampedR, clampedG, clampedB].join("");
  }

  console.log(colors);
  return colors;
};
