import { Mosaic, MosaicWindow } from 'react-mosaic-component'
import React from 'react'


import '@blueprintjs/core/lib/css/blueprint.css'
import 'react-mosaic-component/react-mosaic-component.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

export default class ConfigPanel extends React.Component {

  render() {
    return (
      <Mosaic
        id="app"
        className="mosaic-blueprint-theme"
        initialValue = {{
          direction: 'column',
          first: 'a',
          second: 'b'
        }}
        renderTile = {(id, path) => {
            return (
              <MosaicWindow
                createNode={() => 'a'}
                path={path}
                title={'notitle'}>
                <div>Hello world</div>
              </MosaicWindow>
          );
        }}
      />
    );
  }

}
