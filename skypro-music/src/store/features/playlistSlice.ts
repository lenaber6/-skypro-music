// Здесь храниться логика и данные для управления аутентификацией пользователя в нашем приложении.
// В этом файле мы будем использовать функционал, предоставляемый Redux Toolkit, чтобы создать срез состояния.
// CreatSlice - встроенная функция, которая помогает создать слайс.
// PayloadAction - некий встроенный тип, который обозначает action
import { fetchFavouriteTracks } from "@/api/user";
import { trackType } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getFavouriteTracks = createAsyncThunk(
  "playlist/getFavouriteTracks",
  async(tokens: {access:string, refresh:string}) => {
    const favouriteTracks = await fetchFavouriteTracks(tokens);
    return favouriteTracks;
  }
)

type PlaylistStateType =  { // Тип среза состояния
  currentTrack: null | trackType;       // Сохраним в состояние текущий трек в виде объекта
  playlist: trackType[],
  isPlaying: boolean,
  shuffledPlaylist: trackType[],
  isShuffle: boolean,
  filterOptions: {
    author: string[],
    genre: string[],
    order: string,
    searchValue: string,
  },
  filteredTracks: trackType[],
  initialTracks: trackType[],
  likedTracks: trackType[],
}

const initialState: PlaylistStateType = { // мы определяем начальное состояние initialState
  currentTrack: null,  // в котором authState указывает на статус аутентификации пользователя.
  playlist: [],
  isPlaying: false,
  shuffledPlaylist: [],
  isShuffle: false,
  filterOptions: {
    author: [],
    genre: [],
    order: "По умолчанию",
    searchValue: "",
  },
  filteredTracks: [],
  initialTracks: [],
  likedTracks: [],
};

const playlistSlice = createSlice({ // С помощью функции createSlice мы создаем срез состояния (плэйлиста) с именем auth,
  name: "playlist",
  initialState,  // ключ и значение initialState совпадают (см. выше)
  // включающий в себя редьюсеры для обработки действий, таких как setAuthState,
  // позволяющий обновлять состояние аутентификации.
  reducers: {   // редьюсер- функция для обработки среза состояния. 
    // reducer принимает только один параметр или объект
    setInitialTracks: (state, action: PayloadAction<{initialTracks: trackType[]}>) => {
      state.initialTracks = action.payload.initialTracks;
      state.filteredTracks = action.payload.initialTracks;
    },
    setCurrentTrack: (state, action: PayloadAction<{trackData:trackType, tracksData: trackType[], isPlaying:boolean}>) => { // Устанавливаем текущий трек и выводим его в Прогрессбар
      // 1й параметр - state- актуальное состояние на текущий момент
      // 2й параметр - action - из него мы получаем данные (это в action.payload ниже),
      // которые будем передавать при вызове этой функции. 
      state.currentTrack = action.payload.trackData; // установка текущего трека в глобальное состояние
      state.playlist = action.payload.tracksData; // установка текущего плэйлиста в глобальное состояние
      state.shuffledPlaylist = [...action.payload.tracksData].sort(() => 0.5 - Math.random());
      state.isPlaying = true;
      // чтобы поменять состояние, н. написать state.новое состояние
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle ? state.shuffledPlaylist : state.playlist;
      const currentTrackIndex = playlist.findIndex((trackData) => trackData.id === state.currentTrack?.id);
      const newTrack = playlist[currentTrackIndex + 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      } else {
        state.currentTrack = playlist[0];
      }
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle ? state.shuffledPlaylist : state.playlist;
      const currentTrackIndex = playlist.findIndex((trackData) => trackData.id === state.currentTrack?.id);
      const newTrack = playlist[currentTrackIndex - 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      }  else {
        state.currentTrack = playlist[0];
      }
    },
    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    }, 
    // setNextTrack: changeTrack(1),
    // setPrevTrack: changeTrack(-1),
    setFilters: (state, action:PayloadAction<{
      author?: string[];
      genre?: string[];
      order?: string;
      searchValue?: string}>)=> {
state.filterOptions = {
  author: action.payload.author || state.filterOptions.author,
  genre: action.payload.genre || state.filterOptions.genre,
  order: action.payload.order || state.filterOptions.order,
  searchValue: 
  typeof action.payload.searchValue === "string"
  ? action.payload.searchValue
  : state.filterOptions.searchValue,
};
state.filteredTracks = state.initialTracks.filter((track) => {
  const hasAuthors = state.filterOptions.author.length !==0;
  const isAuthors = hasAuthors 
  ? state.filterOptions.author.includes(track.author)
  : true;

  const hasGenres = state.filterOptions.genre.length !==0;
  const isGenres = hasGenres 
  ? state.filterOptions.genre.includes(track.genre)
  : true;
  const hasSearchValue = track.name.toLowerCase()
  .includes(state.filterOptions.searchValue?.toLowerCase())
  || 
  track.author.toLowerCase()
  .includes(state.filterOptions.searchValue?.toLowerCase())
  ;
  return isAuthors && isGenres && hasSearchValue;
});
if (state.filterOptions.order === "Сначала новые") {
  state.filteredTracks.sort(
    (y: { release_date: string | number | Date; },x: { release_date: string | number | Date; }) => 
      new Date(x.release_date).getTime() - new Date(y.release_date).getTime()
  );
} else if (state.filterOptions.order === "Сначала старые") {
  state.filteredTracks.sort(
    (y: { release_date: string | number | Date; },x: { release_date: string | number | Date; }) => 
      new Date(y.release_date).getTime() - new Date(x.release_date).getTime()
  );
} else state.filteredTracks;
    },
    setLikedTracks: (state, action: PayloadAction<trackType>) => {
      state.likedTracks.push(action.payload)
    },
    setDisLikedTracks: (state, action: PayloadAction<trackType>) => {
      state.likedTracks = state.likedTracks.filter((el) => el.id !== action.payload.id);
    },
  },
  extraReducers(builder) {
    builder.addCase(getFavouriteTracks.fulfilled, (
      state, action: PayloadAction<trackType[]>
    ) => {
      state.likedTracks = action.payload;
    })
    .addCase(getFavouriteTracks.rejected, (state, action) => {
      console.error('Error:', action.error.message); // Выводим сообщение об ошибке в консоль
    })
  }
});
// Вариант на будущее))
// function changeTrack(direction: number) {
//   return (state: PlaylistStateType) => {
//     const currentTracks = state.isShuffle
//       ? state.shuffledPlaylist
//       : state.playlist;
//     let newIndex =
//       currentTracks.findIndex((item) => item.id === state.currentTrack?.id) +
//       direction;

//     // Циклическое переключение
//     newIndex = (newIndex + currentTracks.length) % currentTracks.length;

//     state.currentTrack = currentTracks[newIndex];
//     state.isPlaying = true;
//   };
// }
export const { setInitialTracks, setCurrentTrack, setIsPlaying, setNextTrack, setPrevTrack, setIsShuffle, setFilters, setLikedTracks, setDisLikedTracks } = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;