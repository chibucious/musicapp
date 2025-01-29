/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Song {
  title?: string;
  subtitle?: string;
  images?: {
    coverart?: string;
  };
  [key: string]: any;
}

export interface PlayerState { // Exported for use in the store
  currentSongs: Song[];
  currentIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  activeSong: Song;
  genreListId: string;
}

interface SetActiveSongPayload {
  song: Song;
  data: any;
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

      if (action.payload?.data?.tracks?.hits) {
        state.currentSongs = action.payload.data.tracks.hits;
      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.data?.tracks;
      } else {
        state.currentSongs = action.payload.data;
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
