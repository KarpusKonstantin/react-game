const SET_HINT = "SET_HINT";
const SET_SOUND_MUTE = "SET_SOUND_MUTE";
const SET_SOUND_VOLUME = "SET_SOUND_VOLUME";
const SET_MUSIC_MUTE = "SET_MUSIC_MUTE";
const SET_MUSIC_VOLUME = "SET_MUSIC_VOLUME";
const SET_OPTIONS = "SET_OPTIONS";
const SET_AUTOPLAY = "SET_AUTOPLAY";
const SET_AUTOPLAY_SPEED = "SET_AUTOPLAY_SPEED";
const SET_DARK_THEME = "SET_DARK_THEME";

const defaultState = {
  options: {
    hint: false,
    sound: {
      mute: true,
      volume: 1
    },
    music: {
      mute: false,
      volume: 0.5
    }
  },
  autoPlay: false,
  autoPlaySpeed: 500,
  darkTheme: false
}

export default function reposReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_OPTIONS:
      return {
        ...state,
        options: action.payload
      }
    case SET_AUTOPLAY:
      return {
        ...state,
        autoPlay: action.payload
      }
    case SET_AUTOPLAY_SPEED:
      return {
        ...state,
        autoPlaySpeed: action.payload
      }
    case SET_DARK_THEME:
      return {
        ...state,
        darkTheme: action.payload
      }
    case SET_HINT:
      return {
        ...state,
        options: {
          ...state.options,
          hint: action.payload
        },
      }
    case SET_SOUND_MUTE:
      return {
        ...state,
        options: {
          ...state.options,
          sound:{
            ...state.options.sound,
            mute: action.payload
          }
        },
      }
    case SET_MUSIC_MUTE:
      return {
        ...state,
        options: {
          ...state.options,
          music:{
            ...state.options.music,
            mute: action.payload
          }
        },
      }

    case SET_SOUND_VOLUME:
      return {
        ...state,
        options: {
          ...state.options,
          sound:{
            ...state.options.sound,
            volume: action.payload
          }
        },
      }

    case SET_MUSIC_VOLUME:
      return {
        ...state,
        options: {
          ...state.options,
          music:{
            ...state.options.music,
            volume: action.payload
          }
        },
      }

    default:
      return state
  }

}

export const setHint = (hint) => ({type:SET_HINT, payload:hint});
export const setSoundMute = (mute) => ({type:SET_SOUND_MUTE, payload:mute});
export const setSoundVolume = (volume) => ({type:SET_SOUND_VOLUME, payload:volume});
export const setMusicMute = (mute) => ({type:SET_MUSIC_MUTE, payload:mute});
export const setMusicVolume = (volume) => ({type:SET_MUSIC_VOLUME, payload:volume});
export const setOptions = (options) => ({type:SET_OPTIONS, payload:options});
export const setAutoPlay = (bool) => ({type:SET_AUTOPLAY, payload:bool});
export const setAutoPlaySpeed = (speed) => ({type:SET_AUTOPLAY_SPEED, payload:speed});
export const setDarkTheme = (bool) => ({type:SET_DARK_THEME, payload:bool});
