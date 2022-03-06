import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import cookie from 'react-cookies'
import Login from "./Login";
import Quiz from "./Quiz";
import HomePage from "./HomePage";
import Register from "./Register"; // 引入


const browserHistory = createBrowserHistory() // 路由分发

class BasicRouter extends Component {
    constructor(props){
        super(props)
        this.isUserLoggedIn = this.isUserLoggedIn.bind(this)
    }
    isUserLoggedIn() {
        let token = cookie.load('jwt')
        console.log(token !== undefined)
        return token !== undefined;

    }

    render () {
        const loggedIn = this.isUserLoggedIn()

        return (
            <Router history={browserHistory}>
                <Switch>
                    {
                        (!loggedIn&& window.location.pathname === '/quiz')
                            ? <Route exact path="/login" component={Login} />
                            : <Route exact path="/quiz" component={Quiz} />
                    }
                    <Route path="/" exact component={HomePage} />
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                </Switch>
            </Router>
        )
    }
}

export default BasicRouter

