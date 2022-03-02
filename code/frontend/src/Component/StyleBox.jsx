import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HelloWorld from './HelloWorld'
// import AuthenticationService from './AuthenticationService.js'
import LoginComponent from './LoginComponent'
import NewLogin from './NewLogin'
import Logout from './Logout'


class StyleBox extends Component {
    render() {
        return (
            <div className="StyleBox">
                <Router>
                    <>
                        {/* <HeaderComponent/> */}
                        <Switch>
                            <Route path="/index" exact component={HelloWorld}/>
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/newlogin" component={NewLogin}/>
                            <Route path="/user/logout" component={Logout}/>
                            {/* <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/> */}
                            {/* <Route component={ErrorComponent}/> */}
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