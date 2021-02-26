const SET_HINT = "SET_HINT";
const SET_SOUND_MUTE = "SET_SOUND_MUTE";
const SET_SOUND_VOLUME = "SET_SOUND_VOLUME";
const SET_MUSIC_MUTE = "SET_MUSIC_MUTE";
const SET_MUSIC_VOLUME = "SET_MUSIC_VOLUME";


const defaultState = {
  options: {
    hint: false,
    sound: {
      mute: false,
      volume: 100
    },
    music: {
      mute: false,
      volume: 50
    }
  }
}

export default function reposReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_HINT:
      return {
        ...state,
        options: {
          ...state.options,
          hint: action.payload
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
