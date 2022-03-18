import React, {Component} from "react";
import Slider from "react-slick";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
//import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import { ReactComponent as QuotesLeftIcon } from "../../images/quotes-l.svg";
import { ReactComponent as QuotesRightIcon } from "../../images/quotes-r.svg";
import { ReactComponent as ArrowLeftIcon } from "../../images/arrow-left-2-icon.svg";
import { ReactComponent as ArrowRightIcon } from "../../images/arrow-right-2-icon.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-4.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../images/svg-decorator-blob-5.svg";
import { PrimaryButton} from "components/misc/Buttons.js";

import "slick-carousel/slick/slick.css";
import CustomerBrowseStylistService from "api/styleBox/CustomerBrowseStylistService";

const Button = tw(PrimaryButton)`w-56 mx-8 mt-10 inline-block`

const HeadingTitle =  tw.h2`text-4xl sm:text-5xl font-black tracking-wide text-center`
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-2 font-medium text-gray-600 text-center max-w-sm`;

const TestimonialSliderContainer = tw.div`mt-24`;
const TestimonialSlider = styled(Slider)``;
const Testimonial = tw.div`flex! flex-col items-center md:items-stretch md:flex-row md:justify-center outline-none`;
const ImageContainer = styled.div`
  ${tw`md:mx-3 lg:mx-6 w-2/3 md:w-4/12 rounded flex items-center max-w-xs md:max-w-none`}
  img {
    ${tw`rounded`}
  }
`;
const TextContainer = tw.div`md:mx-3 lg:mx-6 md:w-6/12 py-4 flex flex-col justify-between`;
const QuoteContainer = tw.div`relative p-6 md:p-8 lg:p-10 mt-4 md:mt-0`;
const Quote = tw.blockquote`text-center md:text-left font-medium text-xl lg:text-xl xl:text-xl`;
const CustomerInfo = tw.div`px-5 lg:px-10 text-center md:text-left mt-4 md:mt-0`;
const CustomerName = tw.p`font-medium text-xl lg:text-xl xl:text-xl text-gray-700 mb-2 w-full border-solid border rounded py-1 px-2`;
const CustomerTitle = tw.h5`font-bold text-lg lg:text-xl xl:text-xl text-pink-500`;
const FollowerNumTitle = tw.h5`font-bold text-xl lg:text-xl xl:text-xl text-pink-500`;
const FollowerNum = tw.p`font-medium text-xl lg:text-xl xl:text-xl text-gray-700 mb-2 w-full border-solid border rounded py-1 px-2`;

const QuotesLeft = tw(QuotesLeftIcon)`w-8 h-8 lg:w-10 lg:h-10 text-pink-500 absolute top-0 left-0`;
const QuotesRight = tw(QuotesRightIcon)`w-8 h-8 lg:w-10 lg:h-10 text-pink-500 absolute bottom-0 right-0`;

const SliderControlButtonContainer = styled.div`
  ${tw`absolute top-0 h-full flex items-end md:items-center z-20`}
  button {
    ${tw`text-secondary-500 hover:text-pink-500 focus:outline-none transition duration-300 transform hover:scale-125 transform -translate-y-2/3 md:translate-y-0`}
    svg {
      ${tw`w-8`}
    }
  }
`;

const NextArrow = ({ currentSlide, slideCount, ...props }) => (
  <SliderControlButtonContainer tw="right-0">
    <button {...props}>
      <ArrowRightIcon />
    </button>
  </SliderControlButtonContainer>
);
const PreviousArrow = ({ currentSlide, slideCount, ...props }) => (
  <SliderControlButtonContainer tw="left-0">
    <button {...props}>
      <ArrowLeftIcon />
    </button>
  </SliderControlButtonContainer>
);

const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`absolute w-32 top-0 left-0 -z-10 text-pink-500 opacity-25 transform -translate-x-full`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob2
)`absolute w-32 bottom-0 right-0 -z-10 text-pink-500 opacity-15 transform translate-x-2/3 translate-y-8`;

class StylistProfileBrowse extends Component{
  constructor(props){
    super(props)

    this.state = {
      
    }
    

    // method part
  }

  

  render(){
    return (
      <Container>
        <Content>
          <HeadingInfoContainer>
            <HeadingTitle>Stylist Profile</HeadingTitle>
            <HeadingDescription></HeadingDescription>
          </HeadingInfoContainer>
          <TestimonialSliderContainer>
            <TestimonialSlider nextArrow={<NextArrow />} prevArrow={<PreviousArrow />}>
              {this.props.testimonials.map((testimonial, index) => (
                <Testimonial key={index}>
                  <ImageContainer>
                    <img src={testimonial.photo} alt={testimonial.customerName} />
                    
                  </ImageContainer>
                  
                  <TextContainer>
                    <QuoteContainer>
                      <QuotesLeft />
                      <Quote>{testimonial.intro}</Quote>
                      <QuotesRight />
                    </QuoteContainer>
                    <CustomerInfo>
                      <div className="grid grid-cols-2">
                          <CustomerTitle>UserName:</CustomerTitle>
                          <CustomerName>{testimonial.userName}</CustomerName>
                      </div>
                      <div className="grid grid-cols-2">
                          <FollowerNumTitle>FollowerNum:</FollowerNumTitle>
                          <FollowerNum>{testimonial.followerNum===null?30:testimonial.followerNum}</FollowerNum>
                      </div>
                      <div className="grid grid-cols-2">
                          <FollowerNumTitle>LikeNum:</FollowerNumTitle>
                          <FollowerNum>{testimonial.likeNum===null?100:testimonial.likeNum}</FollowerNum>
                      </div>
                      <div className="grid grid-cols-2">
                          <FollowerNumTitle>Rate:</FollowerNumTitle>
                          <FollowerNum>{testimonial.rate===null?5:testimonial.rate}</FollowerNum>
                      </div>
                      <div className="grid grid-cols-2">
                          <FollowerNumTitle>Style:</FollowerNumTitle>
                          <FollowerNum>{testimonial.style + " "}</FollowerNum>
                      </div>
                      <div className="grid grid-cols-2">
                          <FollowerNumTitle>Nickname:</FollowerNumTitle>
                          <FollowerNum>{testimonial.nickname}</FollowerNum>
                      </div>
                      <div className="grid grid-cols-2">
                          <FollowerNumTitle>Age:</FollowerNumTitle>
                          <FollowerNum>{testimonial.age}</FollowerNum>
                      </div>
                      <div className="grid grid-cols-2">
                          <FollowerNumTitle>Gender:</FollowerNumTitle>
                          <FollowerNum>{testimonial.gender}</FollowerNum>
                      </div>
                      <div className="grid grid-cols-2">
                          <FollowerNumTitle>Email:</FollowerNumTitle>
                          <FollowerNum>{testimonial.email}</FollowerNum>
                      </div>
                      <div className="grid grid-cols-2">
                          <FollowerNumTitle>Facebook:</FollowerNumTitle>
                          <FollowerNum>{testimonial.facebook}</FollowerNum>
                      </div>

                    </CustomerInfo>
                  </TextContainer>
                </Testimonial>
              ))}
              
            </TestimonialSlider>
            

          </TestimonialSliderContainer>
        </Content>
        <DecoratorBlob1 />
        <DecoratorBlob2 />
      </Container>
    )
  }
}

export default StylistProfileBrowse