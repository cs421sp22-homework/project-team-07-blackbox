import React, { useState, Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "../misc/Headings.js";
import { PrimaryButton } from "../misc/Buttons.js";
import { ReactComponent as QuotesLeftIcon } from "../../images/quotes-l.svg";
import { ReactComponent as QuotesRightIcon } from "../../images/quotes-r.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-4.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../images/svg-decorator-blob-5.svg";
import PastDesign1 from "../../images/StylistProfile_pastdesign1.png"
import ImageUploader from "react-images-upload";
import StylistService from "../../api/styleBox/StylistService"


import "slick-carousel/slick/slick.css";
import { CompareSharp } from "@material-ui/icons";
import {API_URL} from "../../Constants";


const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const TestimonialsContainer = tw.div`mt-16 lg:mt-0`;
const Testimonials = styled.div``;
const Testimonial = tw.div`max-w-md lg:max-w-none mx-auto lg:mx-0 flex flex-col items-center lg:items-stretch lg:flex-row`;

const TestimonialImageSlider = tw(Slider)`w-full lg:w-5/12 flex-shrink-0 `;
const TestimonialTextSlider = tw(Slider)``;
const TestimonialText = tw.div`outline-none`;
const TextArea = tw.textarea`block px-3 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-10 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`;

const ImageAndControlContainer = tw.div`relative outline-none`;
//const Image = styled.div(props => [
//  `background-image: url("${props.imageSrc}");`,
//  tw`rounded bg-cover bg-center h-80 sm:h-96 lg:h-144`
//]);
const Image = tw.img`max-w-full rounded-t sm:rounded`;
const Image1 = tw.img`w-48 h-48 rounded-t sm:rounded`;

const ControlContainer = tw.div`absolute bottom-0 right-0 bg-gray-100 px-6 py-4 rounded-tl-3xl border`;
const ControlButton = styled(PrimaryButton)`
  ${tw`mx-3 rounded-full text-gray-100 p-2 bg-pink-500`}
  svg {
    ${tw`w-5 h-5`}
  }
`;

const TextContainer = styled.div(props => [
  tw`flex flex-col w-full lg:w-7/12`,
  props.textOnLeft ? tw`lg:pr-12 lg:order-first` : tw`lg:pl-12 lg:order-last`
]);

const Subheading = tw(SubheadingBase)`mb-4`;
const HeadingTitle = tw(SectionHeading)`lg:text-left leading-tight`;
const Description = tw.p`max-w-md text-center mx-auto lg:mx-0 lg:text-left lg:max-w-none leading-relaxed text-sm sm:text-base lg:text-lg font-medium mt-4 text-secondary-100`;

const QuoteContainer = tw.div`relative mt-10 lg:mt-20`;
const Quote = tw.blockquote`text-center lg:text-left text-sm sm:text-lg lg:text-xl xl:text-2xl`;
const Quote1 = tw.blockquote`text-center lg:text-left text-base`;
const CustomerInfo = tw.div`mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start`;
const CustomerProfilePicture = tw.img`rounded-full w-20 h-20`;
const CustomerTextInfo = tw.div`text-center lg:text-left sm:ml-6 mt-2 sm:mt-0`;
const CustomerName = tw.h5`font-semibold text-xl lg:text-2xl xl:text-3xl text-pink-500`;
const CustomerTitle = tw.p`font-medium text-secondary-100`;

const QuotesLeft = tw(QuotesLeftIcon)`w-6 h-6 opacity-75 text-pink-500 inline-block mr-1 -mt-3`;
const QuotesRight = tw(QuotesRightIcon)`w-6 h-6 opacity-75 text-pink-500 inline-block ml-1 -mt-3`;

const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`absolute w-32 top-0 left-0 -z-10 text-pink-500 opacity-25 transform -translate-x-full`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob2
)`absolute w-32 bottom-0 right-0 -z-10 text-pink-500 opacity-15 transform translate-x-2/3 translate-y-8`;

const imageSliderRef = null, setImageSliderRef = null, textSliderRef = null, setTextSliderRef = null;
// const [imageSliderRef, setImageSliderRef] = useState(null)
// const [textSliderRef, setTextSliderRef] = useState(null)


const HeadingInfo = ({ subheading, heading, description, ...props }) => (
  <div {...props}>
    {subheading ? <Subheading>{subheading}</Subheading> : null}
    <HeadingTitle>{heading}</HeadingTitle>
    <Description>{description}</Description>
  </div>
);

