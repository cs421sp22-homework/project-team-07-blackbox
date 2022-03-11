import React, {Component} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";

import AuthenticationService from '../../api/styleBox/AuthenticationService';
import cookie from 'react-cookies'
import validator from 'validator'
import NavBar from "../navBar_footer/NavBar";

const Container = tw(ContainerBase)`min-h-screen bg-pink-900 text-white font-medium flex justify-center m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;


const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-pink-500 text-gray-100 w-full py-4 rounded-lg hover:bg-pink-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

class Login extends Component {
  // -----------------Constructor--------------------
  constructor(props){
    super(props)

    this.state = {
        // Register 参数
        username: '',
        email: '',
        password: '',
        role: 0,
        emailMessage: 'Enter your email in xxx@xxx form',
        pswMessage: 'Need strong password: length > 7, at least 1 lowercase, uppercase, number and symbol'
    }
    // function part
    this.checkPassword = this.checkPassword.bind(this)
    this.checkEmail = this.checkEmail.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.registerClicked = this.registerClicked.bind(this)
  }

  // -----------------Functions--------------------
  
  checkEmail(myEmail){
    if(!validator.isEmail(myEmail)){
        this.setState({emailMessage: 'Invalid email !'})
    }
    else{
        this.setState({emailMessage: 'Valid email !'})
    }
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

    handleChange(event) {
        if (event.target.name === "password"){
            this.checkPassword(event.target.value)
        }
        
        if(event.target.name === "email"){
            this.checkEmail(event.target.value)
        }
        
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    registerClicked(event) {
        if(this.state.emailMessage !=='Valid email !' || this.state.pswMessage !== 'Strong password !'){
            alert('Please change your info: not valid user information!')
        }
        else{
            AuthenticationService
            .registerUtil(this.state.username, this.state.email, this.state.password, this.state.role)
            .then((response) => {
                // 处理前端返回的结果
                if (response.status === 200) {
                    alert('Register successful, automatic login !')
                    console.log('register successfully with username' + this.state.username + ' and password ' + this.state.password)
                    AuthenticationService.loginSuccessfulRegister(cookie.load)
                    this.props.history.push(`/stylist/profile`)
                }            
            })
            .catch((error) => {
                alert(error.response.data.displayMessage)
            })
        } 
        event.preventDefault();
    }
  
  // -----------------Render--------------------
  render(){
    return(
      <AnimationRevealPage>
          <NavBar/>
        <Container>
          <Content>
            <MainContainer>
              <MainContent>
                <Heading>{"Register"}</Heading>
                <FormContainer>
                  <Form>
                    <Input type="text" name='username' placeholder='Enter UserName Here' value={this.state.username} onChange={this.handleChange}/>
                    <Input type='text' name='email' placeholder='Enter Email Here' value={this.state.email} onChange={this.handleChange} />
                    <p tw="mt-2 text-sm text-orange-700">{this.state.emailMessage}</p>
                    <Input type="text" name='password' placeholder='Enter Password Here' value={this.state.password} onChange={this.handleChange}/>
                    <p tw="my-2 text-sm text-orange-700">{this.state.pswMessage}</p>
                    <div tw="grid grid-cols-2">
                        <div>
                            <p tw="my-2 text-sm text-black">Select register role: </p>
                        </div>
                        <div>
                            <select tw="mx-2 my-2 rounded-full" name="role" value={this.state.role} onChange={this.handleChange}>
                                <option value="0"> Customer </option>
                                <option value="1"> Stylist </option>
                            </select>
                        </div>
                    </div>
                    <SubmitButton type="submit" onClick={this.registerClicked}> Register </SubmitButton>
                  </Form>
                </FormContainer>
              </MainContent>
            </MainContainer>
          </Content>
        </Container>
      </AnimationRevealPage>
    )
  }

  


}

export default Login


