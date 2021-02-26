import React from 'react';

function MyAudio(props) {
  return (
    <audio className={props.audioClass} autoPlay={true} />
  )
}

export default MyAudio;
