/**
@license
Copyright (c) 2018 Citizens Foundation. All rights reserved. AGPL License.
*/

import { YpAudioRecorder } from './yp-media-recorder';

class YpAudioRecorder extends YpMediaRecorder {
  _getVideoProps() {
    return {
      controls: true,
      width: 600,
      height: 300,
      fluid: false,
      plugins: {
          wavesurfer: {
              src: "live",
              waveColor: "#36393b",
              progressColor: "black",
              debug: true,
              cursorWidth: 1,
              msDisplayMax: 20,
              hideScrollbar: true
          },
          record: {
              audio: true,
              video: false,
              maxLength: 15,
              debug: true
          }
        }
      }
  }
}

window.customElements.define('yp-audio-recorder', YpAudioRecorder);
