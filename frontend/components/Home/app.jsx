import React, {Component} from 'react';
import Planner from '../Planner/planner.jsx';
import style from './app.scss';

class App extends React.Component {
   render() {
      return (
         <div>
            <div id='planner'>
                <Planner/>
            </div>
         </div>
      );
   }
}
export default App;