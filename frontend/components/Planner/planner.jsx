import React, { Component } from 'react';
import style from './planner.scss';
var axios = require('axios');

class Planner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 1,
      days_largest: 0,
      days_plan: [<DaysComponents key={0} number={0} deletefunc={(index) => this.remove_day(index)} />],
    };
  }

  // renderDays() {
  //   let days_plan_ = [];
  //   for (let i = 1; i <= this.state.days; i++) {
  //     days_plan_.push(<DaysComponents key={days_largest+1} number={days_largest+1} deletefunc={(index) => this.remove_day(index)} />);
  //   }
  //   this.setState({
  //     days_largest: this.state.days_largest+1,
  //     days_plan: days_plan_,
  //   })
  // }

  addDays() {
    let temp = this.state.days_plan.slice();
    temp.push(

      <DaysComponents key={this.state.days_largest + 1} number={this.state.days_largest + 1} deletefunc={(index) => this.remove_day(index)} />
    );
    this.setState({
      days_largest: this.state.days_largest + 1,
      days_plan: temp,
    }, () => {

    })
  }

  remove_day(index) {
    let temp = this.state.days_plan.slice();
    temp = temp.filter((val) => { console.log(val); return val.props.number != index });
    this.setState({
      days_plan: temp,
    }, () => {
      // this.renderDays();
    })
  }

  componentDidMount() {
    // this.renderDays();
  }

  render() {
    return (
      <div class="ui raised segments">
        {this.state.days_plan.map((val, ind) => {
          return (
            <div class="ui segment">Day {ind}
              {val}
            </div>
          )
        })}
        <div class="ui segment">
          <div id="control_button">
            <button class="ui grey button" role="button" onClick={() => this.addDays()}> + </button>
            <button class="ui primary button" role="button"> Save </button>
          </div>
        </div>
      </div>
    );
  }
}

class DaysComponents extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickHandler() {
    console.log(Math.random() * 1000);
    this.props.deletefunc(this.props.number);
  }

  render() {
    return (
      <div class="ui input">
        <input type="text" />
        <button class="ui mini circular button" role="button" onClick={() => this.onClickHandler()}> - </button>
      </div>
    );
  }
}

export default Planner;