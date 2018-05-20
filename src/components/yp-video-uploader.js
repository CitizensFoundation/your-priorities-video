/**
@license
Copyright (c) 2018 Citizens Foundation. All rights reserved. AGPL License.
*/

import { LitElement, html } from '@polymer/lit-element';

import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the redux store.
import { store } from '../store.js';
import { ButtonSharedStyles } from './button-shared-styles.js';
import { Button } from "@material/mwc-button"

import { videojs } from '../../node_modules/video.js/dist/video.es';

class YpVideoUploader extends connect(store)(LitElement) {
  _render({_recordedData, _isUploading}) {
    return html`
        <div class="vertical">
          <div>
            <video id="ypVideoPreviewer" class="video-js"></video>
          </div>

          <mwc-button raised hidden="${_isUploading}" on-click="${() => store.dispatch(uploadVideo(this._recordedData))}">
            ${t('upload_video')}
          </mwc-button>
          <mwc-button raised hidden="${_isUploading}" on-click="${() => store.dispatch(deleteVideoPreview())}">
            ${t('delete_video')}
          </mwc-button>
          <mwc-button raised hidden="${!_isUploading}" on-click="${() => store.dispatch(cancelVideoUpload())}">
            ${t('cancel_upload')}
          </mwc-button>
        </div>
      `
  }

  static get properties() { return {
    _player: Object,
    _recordedData: Object,
    _isUploading: Boolean
  }}

  _stateChanged(state) {
    if (this._isUploading && !state.videoRecorder.isUploading) {
      this._uploadFinished();
    } else {
      this._isUploading = state.videoRecorder.isUploading;
    }
    this._recordedData = state.videoRecorder.recordedData;
    if (this._recordedData) {
      this._setupPreviewVideo();
    }
  }

  _setupPreviewVideo() {
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
      fluid: false
  }
}

window.customElements.define('yp-video-uploader', YpVideoUploader);
