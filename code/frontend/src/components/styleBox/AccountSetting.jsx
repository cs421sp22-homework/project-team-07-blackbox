import React, {Component} from 'react'
import QuizForm from "./QuizForm";
import "../../styles/tailwind.min.css"
import tw from 'twin.macro'


class AccountSetting extends Component{
    constructor(props) {
        super(props)

        this.state={
            // account information
           username："Choral"，
           email:"Choral@gmail.com",
           phone:"4423455645",
           address:"3501 Saint Paul Street",
           payment:"34131242",
           facebook:"Choralove"，
           nickname："Chorl",
           edit = false

        }
    }

    clickedit(){
        if(this.edit==false){
            this.setState({edit:true});
        }
    }

    changeEmail(e){
        let email = e.target.value;
        this.setState({
            email:email
        })
    }

    changePhone(e){
        let phone = e.target.value;
        this.setState({
            phone:phone
        })
    }

    changeAddress(e){
        let address = e.target.value;
        this.setState({
            address:address
        })
    }

    changePayment(e){
        let payment = e.target.value;
        this.setState({
            payment:payment
        })
    }

    changeFacebook(e){
        let facebook = e.target.value;
        this.setState({
            facebook:facebook
        })
    }

    changeNickname(e){
        let nickname = e.target.value;
        this.setState({
            nickname:nickname
        })
    }
    submitInfo(){
        let info = {email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            payment: this.state.payment,
            facebook: this.state.facebook,
            nickname: this.state.nickname,

        }
        this.setState({edit:false})
        AccountSettingService.modifyAccount(info)
        this.redirect();
    }

    AccountSettingService.getHomepage({
    .then(response=>this.setState({
        username: response.data.username,
        address: response.data.address,
        phone: response.data.phone,
        address: response.data.address,
        payment: response.data.payment,
        facebook: response.data.facebook,
        nickname: response.data.nickname,

    }))
    .catch(error => console.log(error.response))
    }



    render() {
        return (
            <QuizForm>
                <span>
                    {this.state.edit == false &&
                    <form>
                        <div className=" grid grid-cols-2 gap-1">
                            <label>Username:</label>
                            <div className="grid grid-cols-2">
                                <text >{this.state.username}</text>
                            </div>

                            <label>Phone:</label>
                            <div className="grid grid-cols-2">
                                <text >{this.state.phone}</text>
                            </div>
                            <label>Email:</label>
                            <div className="grid grid-cols-2">
                                <text >{this.state.email}</text>
                            </div>
                            <label>Shipping Address:</label>
                            <div className="grid grid-cols-2">
                                <text >{this.state.address}</text>
                            </div>
                            <label>Payment Information:</label>
                            <div className="grid grid-cols-2">
                                <text >{this.state.payment}</text>
                            </div>
                            <label>Facebook:</label>
                            <div className="grid grid-cols-2">
                                <text >{this.state.facebook}</text>
                            </div>
                            <label>Nickname:</label>
                            <div className="grid grid-cols-2">
                                <text >{this.state.nickname}</text>
                            </div>
                            <button onClick={this.clickedit}>Edit</button>
                        </div>
                    </form>
                    }

                    {this.state.edit == true &&
                    <form>
                        <div className=" grid grid-cols-2 gap-1">
                            <label>Username:</label>
                            <div className="grid grid-cols-2">
                                <text >{this.state.username}</text>
                            </div>
                            <label>Phone:</label>
                            <div className="grid grid-cols-2">
                                <input type="text" value={this.state.phone} onChange = {this.changePhone}/>
                            </div>
                            <label>Email:</label>
                            <div className="grid grid-cols-2">
                                <input type="text" value={this.state.email} onChange = {this.changeEmail}/>
                            </div>
                            <label>Shipping Address:</label>
                            <div className="grid grid-cols-2">
                                <input type="text" value={this.state.address} onChange = {this.changeAddress}/>
                            </div>
                            <label>Payment Information:</label>
                            <div className="grid grid-cols-2">
                                <input type="text" value={this.state.payment} onChange = {this.changePayment}/>
                            </div>
                            <label>Facebook:</label>
                            <div className="grid grid-cols-2">
                                <input type="text" value={this.state.facebook} onChange = {this.changeFacebook}/>
                            </div>
                            <label>Nickname:</label>
                            <div className="grid grid-cols-2">
                                <input type="text" value={this.state.nickname} onChange = {this.changeNickname}/>
                            </div>
                            <button onClick={this.submitInfo}>Submit</button>
                        </div>
                    </form>
                    }


                </span>

            </QuizForm>
        )
    }
}

export default AccountSetting