import React, {Component} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "styleBox/navBar_footer/Footer.jsx";
import StylistProfileImageIntro from "components/testimonials/StylistProfileImageIntro.js"
import StylistProfilePastDesign from "components/testimonials/StylistProfileTwoColumnWithImageAndProfilePictureReview.js"
import StylistService from "api/styleBox/StylistService";
import PastDesign1 from "../../images/StylistProfile_pastdesign1.png"
import NavBarAuthenticated from "../navBar_footer/NavBarAuthenticated";
import {API_URL} from "../../Constants";

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
        username: "Charlotte Hale",
        email:"Charlotte@stylebox.com",
        facebook:"Charlotte_Stylist",
        rate: 5,
        followerNum: 9000,
        viewSty: false
      }],
      display: [{image: "https://media.glamour.com/photos/607f272348c995b3b00ffd38/1:1/w_120,c_limit/terry%20cloth%20trend.jpg", idea: "22"}, {image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80", idea: "111"}]
    }

    this.modifyState()
    console.log("construct father", this.state.testimonials)
  }

  modifyState(){

    StylistService.getHomepage()
        .then(response=>this.setState({
          testimonials: [{
            nickname: response.data.nickname,
            photo: response.data.photo,
            intro: response.data.intro,
            gender: response.data.gender,
            style: response.data.style,
            age: response.data.age,
            username: response.data.username,
            email:response.data.email,
            facebook: response.data.facebook,
            rate: response.data.rate,
            followerNum: response.data.followerNum
          }],
          display: response.data.display
        }))
        .catch(error => console.log(error.response))

  }

  render() {
    return(
        <AnimationRevealPage>
          <NavBarAuthenticated/>
          {console.log("pass", this.state.testimonials)}
          {/*<StylistProfilePastDesign display={this.state.display===null?[{image: PastDesign1, idea: "sample idea"}]: this.state.display}/> */}
          <StylistProfileImageIntro testimonials={this.state.testimonials}/>
          <StylistProfilePastDesign viewSty={false} photo={this.state.testimonials[0].photo} display={this.state.display===null?[{image: PastDesign1, idea: "sample idea"}]: this.state.display}/>
          <Footer />
        </AnimationRevealPage>
    )
  }
}

export default StylistProfile