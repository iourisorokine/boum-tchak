import React from "react";
import { Row, Column, PageLayout, Heading2, Heading3 } from "../../ui-kit";

export const Help = () => {
  return (
    <PageLayout>
      <Row>
        <Column>
          <Heading2>Help</Heading2>
        </Column>
      </Row>
      <Row>
        <Column>
          <p>
            The 2 main sections of the app are "Listen", where you can browse,
            check and play the music loops that are created, and "Create" where
            you can create your own loops.
          </p>
        </Column>
      </Row>
      <Row>
        <Column>
          <Heading3>Create song</Heading3>
          <p>
            In the song creation space you see the music grid which is composed
            of notes represented by gray squares, and a control panel at the
            bottom:
          </p>
          <Row alignItems="center" justifyContent="center">
            <Column alignItems="center" justifyContent="center">
              <img src="images/music-grid-1.png" />
            </Column>
          </Row>
          <p>
            On the music grid, the horizontal axis is the time, the vertical is
            the array of instruments that are available to you. Let's first try
            the default instruments.
          </p>
          <p>
            By clicking on a square, it changes color as you activate a sound to
            be played at a certain time in the loop. For example if you click on
            the first square of the kick, a kick will be played at the
            beginning.
          </p>
          <Row alignItems="center" justifyContent="center">
            <Column alignItems="center" justifyContent="center">
              <img src="images/music-grid-2.png" />
            </Column>
          </Row>
          <p>
            Some instruments have only one sound, some have several, clicking
            several times on the same square switches between different sounds.
            Let's create a basic loop by switching on the notes (1 click) to
            form the following pattern:
          </p>
          <Row alignItems="center" justifyContent="center">
            <Column alignItems="center" justifyContent="center">
              <img src="images/music-grid-3.png" />
            </Column>
          </Row>
          <p>
            Press play and the magic happens! The notes are read as a sequence,
            at a 120 tempo, 8 squares represent a second, so our loop is 1
            second long.
          </p>
          <p>
            To make the loop longer, press the "+" button next to "bars" and the
            grid extends. When the grid is longer than 16 notes, it gets spread
            on several pages that you can check and select using the page
            selector:
          </p>
          <Row alignItems="center" justifyContent="center">
            <Column alignItems="center" justifyContent="center">
              <img src="images/music-pages-selectors.png" />
            </Column>
          </Row>
          <p>
            You can add and remove instruments (grid lines) using the menu. Once
            you are happy with your creation, click on "save" to keep it and
            share it. To save, you will need to create a profile, but this takes
            a couple of seconds. That's about it!
          </p>
        </Column>
      </Row>
      <Row>
        <Column>
          <Heading3>Have fun!</Heading3>
        </Column>
      </Row>
    </PageLayout>
  );
};
