import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HelloWorld from './Component/HelloWorld'
import LoginComponent from './Component/LoginComponent'

class StyleBox extends Component {
    render(){
        return (
            <div className='StyleBox'>
                <Router>
                    <>
                        <Switch>
                            <Route path="/" exact component={HelloWorld} />
                            <Route path="/login" component={LoginComponent}/>
                        </Switch>
                    </>
                </Router>

            </div>
        )
    }
}

export default StyleBox