import  { BrowserRouter as Router, Route } from 'react-router-dom'
import AllList from "./AllList";
import Homes from './Homes';
import {Navs} from './Navs';
import './App.css';

function App() {
  return (
    <Router>
    <Navs></Navs>
     <Route exact path ={'/'} component={Homes}/>
     <Route exact path ={'/Home'} component={Homes}/>
     <Route exact path ={'/Wishlist'} component={AllList}/>
   </Router>
  );
}

export default App;
