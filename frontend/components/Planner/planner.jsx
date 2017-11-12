import React, { Component } from 'react';
import style from './planner.scss';
var axios = require('axios');

class Planner extends React.Component {
  render() {
    return (
      <div class="ui raised segments">
        <div class="ui segment">Day 1
          <div class="ui input">
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        <div class="ui segment">Day 2
          <div class="ui input">
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        <div class="ui segment">Day 3
          <div class="ui input">
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </div>
    );
  }
}
export default Planner;