import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HelloWorld from './HelloWorld'
// import AuthenticationService from './AuthenticationService.js'
import LoginComponent from './LoginComponent'
import Homepage from './Homepage'
import AuthenticatedRoute from './AuthenticatedRoute'

class StyleBox extends Component {
    render() {
        return (
            <div className="StyleBox">
                <Router>
                    <>
                        {/* <HeaderComponent/> */}
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <AuthenticatedRoute path="/index" exact component={HelloWorld}/>
                            <AuthenticatedRoute path="/user/logout" component={Homepage}/>
                        </Switch>
                        {/* <FooterComponent/> */}
                    </>
                </Router>
                {/* <LoginComponent/>
                <Welcomecomponent/> */}
            </div>
        )
    }
}


export default StyleBox