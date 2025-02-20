/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SongT {
  title?: string;
  subtitle?: string;
  images?: {
    coverart?: string;
  };
  url?: string;  // Add this to store the audio file path
  [key: string]: any;
}

export interface PlayerState { // Exported for use in the store
  currentSongs: SongT[];
  currentIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  activeSong: SongT;
  genreListId: string;
}

interface SetActiveSongPayload {
  song: SongT;
  entiredata: any;
  i: number;
}

interface NextPrevSongPayload {
  index: number;
}

const initialState: PlayerState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
};

// Create slice with typed reducers
const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action: PayloadAction<SetActiveSongPayload>) => {
      state.activeSong = action.payload.song;

      if (action.payload?.entiredata?.tracks?.hits) {
        state.currentSongs = action.payload.entiredata.tracks.hits;
      } else if (action.payload?.entiredata?.properties) {
        state.currentSongs = action.payload?.entiredata?.tracks;
      } else {
        state.currentSongs = action.payload.entiredata;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action: PayloadAction<NextPrevSongPayload>) => {
      if (state.currentSongs[action.payload.index]?.track) {
        state.activeSong = state.currentSongs[action.payload.index]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload.index];
      }

      state.currentIndex = action.payload.index;
      state.isActive = true;
    },

    prevSong: (state, action: PayloadAction<NextPrevSongPayload>) => {
      if (state.currentSongs[action.payload.index]?.track) {
        state.activeSong = state.currentSongs[action.payload.index]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload.index];
      }

      state.currentIndex = action.payload.index;
      state.isActive = true;
    },

    playPause: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action: PayloadAction<string>) => {
      state.genreListId = action.payload;
    },
  },
});

// Export actions and reducer
export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId } = playerSlice.actions;

export default playerSlice.reducer;
