import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class NewLogin extends Component{
    constructor(props){
        super(props)
        this.state={
            // login 参数
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        // bind 方法
        // this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)

    }

    // handleChange(event) {
    //     this.setState(
    //         {
    //             [event.target.name]
    //                 : event.target.value
    //         }
    //     )
    // }

    loginClicked(){

    }

    render(){
        return(
            <div className="alert alert-primary w-50">
                

                        <h1 className='my-3'>Login <span className="badge badge-secondary"></span></h1>
                        <div className='row mt-5'>
                            <label htmlFor="inputAccount" className='col-sm-2 col-form-label'>Account: </label>
                            <div className='col-sm-10'>
                                <input type="text" className='form-control' name='username' placeholder='Enter Email or UserName Here' value={this.state.username} />
                            </div>
                        </div>

                        <div className='row my-3'>
                            <label htmlFor="inputPassword" className='col-sm-2 col-form-label'>Password: </label>
                            <div className='col-sm-8'>
                                <input type="text" className='form-control' name='password' placeholder='Enter Password Here' value={this.state.password} />
                            </div>
                        </div>
                            <button type='submit' className='btn btn-primary my-3' onClick={this.loginClicked}>Login</button>


                </div>
        )
    }
}

export default NewLogin