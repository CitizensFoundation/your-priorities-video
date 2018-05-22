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

store.dispatch(loadFavorites());

export class YpVideoList extends connect(store)(LitElement) {
  _render({ _favorites, _items = [], _list, _pathname }) {
    const loading _list.isFetching;
    return html`
    ${sharedStyles}
    <style>
      :host > a {
        display: inline-block;
        margin: 0 8px 8px 0;
      }
    </style>
    ${repeat(_items, (item) => html`
      <yp-video-item
          videoItem="${item}"
          isFavorite="${_favorites && item && _favorites[item.id]}">
      </yp-video-item>
    `)}
    `;
  }

  static get properties() {
    return {
      _list: Object,

      _favorites: Object,

      _items: Array,

      _pathname: String
    }
  }

  _stateChanged(state) {
    const list = currentListSelector(state);
    if (list) {
      updateMetadata({ title: list.id });
      document.body.setAttribute('list', list.id);
      this._favorites = state.favorites;
      this._list = list;
      this._pathname = window.location.pathname;
      const items = currentItemsSelector(state);
      if (items) {
        this._items = items;
      }
    }
  }
}

customElements.define('yp-video-list', YpVideoList);

export { currentListSelector, fetchListIfNeeded };