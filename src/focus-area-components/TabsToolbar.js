import { Icon } from '@blueprintjs/core'
import React from 'react'
import '../styles/TabsToolbar.css'

const tileTabs = {
  playTile: [
    {
      icon: "layer",
      title: "Play"
    },
    {
      icon: "new-object",
      title: "New Game"
    }
  ],
  watchTile: [
    {
      icon: "chat",
      title: "Chat"
    },
    {
      icon: "search-template",
      title: "Find"
    },
    {
      icon: "help",
      title: "Support"
    }
  ]
};

export default class TabsToolbar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="tabs-toolbar-container">
      {
        tileTabs[this.props.tileId].map((tabData) => (
          <section
              key = { this.props.tileId + "." + tabData.title}
              style = {{
                display: "inline-block",
                margin: "0px 10px"
              }}>
            <Icon icon={tabData.icon} />
            <span>{tabData.title}</span>
          </section>
        ))
      }
      </div>
    );
  }
}
