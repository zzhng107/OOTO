import React, { Component } from 'react';
import style from './planner.scss';
var axios = require('axios');

class Planner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days_largest: 0,
      days_plan: [],
    };
  }

  addDays() {
    let temp = this.state.days_plan.slice();
    temp.push({ days_key: this.state.days_largest + 1, days_text: ""});
    this.setState({
      days_largest: this.state.days_largest + 1,
      days_plan: temp,
    }, () => {
      axios.get(`http://fa17-cs411-29.cs.illinois.edu/api/trip/insert/?userId=admin&tripId=${this.state.days_largest}`)
      .then({
      })
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
      axios.get(`http://fa17-cs411-29.cs.illinois.edu/api/trip/delete/?userId=admin&tripId=${index}`)
    })
    //TODO Remove API
  }

  updateInput(index, oneplan){
    let temp = this.state.days_plan.slice();
    temp.map((val) =>{
      if(val.days_key == index){
        val.days_text = oneplan;
        return val;
      }else{
        return val;
      }
    })
    this.setState({
      days_plan: temp,
    },()=>{
      axios.get(`http://fa17-cs411-29.cs.illinois.edu/api/trip/update/?userId=admin&tripId=${index}&business_name=${oneplan}`)
    })
  }

  componentDidMount() {
    axios.get(`http://fa17-cs411-29.cs.illinois.edu/api/trip/query/?userId=admin`)
    .then((response)=>{
      // let response_ = '[{days_key: 1, days_text: "hello"}]';
      // let temp = JSON.parse(response_);
      let temp = response;
      console.log(response);
      this.setState({
        days_plan: temp,
        days_largest: temp[temp.length-1].tripId,
      })
    })
  }

  render() {
    return (
      <div class="ui raised segments">
        {this.state.days_plan.map((val, ind) => {
          return (
            <DaysComponents key={val.days_key} number={val.days_key} day_index={ind} plantext={val.days_text} deletefunc={(index) => this.remove_day(index)} inputupdatefunc={(index, oneplan) => this.updateInput(index, oneplan)}/>
          )
        })}
        <div class="ui segment">
          <div id="control_button">
            <button class="ui grey button" role="button" onClick={() => this.addDays()}> + </button>
          </div>
        </div>
      </div>
    );
  }
}

class DaysComponents extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onClickHandler() {
    this.props.deletefunc(this.props.number);
  }

  onChangeHandler(event) {
    this.props.inputupdatefunc(this.props.number, event.target.value);
  }

  render() {
    return (
      <div class="ui segment">Day {this.props.day_index + 1}
        <div class="ui input">
          <input type="text" value={this.props.plantext} onChange={this.onChangeHandler} />
          <button class="ui mini circular button" role="button" onClick={() => this.onClickHandler()}> - </button>
        </div>
      </div>

    );
  }
}

export default Planner;