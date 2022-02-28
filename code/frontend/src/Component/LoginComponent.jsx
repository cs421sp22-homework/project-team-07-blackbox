import React, {Component} from 'react';
import LoginService from '../api/styleBox/LoginService';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
    }

    componentDidMount(){
        LoginService.executeLoginService()
            .then(response=>this.setState({info: response.data}))
            .catch(error => console.log(error.response))
    }

    render(){
        return(
            <div className='container'>
                <nav class="navbar navbar-expand-lg navbar-light bg-light my-3">
                    <a class="navbar-brand" href="#">StyleBox</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Stylist </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Shopping</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Community</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Login</a>
                            </li>
                        </ul>
                        
                    </div>
                </nav>

                <div class="alert alert-primary w-50" role="alert">
                
                    <form> 
                        <h1 className='my-3'>Login <span class="badge badge-secondary"></span></h1>
                        <div className='row mt-5'>
                            <label htmlFor="inputAccount" className='col-sm-2 col-form-label'>Account: </label>
                            <div className='col-sm-10'>
                                <input type="text" className='form-control' name='username' placeholder='Enter Email or UserName Here' />
                            </div>
                        </div>

                        <div className='row my-3'>
                            <label htmlFor="inputPassword" className='col-sm-2 col-form-label'>Password: </label>
                            <div className='col-sm-8'>
                                <input type="text" className='form-control' name='password' placeholder='Enter Password Here' />
                            </div>
                            <div className='form-check col-sm-2'>
                                <input type="checkbox" className='form-check-input' id = 'hiddenbox'/>
                                <label className='form-check-label' htmlFor='hiddenbox'>
                                    Hidden
                                </label>
                            </div>
                        </div>
                            <button type='submit' className='btn btn-primary my-3'>Login</button>

                    </form>
                </div>
            </div>
        )
    }
}

export default Login