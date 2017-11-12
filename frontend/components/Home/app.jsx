import React, {Component} from 'react';
import Planner from '../Planner/planner.jsx';
import Gmap from '../Map/map.jsx';
import style from './app.scss';

class App extends React.Component {
   render() {
      return (
         <div>
            <div id='planner'>
                <Planner/>
            </div>

            {/* <div id='map'>
                <Gmap/>
            </div> */}
         </div>
      );
   }
}
export default App;