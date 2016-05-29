////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render a tab for each country with its name in the tab
// - Make it so that you can click on a tab and it will appear active
//   while the others appear inactive
// - Make it so the panel renders the correct content for the selected tab
//
// Got extra time?
//
// - Make <Tabs> generic so that it doesn't know anything about
//   country data (Hint: good propTypes help)
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'

const styles = {}

styles.tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
}

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: '#000'
}

styles.panel = {
  padding: 10
}

const Tab = React.createClass({
  propTypes: {
    tabIndex: React.PropTypes.number.isRequired,
    onActive: React.PropTypes.func
  },

  handleClick() {
    if(this.props.onActive)
      this.props.onActive(this.props.tabIndex)
  },

  tabStyle() {
    if(this.props.isActive)
      return styles.activeTab
    else
      return styles.tab
  },

  render() {
    return (
      <div className="Tab" style={this.tabStyle()} onClick={this.handleClick}>
      Active
      </div>
    )
  }
})

const Tabs = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      activeTabIndex: 0
    }
  },

  handleActive(activeTabIndex) {
    console.log('On Active')
    this.setState({activeTabIndex: activeTabIndex})
  },

  renderTabs() {
    const countries = this.props.data.map(country => <li>{country.name}</li>)
    const tabs = this.props.data.map((country, index) => {
      return <Tab onActive={tabIndex => this.handleActive(tabIndex)} tabIndex={index} isActive={this.state.activeTabIndex == index} />
    })

    return (
      <div className="Tabs">
        <div className="TabPanel" style={styles.panel}>
          {tabs}
          <ul>
            {countries}
          </ul>
        </div>
      </div>
    )
  },

  render() {
    return this.renderTabs()
  }
})

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={this.props.countries}/>
      </div>
    )
  }
})

const DATA = [
  { id: 1, name: 'USA', description: 'Land of the Free, Home of the brave' },
  { id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival' },
  { id: 3, name: 'Russia', description: 'World Cup 2018!' }
]

render(<App countries={DATA}/>, document.getElementById('app'), function () {
  require('./tests').run(this)
})
