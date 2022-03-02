import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
// import HelloWorld from "./Component/HelloWorld"
// import Login from './Component/LoginComponent';
import StyleBox from './Component/StyleBox';
import { CookiesProvider } from "react-cookie";


class App extends Component {
  render() {
  return (
    <CookiesProvider>
      <div className="App"><StyleBox/></div>
      
      </CookiesProvider>
        
  );
  }
}

export default App;
