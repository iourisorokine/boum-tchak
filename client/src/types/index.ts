export interface User {
  _id: string;
  username: string;
  password: string;
  profilePic: string;
  songs: any[];
  customInstruments: any[];
  admin: boolean;
  created_at: string;
  updated_at: string;
}

export type MusicLine = {
  colors: string[];
  id: string;
  isToneJs: boolean;
  label: string;
  pitches: string [];
  sounds: (HTMLAudioElement | null)[];
}

export interface Song {
  _id: string;
  title: string;
  creatorName: string;
  tempo: number;
  partition: number[][];
  musicLines: MusicLine[];
  instruments: any[];
}
