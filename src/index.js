import * as PIXI from 'pixi.js'
import { boardCont, tonkinApplication } from './core/PixiModel'
import * as ToPixiDrawer from './core/ToPixiDrawer'

import React from 'react'
import ReactDOM from 'react-dom'
import ConfigPanel from './focus-area-components/ConfigPanel'

window.onload = function() {
  document.getElementById('tonkin-pixi-root').appendChild(tonkinApplication.view);
  ReactDOM.render(<ConfigPanel />, document.getElementById('config-panel'));
}
