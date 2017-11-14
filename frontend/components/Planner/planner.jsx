import React, { Component } from 'react';
import style from './planner.scss';
var axios = require('axios');

class Planner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days_largest: 0,
      days_plan: [{ days_key: 0 }],
    };
  }

  addDays() {
    let temp = this.state.days_plan.slice();
    temp.push({ days_key: this.state.days_largest + 1 });
    this.setState({
      days_largest: this.state.days_largest + 1,
      days_plan: temp,
    }, () => {
    })
    //TODO Insert API
  }

  remove_day(index) {
    let temp = this.state.days_plan.slice();
    // console.log(temp);
    temp = temp.filter((val) => {return val.days_key != index });
    // console.log(temp);
    this.setState({
      days_plan: temp,
    }, () => {
    })
    //TODO Remove API
  }

  componentDidMount() {

  }

  render() {
    return (
      <div class="ui raised segments">
        {this.state.days_plan.map((val, ind) => {
          return (
            <DaysComponents key={this.state.days_plan[ind].days_key} number={this.state.days_plan[ind].days_key} day_index={ind} deletefunc={(index) => this.remove_day(index)} />
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
    this.state = {
      day: ' ',
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onClickHandler() {
    this.props.deletefunc(this.props.number);
  }

  onChangeHandler(event) {
    this.setState({
      day: event.target.value,
    }, () => {
      console.log(this.state.day);
    })
  }

  render() {
    return (
      <div class="ui segment">Day {this.props.day_index + 1}
        <div class="ui input">
          <input type="text" value={this.state.day} onChange={this.onChangeHandler} />
          <button class="ui mini circular button" role="button" onClick={() => this.onClickHandler()}> - </button>
        </div>
      </div>

    );
  }
}

export default Planner;