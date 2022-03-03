import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthenticationService from '../api/styleBox/AuthenticationService';
import cookie from 'react-cookies'
import validator from 'validator'

class LoginCompnent extends Component{
    constructor(props){
        super(props)
        this.state={
            // login 参数
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            pswMessage: 'Need strong password: length > 7, at least 1 lowercase, uppercase, number and symbol',
            showPassword: true
        }

        // bind 方法
        this.checkPassword = this.checkPassword.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
        this.hidePassword = this.hidePassword.bind(this)

    }

    checkPassword(psw){
        if (validator.isStrongPassword(psw, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1})){
            this.setState({pswMessage: 'Strong password !'})
        }
        else{
            this.setState({pswMessage: 'Weak password: need length > 7, at least 1 lowercase, uppercase, number and symbol'})
        }
    }

    // 根据输入更改变量值
    handleChange(event) {
        if (event.target.name === "password"){
            this.checkPassword(event.target.value)
        }
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    hidePassword(event){
        if(event.target.checked === true){
            this.setState({showPassword: false})
        }
        else{
            this.setState({showPassword: true})
        }
    }

    // submit btn function, 调用login method in AuthenticationService.js
    loginClicked(event) {
        console.log('Send username ' + this.state.username + 'password ' + this.state.password)


        AuthenticationService
        .executeJwtAuthenticationService(this.state.username, this.state.password)
        .then((response) => {
            // 处理前端返回的结果
            if (response.status === 200) {
                alert('Login successful !')
                console.log('login successfully with username' + this.state.username + ' and password ' + this.state.password)
                AuthenticationService.loginSuccessfulRegister(cookie.load)
                this.props.history.push(`/user/profile`, this.state.username)
            }

        })
        .catch((error) => {
            console.log(error.response.data)
            alert(error.response.data.displayMessage)
            this.setState({showSuccessMessage: false})
            this.setState({hasLoginFailed: true})
        })
        event.preventDefault();
    }


    render(){
        return(
            <div className='container'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light my-3">
                    <a className="navbar-brand" href="#">StyleBox</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Stylist </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Shopping</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Community</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Login</a>
                            </li>
                        </ul>

                    </div>
                </nav>

                <div className="alert alert-primary w-50" role="alert">

                    <form>
                        <h1 className='my-3'>Login <span class="badge badge-secondary"></span></h1>

                    <form onSubmit={this.loginClicked}>
                        <h1 className='my-3'>Login <span className="badge badge-secondary"></span></h1>
                        <div className='row mt-5'>
                            <label htmlFor="inputAccount" className='col-sm-2 col-form-label'>Account: </label>
                            <div className='col-sm-10'>
                                <input type="text" className='form-control' name='username' placeholder='Enter Email or UserName Here' value={this.state.username} onChange={this.handleChange}/>
                            </div>
                        </div>

                        <div className='row my-3'>
                            <label htmlFor="inputPassword" className='col-sm-2 col-form-label'>Password: </label>
                            <div className='col-sm-8'>
                                <input type={this.state.showPassword?'text':'password'} className='form-control' name='password' placeholder='Enter Password Here' value={this.state.password} onChange={this.handleChange}/>
                            </div>
                            <div className='form-check col-sm-2'>
                                <input type="checkbox" className='form-check-input' name='hiddenbox'onClick={this.hidePassword}/>
                                <label className='form-check-label' htmlFor='hiddenbox'>
                                    Hidden
                                </label>
                            </div>
                        </div>
                        <p style={{fontWeight: 'bold', color: 'red'}}>{this.state.pswMessage}</p>
                        <button type='submit' className='btn btn-primary my-3' onClick={this.loginClicked}>Login</button>

                    </form>
                </div>
            </div>
        )
    }
}

export default LoginCompnent