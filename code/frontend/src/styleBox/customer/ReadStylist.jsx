import React, {Component} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "styleBox/navBar_footer/Footer.jsx";
import StylistProfileBrowse from "components/testimonials/StylistProfileBrowse.js"
import StylistProfilePastDesign from "components/testimonials/StylistProfileTwoColumnWithImageAndProfilePictureReview.js"
import CustomerBrowseStylistService from "api/styleBox/CustomerBrowseStylistService";
import PastDesign1 from "../../images/StylistProfile_pastdesign1.png"
import PastDesign2 from "../../images/StylistProfile_pastdesign2.png"
import NavBarCustomer from "../navBar_footer/NavBarCustomer";
import { PrimaryButton as PrimaryButtonBase} from "components/misc/Buttons.js";
import tw from "twin.macro";
import styled from "styled-components";


const PrimaryButton = styled(PrimaryButtonBase)(props => [
  tw`w-56 mx-8 mt-10 mt-8 md:mt-8 text-sm inline-block bg-pink-500 hover:bg-pink-400`,
  props.buttonRounded && tw`rounded-full`
]);

class ReadStylist extends Component{
  constructor(props){
    super(props)

    this.state = {
      testimonials: [{
        nickname: "Charlotte",
        photo:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80",
        intro:
          "Charlotte Hale is an 3-year experienced stylist, who is proficient at casual style and using details to highlight personal characteristics. ",
        gender: "Female",
        style: ["Casual", "Business"],
        age: 23,
        userName: "Charlotte Hale",
        email:"Charlotte@stylebox.com",
        facebook:"Charlotte_Stylist",
        rate: 5,
        followerNum: 9000,
        likeNum: 3000,
        stylistId: 1,
        isFollow: false
      }],
      display: [{image: "", idea: ""}],
      stylistId: 1,
      button: "Follow"
    }

    this.changeFollowState = this.changeFollowState.bind(this)
    this.createOrder = this.createOrder.bind(this)

  }

  componentDidMount(){
    CustomerBrowseStylistService.getHomepage(this.state.stylistId)
    .then(response=>{this.setState({
      testimonials: [{
        nickname: response.data.nickname,
        photo: response.data.photo,
        intro: response.data.intro,
        gender: response.data.gender,
        style: response.data.style,
        age: response.data.age,
        userName: response.data.username,
        email:response.data.email,
        facebook: response.data.facebook,
        rate: response.data.rate,
        followerNum: response.data.followerNum,
        likeNum: response.data.likeNum,
        stylistId: response.data.stylistId,
        isFollow: response.data.isFollow
      }],
      display: response.data.display,
    }
    ); 
    if (response.data.isFollow){
      this.setState({
        button : "Unfollow"
      })
    }else{
      this.setState({
        button : "Follow"
      })
    };
    })
    .catch(error => console.log(error.response))
  }



  changeFollowState(){
    if (this.state.testimonials[0].isFollow){
      CustomerBrowseStylistService.followStylist(this.state.testimonials[0].stylistId)
      .then(response=>{
        this.state.testimonials[0].isFollow = false;
        this.setState({
          button : "Follow"
        });
      })
      .catch(error => console.log(error.response))
    }else{
      CustomerBrowseStylistService.unfollowStylist(this.state.testimonials[0].stylistId)
      .then( response=>{
        this.state.testimonials[0].isFollow = true;
        this.setState({
          button : "Unfollow",
        });
      })
      .catch(error => console.log(error.response))
    }
    console.log(this.state.testimonials[0].isFollow)
  }


  createOrder(){
    this.props.history.push({
      pathname:'/order',
      state: {
        stylistId: this.state.testimonials[0].stylistId,
        nickname: this.state.testimonials[0].nickname
      }
    });
  }


  render() {
    console.log("stylistID:"+this.state.testimonials[0].stylistId)
    return(
      <AnimationRevealPage>
        <NavBarCustomer />
        <StylistProfileBrowse testimonials={this.state.testimonials}/>
        <div align="center">
          <PrimaryButton className="mx-8 ..." buttonRounded={true} as="a" onClick={this.changeFollowState}>{this.state.button}</PrimaryButton>
          <PrimaryButton buttonRounded={true} as="a" onClick={this.createOrder}>{"Create an Order"}</PrimaryButton>
        </div>
        <StylistProfilePastDesign display={this.state.display===null?[{image: PastDesign1, idea: "sample idea"}]: this.state.display}/>
        <Footer />
      </AnimationRevealPage>
    )
  }
}

export default ReadStylist
