/**
@license
Copyright (c) 2018 Citizens Foundation. All rights reserved. AGPL License.
*/

import { LitElement, html } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat.js';
import { connect, updateMetadata } from 'pwa-helpers';
import { fetchList, fetchListIfNeeded } from '../actions/lists.js';
import { loadFavorites } from '../actions/favorites.js';
import items from '../reducers/items.js';
import favorites from '../reducers/favorites.js';
import { store } from '../store.js';
import { sharedStyles } from './shared-styles.js';
import './hn-loading-button.js';
import './hn-summary.js';

store.addReducers({
  lists,
  favorites,
  items
});

export class YpVideoList extends connect(store)(LitElement) {
  _render({ videoPoints = [], _pointQualities, _pointVideoPreviewEnabledFor, _isFetching }) {
    return html`
      ${sharedStyles}
      <style>
        :host > a {
          display: inline-block;
          margin: 0 8px 8px 0;
        }
      </style>
      ${ _isFetching ? html`<div>Fetching...</div>` : null }
      ${repeat(videoPoints, (point) => html`
        <yp-video-item
            item="${point}"
            videoEnabled="${_pointVideoPreviewEnabledFor && point && _pointVideoPreviewEnabledFor[point.id] }"
            pointQuality="${_pointQualities && point && _pointQualities[point.id]}">
        </yp-video-item>
      `)}
    `;
  }

  static get properties() {
    return {
      videoPoints: Array,
      _pointQualitities: Object,
      _isFetching: Boolean
    }
  }

  _stateChanged(state) {
    this._pointQualities = state.user ? state.user.pointQualities : null;
    this._isFetching = state.app.points.isFetching ? true : false;
  }
}

customElements.define('yp-video-list', YpVideoList);

export { currentListSelector, fetchListIfNeeded };