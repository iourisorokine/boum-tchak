# Boum-Tchak

## What is This?

Boum-Tchak is an app to combine samples and create rhythms.

Each track is composed of lines that represent instruments. 
Each instrument contains one or several sounds. 
Lines are divided in "bars" which correspond to a certain fraction of time. For each instrument and each bar, there is a note.

The notes can be switched on/off to compose loops.

## Functionalities

### Create Song

The controls include: adding and removing instruments, adding and removing bars, a tempo selector, a play / stop button and the possibility to switch on and off the fact that the sounds are played when switched on on the grid.

Saving the song also allows to share it in the feed, and every user can load previous songs in order to edit them.

If a partition is longer than the view width, it is spread on several pages, and a page selector appears on top of the song.

### Listen

A feed with posted songs (currently - all saved songs), hat can be played and paused by clicking on them.

### Profile

A very basic user space, mainly used to save and load user's own creations.
Possibility to create instruments and upload own sounds for selected users.

### Create Instrument

Very "behind the scenes for now: one or several samples can be selected or uploaded each associated with a color to form an instrument. Sounds have categories, sub-categories, and pitches in order to help with the creation and classification.
Automatic color gradients are generated via a tool in order to give the instruments a good visual effect.

## Tech Stack

- Frontend: React
- Backend: Node.JS + Express
- Database: MongoDB + Mongoose

## Further development

I am looking forward to developing the app further and ship, among others:

- A user-friendly to upload sounds and create instruments
- A possibility to record wav samples directly
- Improvements in music editing
- DJ mode: create several mini-loops that can be launched separately or together
- Social interactions (claps-like system)
- Pedagogic elements (Rhytmic patterns, tutorials)

If you are interested in contributing, please feel free to contact me.

