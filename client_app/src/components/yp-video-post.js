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

class YpVideoPost extends connect(store)(LitElement) {
  _render(videoItem, _videoPreviewActive) {
    return html`
      <div class="vertical">
        <yp-video-item item="${ post.data.videoItem }"></yp-video-item>
      </div>
      <div class="horizontal wrap">
        <yp-video-list pointValue="1"></yp-video-list>
        <yp-video-list pointValue="-1"></yp-video-list>
      </div>
      <img hidden="${_videoPreviewActive} src="${videoItem.selectedPreview}" on-click="${() => this._playVideo()}">
      <video hidden="${!_videoPreviewActive}" id="ypVideoPreviewer" class="video-js"></video>
    `;
  }

  static get properties() {
    return {
      post: Object,
      width: Number,
      height: Number,
      _videoPreviewActive: Boolean
    }
  }

  constructor() {
    super();
    if (!this.width)
      this.width = 320;
    
    if (!this.height)
      this.height = 240;
  }


  _stateChanged(state) {
    if (state.currentPost && state.currentPost!=this.post) {
      this.post = state.currentPost;
    }
  }

  _playVideo() {
    this._player = videojs("#ypVideoPreviewer", this._getVideoProps(), function onPlayerReady(){
      this._player.src({type:'video/mp4', src: this.videoItem.videoUrl });
      this._player.load();
      this._player.play();
      videojs.log('Using video.js', videojs.VERSION);
    });

    this._videoPreviewActive = true;

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
      width: this.width,
      height: this.height,
      fluid: false
  }}
}

window.customElements.define('yp-video-item', YpVideoPost);
