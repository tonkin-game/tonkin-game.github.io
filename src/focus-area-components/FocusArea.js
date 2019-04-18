import { Icon } from '@blueprintjs/core'
import { Mosaic, MosaicWindow } from 'react-mosaic-component'
import React from 'react'
import TabsToolbar from './TabsToolbar'

import '@blueprintjs/core/lib/css/blueprint.css'
import 'react-mosaic-component/react-mosaic-component.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

export default class FocusArea extends React.Component {

  constructor(props) {
    super(props);
    this.renderTile = this.renderTile.bind(this);
  }

  renderTile(id, path) {
    return (
      <MosaicWindow
        path={path}
        renderToolbar={() => (
          <div className="tabs-toolbar-wrapper">
            <TabsToolbar tileId={id} />
          </div>
        )}
        title={'notitle'}>
        <div>Hello world</div>
      </MosaicWindow>
    );
  }

  render() {
    return (
      <Mosaic
        id="app"
        className="mosaic-blueprint-theme"
        initialValue = {{
          direction: 'column',
          first: 'playTile',
          second: 'watchTile'
        }}
        renderTile = {this.renderTile}
      />
    );
  }

}
