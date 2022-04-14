import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: "1",
      seconds: "30",
      percent: "50",
      calculatedValue: ""
    }
  }

  componentDidMount = () => {
    this.recalculate();
  }

  minutesChanged = evnt => {
    this.setState({
      minutes: evnt.target.value.slice(-2)
    }, this.recalculate);
  }

  secondsChanged = evnt => {
    this.setState({
      seconds: evnt.target.value.slice(-2)
    }, this.recalculate);
  }

  percentChanged = evnt => {
    this.setState({
      percent: evnt.target.value
    }, this.recalculate);
  }

  recalculate = () => {
    const min = parseInt(this.state.minutes);
    const sec = parseInt(this.state.seconds);
    const per = parseInt(this.state.percent);
    if (isNaN(min) || isNaN(sec) || isNaN(per)) return;
    const totalSeconds = min*60 + sec;
    const actualTotSec = Math.round(totalSeconds * per / 100);
    const actualMin = Math.floor(actualTotSec / 60);
    const actualSec = actualTotSec % 60;

    const secString = (actualSec < 10) ? "0" + actualSec : actualSec;

    this.setState({
      calculatedValue: actualMin + ":" + secString
    });
  }

  render() {
      return (<div className="App">
        <header className="App-header">
          <h1>Timer</h1>

          <label>Minutes:</label>
          <input id="minutes" type="number" min="0" max="59" value={this.state.minutes} onChange={this.minutesChanged} />
          <br />
          <label>Seconds:</label>
          <input id="seconds" type="number" min="0" max="59" value={this.state.seconds} onChange={this.secondsChanged} />
          <br />
          <label>Percent:</label>
          <input id="percent" type="number" min="0" max="100" value={this.state.percent} onChange={this.percentChanged} />

          <br />
          <label>Calculated Value: {this.state.calculatedValue}</label>

          </header>
        </div>
    );
  }
}

export default App;
