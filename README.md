# Boum-Tchak

## Intro

Boum-Tchak is an app that allows to create musical and rhythmic loops generating a visual result, in form of a mosaic.

Each music loop (song) is composed lines that represent instruments. Each instrument contains one or several sounds. The horizontal axis represents the time and each line is divided in "bars" which correspond to a certain fraction of time. For each instrument and each bar, there is a note.

The notes are represented by squares that act like switches: each note can be pressed to switch between the sounds that will be played by the corresponding instrument at the corresponding bar. Thus, by switching on the notes on different positions in the grid, the user creates a partition. When the user presses play, the partition is read and the sounds are played.

## Functionalities

### Create Song

The controls include: adding and removing instruments, adding and removing bars, a tempo selector, a play / stop button and the possibility to switch on and off the fact that the sounds are played when switched on on the grid.

Saving the song also allows to share it in the feed, and every user can load previous songs in order to edit them.

If a partition is longer than the view width, it is spread on several pages, and a page selector appears on top of the song.

### Listen

The listen section is the feed with songs. Clicking anywhere on the song launches it, and stops it when it is already playing. It is possible to play several songs at the time, but the playing is stopped when the user quits the page.

### Profile

A very basic user space, mainly used to save and load user's own creations.

## Tech Stack

- Frontend: React
- Backend: Node.JS + Express
- Database: MongoDB + Mongoose
- API: REST - possibility to migrate to single endpoint (GraphQL) in the future.

## Further development

I am looking forward to developing the app further and enable, among others:

- Social interactions
- More powerful music editing tools
- Pedagogic elements (Rhytmic patterns, tutorials)
- Adding additional content
- Performance improvement

If you are interested in contributing, please feel free to contact me.

