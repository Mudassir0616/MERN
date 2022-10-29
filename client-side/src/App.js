import React, { useEffect } from 'react'
import { AppBar, Container, Grid, Grow, Typography } from '@mui/material'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './styles.css'
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Auth from './components/authtorization/Auth.jsx';


function App() {
  
  return (
    <BrowserRouter>
    <div className="App">
      <Container maxWidth='lg'>
        <Navbar/>
        {/* <Auth/> */}
        <Switch>
          <Route path={'/'} exact component={Home}/>
          <Route path={'/auth'} exact component={Auth}/>
        </Switch>
        
      </Container>
    </div>
    </BrowserRouter>
  );
}

export default App;
