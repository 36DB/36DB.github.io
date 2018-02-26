import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ui from '../../controller/ui';

import Menu from '../menu/Menu';
import Home from '../home/Home';
import DollDict from '../doll/DollDict';
import FairyDict from '../fairy/FairyDict';
import EquipDict from '../equipment/EquipDict';
import Calculator from '../calculator/Calculator';
import SdSimulator from '../sdsim/SdSimulator';
import About from '../about/About';

import './style/App.css';
import './style/common.css';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.resize = this.resize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  resize() {
    this.props.onWindowResize();
  }
  
  render() {
    return (
      <Router>
        <div className="wrapper">
          <Menu />
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route path="/doll" component={DollDict} />
            <Route path="/fairy" component={FairyDict} />
            <Route path="/equip" component={EquipDict} />
            <Route path="/calculator" component={Calculator} />
            <Route path="/sdsim" component={SdSimulator} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

let dispatchToProps = (dispatch) => {
  return {
    onWindowResize: () => dispatch(ui.resize()),
  };
}

App = connect(undefined, dispatchToProps)(App);

export default App;