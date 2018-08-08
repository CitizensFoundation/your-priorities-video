/**
@license
Copyright (c) 2018 Citizens Foundation. All rights reserved. AGPL License.
*/

import 'helium-animated-pages/helium-animated-pages';

import { connect } from 'pwa-helpers/connect-mixin';

// This element is connected to the redux store.
import { store } from '../store.js';

import { PageViewElement } from './page-view-element.js';

class YpFlow extends connect(store)(PageViewElement) {
  
  static get properties() { return {
    _stageName: String,
    _stateFlowName: String
  }}

  constructor() {
    super();
  }

  _stateChanged(state) {
    if (state[this._stateFlowName] && this._stageName!=state[this._stateFlowName].stageName) {
      this._stageName = state[this._stateFlowName].stageName;
    }
  }
}

window.customElements.define('yp-flow', YpFlow);
