/**
@license
Copyright (c) 2018 Citizens Foundation. All rights reserved. AGPL License.
*/

import { LitElement, html } from '@polymer/lit-element';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';

// This element is connected to the redux store.
import { store } from '../store.js';
import { removeFromCart } from '../actions/shop.js';
import { cartItemsSelector, cartTotalSelector } from '../reducers/shop.js';
import { removeFromCartIcon } from './my-icons.js';
import { ButtonSharedStyles } from './button-shared-styles.js';

import { videojs } from '../../node_modules/video.js/dist/video.es';

class YpVideoPost extends connect(store)(LitElement) {
  _render( _post, _pointsFor, _pointsAgainst, _pointsInterleaved ) {
    return html`
      <div class="vertical">
        <yp-video-item item="${ _post.data.videoItem }"></yp-video-item>
      </div>
      <div class="horizontal wrap">
        ${ _wideScreen ? html`
          <yp-video-list videoPoints=${_pointsFor.data}></yp-video-list>
          <yp-video-list videoPoints=${_pointsAgainst.data}></yp-video-list> 
        `:  html`
          <yp-video-list videoPoints=${_pointsInterleaved.data}></yp-video-list>
        `}
      </div>
    `;
  }

  static get properties() {
    return {
      _post: Object,
      _failure: Boolean,
      _wideScreen: Boolean,
      width: Number,
      height: Number
    }
  }

  constructor() {
    super();
    if (!this.width)
      this.width = 320;
    
    if (!this.height)
      this.height = 240;

    installMediaQueryWatcher(`(min-width: 600px)`, (matches) => {
      this._wideScreen = matches;
    });
  }

  _stateChanged(state) {
    const post = currentPostSelector(state);
    this._post = post;
    this._failure = post && post.failure;

    if (this._wideScreen) {
      this._pointsFor =  currentPointsForSelector(state);
      this._pointsAgainst =  currentPointsAgainstSelector(state);
    } else {
      this._pointsInterleaved = currentPointsInterleavedSelector(state);     
    }
  }
}

window.customElements.define('yp-video-post', YpVideoPost);
