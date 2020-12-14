import logo from './logo.svg';
import './Style/App.scss';
import './Style/Button.scss';
import './Style/Dropdown.scss';

import {Route,  BrowserRouter } from 'react-router-dom';
import Navbar  from './Components/Navbar';
import Fractal from './Components/Fractal';


  const container = {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
  }

function App() {
  return (  
    <div className="App">
        

  <BrowserRouter>
    <Navbar />
    <Route path="/fractal_drawer" component={Fractal} />
  </BrowserRouter>
   
    </div>
  );
}

export default App;
