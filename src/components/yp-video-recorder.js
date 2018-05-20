/**
@license
Copyright (c) 2018 Citizens Foundation. All rights reserved. AGPL License.
*/

import { LitElement, html } from '@polymer/lit-element';

import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the redux store.
import { store } from '../store.js';
import { removeFromCart } from '../actions/shop.js';
import { cartItemsSelector, cartTotalSelector } from '../reducers/shop.js';
import { removeFromCartIcon } from './my-icons.js';
import { ButtonSharedStyles } from './button-shared-styles.js';

import { videojs } from '../../node_modules/video.js/dist/video.es';
import { RecordRTC } from '../../node_modules/recordrtc/RecordRTC';
import { Record } from 'videojs-record/src/js/videojs.record';

class YpVideoRecorder extends connect(store)(LitElement) {
  _render({_recordedData}) {
    return html`
        <div>
          <video id="ypVideoRecorder" class="video-js"></video>
        </div>

        ${ _recordedData ? html`
          <yp-video-uploader recordedData=${_recordedData}></yp-video-uploader>
        ` : null }  
      `
  }

  static get properties() { return {
    _player: Object,
    _recordedData: Object
  }}

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._items = cartItemsSelector(state);
    this._total = cartTotalSelector(state);
  }

  _firstRendered() {
    this._player = videojs("#ypVideoRecorder", this._getVideoProps(), function onPlayerReady(){
      videojs.log('Using video.js', videojs.VERSION,
          'with videojs-record', videojs.getPluginVersion('record'),
          'and recordrtc', RecordRTC.version);
    });

    this._player.on('deviceError', function() {
      console.log('device error:', this._player.deviceErrorCode);
    });

    this._player.on('error', function(error) {
      console.warn(error);
    });

    this._player.on('startRecord', function() {
      console.log('started recording!');
    });

    this._player.on('finishRecord', function() {
      console.log('finished recording');
      if (this._player.recordedData.video) {
        // for chrome for audio+video
        this._recordedData = this._player.recordedData.video;
      } else {
        this._recordedData = this._player.recordedData;
      }
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
