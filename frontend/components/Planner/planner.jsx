import React, { Component } from 'react';
import style from './planner.scss';
var axios = require('axios');

class Planner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 1,
      days_plan: [],
    };
  }

  renderDays() {
    let days_plan_ = [];
    for (let i = 1; i <= this.state.days; i++) {
      days_plan_.push(<DaysComponents key={i} number={i} deletefunc={(index) => this.remove_day(index)} />);
    }
    this.setState({
      days_plan: days_plan_,
    })
  }

  addDays() {
    this.setState({
      days: this.state.days + 1,
    }, () => {
      this.renderDays();
    })
  }

  remove_day(index) {
    // let temp = this.state.days_plan.slice();
    // console.log(index);
    // console.log(temp.filter(function(val,ind){return ind!=index}));
    // temp = temp.filter(function(val,ind){return ind!=index});
    // console.log(temp);
    
    // console.log("inside");  
    this.setState({
      days: this.state.days - 1,
      // days_plan: temp,
    }, () => {
      this.renderDays();
    })
  }

  componentDidMount() {
    this.renderDays();
  }

  render() {
    return (
      <div class="ui raised segments">
        {this.state.days_plan}
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
    this.props.deletefunc(this.props.number);
  }

  render() {
    return (
      <div class="ui segment">Day {this.props.number}
        <div class="ui input">
          <input type="text" />
        </div>
        <button class="ui mini circular button" role="button" onClick={() => this.onClickHandler()}> - </button>
      </div>
    );
  }
}


export default Planner;