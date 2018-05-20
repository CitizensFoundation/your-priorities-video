/**
@license
Copyright (c) 2018 Citizens Foundation. All rights reserved. AGPL License.
*/

import { LitElement, html } from '@polymer/lit-element';
import { videojs } from '../../node_modules/video.js/dist/video.es';

class YpVideoItem extends LitElement {
  _render(videoItem) {
    return html`
      ${videoItem.User.name}:
      <img src="${videoItem.selectedPreview}" on-click="${() => this._playVideo()}">
      <video id="ypVideoPreviewer" class="video-js"></video>
    `;
  }

  static get properties() {
    return {
      videoItem: Object,
      _videoPreviewActive: Boolean
    }
  }

  _playVideo() {
    this._player = videojs("#ypVideoPreviewer", this._getVideoProps(), function onPlayerReady(){
      this._player.src({type:'video/mp4', src: this.videoItem.videoUrl });
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
  }}  
}

window.customElements.define('yp-video-item', YpVideoItem);
