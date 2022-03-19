import React, {Component} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "styleBox/navBar_footer/Footer.jsx";
import StylistProfileImageIntro from "components/testimonials/StylistProfileImageIntro.js"
import StylistProfilePastDesign from "components/testimonials/StylistProfileTwoColumnWithImageAndProfilePictureReview.js"
import StylistService from "api/styleBox/StylistService";
import PastDesign1 from "../../images/StylistProfile_pastdesign1.png"
import PastDesign2 from "../../images/StylistProfile_pastdesign2.png"
import NavBarCustomer from "../navBar_footer/NavBarCustomer";
import NavBarStylist from "styleBox/navBar_footer/NavBarStylist";
import NavBarAuthenticated from "../navBar_footer/NavBarAuthenticated";

class StylistProfile extends Component{
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
        likeNum: 3000
      }],
      display: [{image: "", idea: ""}]
    }
  }

  componentDidMount(){

    StylistService.getHomepage()
    .then(response=>this.setState({
      testimonials: [{
        nickname: response.data.nickname,
        photo: response.data.photo,
        intro: response.data.intro,
        gender: response.data.gender,
        style: response.data.style,
        age: response.data.age,
        userName: response.data.userName,
        email:response.data.email,
        facebook: response.data.facebook,
        rate: response.data.rate,
        followerNum: response.data.followerNum,
        likeNum: response.data.likeNum
      }],
      display: response.data.display
    }))
    .catch(error => console.log(error.response))
  }

  render() {
    return(
      <AnimationRevealPage>
        <NavBarAuthenticated/>
        <StylistProfileImageIntro testimonials={this.state.testimonials}/>
        <StylistProfilePastDesign display={this.state.display===null?[{image: PastDesign1, idea: "sample idea"}]: this.state.display}/>
        <Footer />
      </AnimationRevealPage>
    )
  }
}

export default StylistProfile
