import * as PIXI from 'pixi.js'
import { boardCont, tonkinApplication } from './core/PixiModel'
import * as ToPixiDrawer from './core/ToPixiDrawer'

import React from 'react'
import ReactDOM from 'react-dom'
import FocusArea from './focus-area-components/FocusArea'

window.onload = function() {
  document.getElementById('tonkin-pixi-root').appendChild(tonkinApplication.view);
  ReactDOM.render(<FocusArea />, document.getElementById('config-panel'));
}
