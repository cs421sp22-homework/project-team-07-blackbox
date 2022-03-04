import React, {Component} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import logo from "images/logo.svg";

import AuthenticationService from '../../api/styleBox/AuthenticationService';
import cookie from 'react-cookies'
import validator from 'validator'

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
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
                    this.props.history.push(`/user/profile`, this.state.username)
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


