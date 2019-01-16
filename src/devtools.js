import React, { Component } from 'react';
import { render } from 'react-dom';
import TreeComponent from './components/TreeComponent'
import Button from './components/Button'


class App extends Component {
  constructor() {
    super();
    this.state = {
      button1counter: 0,
      button2counter: 0
    }

    this.clicked = this.clicked.bind(this)
    chrome.devtools.panels.create("React Quantum", null, "devtools.html");
  }
  clicked(e) {
    let counterId = `${e.target.id}counter`
    let counter = this.state[counterId] + 1

    let updateCounter = {}
    updateCounter[counterId] = counter
    this.setState(updateCounter)
  }
  componentDidMount() {
    console.log("Component DID IN FACT mount")
    let port = chrome.runtime.connect({ name: 'dev-bg' });
    port.postMessage({
      name: 'devtool',
      tabId: chrome.devtools.inspectedWindow.tabId
    });
    port.onMessage.addListener(message => {
      console.log("from devtools", message)
    })
  }
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <Button id={'button1'} clicked={this.clicked} counter={this.state.button1counter}></Button>
        <Button id={'button2'} clicked={this.clicked} counter={this.state.button2counter}></Button>
        <TreeComponent></TreeComponent>
      </div>

    )
  }
}

render(<App />, document.getElementById('root'));
