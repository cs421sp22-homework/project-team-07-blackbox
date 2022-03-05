import React, {Component} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "components/styleBox/Footer.jsx";
import StylistProfileImageIntro from "components/testimonials/StylistProfileImageIntro.js"
import StylistProfilePastDesign from "components/testimonials/StylistProfileTwoColumnWithImageAndProfilePictureReview.js"
import StylistService from "api/styleBox/StylistService";

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
    /*
    this.setState(
      {
        testimonials: [{
          nickname: "111",
          photo: "http://dummyimage.com/400x400",
          intro: "nulla eu est ex commodo",
          gender: "quis ut",
          style: [
            "voluptate do exercitation nulla",
            "fugiat nostrud ex Duis",
            "aute ipsum laboris dolor Lorem",
            "sed proident esse non"
          ],
          age: 54,
          userName: "111",
          email: "y.vnjtnre@qq.com",
          facebook: "Lorem mollit ut incididunt",
          rate: 24,
          followerNum: 84,
          likeNum: 57
        }],
        display: [{
          image: "http://dummyimage.com/400x400",
          idea: "14"
        },
        {
          image: "http://dummyimage.com/400x400",
          idea: "10"
        },
        {
          image: "http://dummyimage.com/400x400",
          idea: "60"
        },
        {
          image: "http://dummyimage.com/400x400",
          idea: "81"
        },
        {
          image: "http://dummyimage.com/400x400",
          idea: "29"
        }]
      }, () =>{
        console.log(this.state.testimonials)
        console.log(this.state.display)
      }
    )
    */

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
        <StylistProfileImageIntro testimonials={this.state.testimonials}/>
        <StylistProfilePastDesign display={this.state.display}/>
        <Footer />
      </AnimationRevealPage>
    )
  }
}

export default StylistProfile