/**
@license
Copyright (c) 2018 Citizens Foundation. All rights reserved. AGPL License.
*/

import { LitElement, html } from '@polymer/lit-element';

import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the redux store.
import { store } from '../store.js';
import { ButtonSharedStyles } from './button-shared-styles.js';

import { videojs } from '../../node_modules/video.js/dist/video.es';

class YpVideoUploader extends connect(store)(LitElement) {
  _render({_recordedData}) {
    return html`
        <div>
          <video id="ypVideoPreviewer" class="video-js"></video>
        </div>
      `
  }

  static get properties() { return {
    _player: Object,
    recordedData: Object
  }}

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._items = cartItemsSelector(state);
    this._total = cartTotalSelector(state);
  }

  _firstRendered() {
    this._player = videojs("#ypVideoPreviewer", this._getVideoProps(), function onPlayerReady(){
      this._player.src({type:'video/mp4', src: URL.createObjectURL(this.recordedData)});
      this._player.load();
      this._player.play();
      videojs.log('Using video.js', videojs.VERSION);
    });

    this._player.on('deviceError', function() {
      console.log('device error:', this._player.deviceErrorCode);
    });

    this._player.on('error', function(error) {
      console.warn(error);
    });
  }
  
  _getVideoProps() {
    return {
      controls: true,
      width: 320,
      height: 240,
      fluid: false,
      plugins: {
          record: {
              audio: true,
              video: true,
              maxLength: 10,
              debug: true
          }
      }
  }
}

window.customElements.define('yp-video-recorder', YpVideoRecorder);