class StylistProfileTwoColumnWithImageAndProfilePictureReview extends Component{
  constructor(props){
    super(props)
    this.state = {
      subheading: "",
      heading: "Past Design",
      description: "Here are the design overview and the design idea of each past design of the stylist.",
      testimonials: null,
      textOnLeft: false,
      profileImageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80",
      customerName: "Charlotte Hale",
      customerTitle: "Stylist",
      isEdit: false,
      deletedID: [],
      images: [],
      ideas: [],
      photo: this.props.photo
    }

    this.updateDisplay = this.updateDisplay.bind(this)
    this.deleteDisplay = this.deleteDisplay.bind(this)
    this.onDropOutfit = this.onDropOutfit.bind(this)
    this.submitChange = this.submitChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  updateDisplay(){
    this.setState({isEdit: true})
  }

  deleteDisplay(id){
    let result = this.state.deletedID
    
    if (!result.includes(id)) {
      result.push(id)
      this.setState({
        deletedID: result
      })
    }
    // console.log(this.state.deletedID)
  }

  onDropOutfit(pictureFiles, pictureDataURLs){
    this.setState({
      images: pictureFiles
    });
  }

  handleChange(event){
    this.setState({
      [event.target.name] : [event.target.value]
    })
  }

  submitChange(event){
    event.preventDefault();
    console.log("images" + this.state.images + " /n ideas: " + this.state.ideas + "/n id" + this.state.deletedID)
    StylistService.updateProfile(this.state.images, this.state.ideas, this.state.deletedID) 
    .then((response)=>{
      console.log(response.data);
      alert("Submit successfully.")
      this.props.history.push({pathname:'/stylist/profile'})
    })
    .catch((error) => {
      alert("Update Failed. Please try again.");
    })
  }


  render(){
    return (

      <Container>
        <Content>
          <HeadingInfo tw="text-center lg:hidden" subheading={this.state.subheading} heading={this.state.heading} description={this.state.description} />
          <TestimonialsContainer>
            <Testimonials>
              {this.state.isEdit? 
                /* Edit display part */ 
                <div> 
                  <h2 className="text-3xl font-black tracking-wide text-center pb-10"> Manage and Update Your Design </h2>
                  {this.props.display.map((testimonial, index) => (
                      <div>
                      <div className="grid grid-cols-5 my-10"key={index}>
                        <div></div>
                          <ImageAndControlContainer>
                            <Image1 src={`${API_URL}${testimonial.image}`}/>
                          </ImageAndControlContainer>
                        <TestimonialText className="col-span-2">
                            <QuoteContainer>
                              <Quote1>
                                <QuotesLeft />
                                  {testimonial.idea===null?"test idea": testimonial.idea}
                                <QuotesRight />
                              </Quote1>
                            </QuoteContainer>
                          </TestimonialText>
                        
                        <button onClick={() => this.deleteDisplay(testimonial.image)} className="mx-20 my-20 py-3 font-bold rounded bg-pink-600 text-white hocus:bg-pink-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300" >{"Delete"}</button>
                      </div>
                      </div>
                    ))}
                  <div>
                    <h2 className="font-black tracking-wide text-center"> Add new display below ! </h2>
                      <div className="grid grid-cols-4">
                        <ImageUploader
                            className="mx-3 mt-6"
                            withIcon={false}
                            withPreview={true}
                            withLabel={false}
                            buttonText="Choose images"
                            // buttonStyles={{background:'rgb(236 72 153'}}
                            onChange={this.onDropOutfit}
                            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                            maxFileSize={5242880}
                            singleImage={true}
                          />
                        <TextArea name="ideas" onChange={this.handleChange} className="col-span-3" placeholder="Input your design idea here."/>
                      </div>
                      <div align="center"><PrimaryButton buttonRounded={true} onClick={this.submitChange}>{"Submit Your Change"}</PrimaryButton></div>
                  </div>
                </div>
              :
              <Testimonial>
              <TestimonialImageSlider arrows={false} ref={setImageSliderRef} asNavFor={textSliderRef} fade={true}>
                {this.props.display.map((testimonial, index) => (
                  <ImageAndControlContainer key={index}>
                    <Image src={testimonial.image===null?PastDesign1: `${API_URL}${testimonial.image}`}/>
                    <ControlContainer>
                      <ControlButton onClick={imageSliderRef?.slickPrev}>
                        <ChevronLeftIcon />
                      </ControlButton>
                      <ControlButton onClick={imageSliderRef?.slickNext}>
                        <ChevronRightIcon />
                      </ControlButton>
                    </ControlContainer>
                  </ImageAndControlContainer>
                ))}
              </TestimonialImageSlider>
              <TextContainer textOnLeft={this.state.textOnLeft}>
                <HeadingInfo tw="hidden lg:block" subheading={this.state.subheading} heading={this.state.heading} description={this.state.description} />
                <TestimonialTextSlider arrows={false} ref={setTextSliderRef} asNavFor={imageSliderRef} fade={true}>
                  {this.props.display.map((testimonial, index) => (

                    <TestimonialText key={index}>
                      <QuoteContainer>
                        <Quote>
                          <QuotesLeft />
                          {testimonial.idea===null?"test idea": testimonial.idea}
                          <QuotesRight />
                        </Quote>
                      </QuoteContainer>
                      <CustomerInfo>
                        <CustomerProfilePicture src={`${API_URL}${this.props.photo}`} alt={this.state.customerName} />
                        <CustomerTextInfo>
                          <CustomerName>{this.state.customerName}</CustomerName>
                          <CustomerTitle>{this.state.customerTitle}</CustomerTitle>
                        </CustomerTextInfo>
                      </CustomerInfo>
                    </TestimonialText>
                  ))}
                </TestimonialTextSlider>
              </TextContainer>
            </Testimonial>
            } 
            </Testimonials>
          </TestimonialsContainer>
          {!this.state.isEdit ? 
            <div className="mt-20" align="center">
              <PrimaryButton buttonRounded={true} onClick={this.updateDisplay}>{"Update Your Display"}</PrimaryButton>
            </div> : <div></div>}
        </Content>
        <DecoratorBlob1 />
        <DecoratorBlob2 />
      </Container>
    );
  }
}

export default StylistProfileTwoColumnWithImageAndProfilePictureReview


