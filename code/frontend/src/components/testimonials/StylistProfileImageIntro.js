import React from "react";
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

import "slick-carousel/slick/slick.css";

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
const CustomerTitle = tw.p`font-medium text-xl lg:text-xl xl:text-xl text-gray-700 mb-2 w-full border-solid border rounded py-1 px-2`;
const CustomerName = tw.h5`font-bold text-lg lg:text-xl xl:text-xl text-primary-500`;
const FollowerNumTitle = tw.h5`font-bold text-xl lg:text-xl xl:text-xl text-primary-500`;
const FollowerNum = tw.p`font-medium text-xl lg:text-xl xl:text-xl text-gray-700 mb-2 w-full border-solid border rounded py-1 px-2`;





const QuotesLeft = tw(QuotesLeftIcon)`w-8 h-8 lg:w-10 lg:h-10 text-primary-500 absolute top-0 left-0`;
const QuotesRight = tw(QuotesRightIcon)`w-8 h-8 lg:w-10 lg:h-10 text-primary-500 absolute bottom-0 right-0`;

const SliderControlButtonContainer = styled.div`
  ${tw`absolute top-0 h-full flex items-end md:items-center z-20`}
  button {
    ${tw`text-secondary-500 hover:text-primary-500 focus:outline-none transition duration-300 transform hover:scale-125 transform -translate-y-2/3 md:translate-y-0`}
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
)`absolute w-32 top-0 left-0 -z-10 text-primary-500 opacity-25 transform -translate-x-full`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob2
)`absolute w-32 bottom-0 right-0 -z-10 text-pink-500 opacity-15 transform translate-x-2/3 translate-y-8`;

export default () => {
  /*
   * You can modify the testimonials shown by modifying the array below
   * You can add or remove objects from the array as you need.
   */
  const testimonials = [
    {
      imageSrc:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80",
      quote:
        "Charlotte Hale is an 3-year experienced stylist, who is proficient at casual style and using details to highlight personal characteristics. ",
      customerName: "UserName:",
      customerTitle: "Charlotte Hale",
      FollowerNumTitle: "FollowerNum:",
      FollowerNum:"9000",
      LikeNumTitle:"LikeNum:",
      LikeNum:"3000",
      RateTitle:"Rate:",
      Rate: "5.0",
      StyleTitle:"Style:",
      Style:"Casual",
      NicknameTitle:"Nickname:",
      Nickname: "Charlotte",
      AgeTitle:"Age:",
      Age: "23",
      GenderTitle:"Gender:",
      Gender: "Female",
      EmailTitle:"Email:",
      Email:"Charlotte@stylebox.com",
      FacebookTitle:"Facebook:",
      Facebook:"Charlotte_Stylist"

    }
  ];
  return (
    <Container>
      <Content>
        <HeadingInfoContainer>
          <HeadingTitle>Stylist Profile</HeadingTitle>
          <HeadingDescription></HeadingDescription>
        </HeadingInfoContainer>
        <TestimonialSliderContainer>
          <TestimonialSlider nextArrow={<NextArrow />} prevArrow={<PreviousArrow />}>
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index}>
                <ImageContainer>
                  <img src={testimonial.imageSrc} alt={testimonial.customerName} />
                </ImageContainer>
                <TextContainer>
                  <QuoteContainer>
                    <QuotesLeft />
                    <Quote>{testimonial.quote}</Quote>
                    <QuotesRight />
                  </QuoteContainer>
                  <CustomerInfo>
                    <div className="grid grid-cols-2">
                        <CustomerName>{testimonial.customerName}</CustomerName>
                        <CustomerTitle>{testimonial.customerTitle}</CustomerTitle>
                    </div>
                    <div className="grid grid-cols-2">
                        <FollowerNumTitle>{testimonial.FollowerNumTitle}</FollowerNumTitle>
                        <FollowerNum>{testimonial.FollowerNum}</FollowerNum>
                    </div>
                    <div className="grid grid-cols-2">
                        <FollowerNumTitle>{testimonial.LikeNumTitle}</FollowerNumTitle>
                        <FollowerNum>{testimonial.LikeNum}</FollowerNum>
                    </div>
                    <div className="grid grid-cols-2">
                        <FollowerNumTitle>{testimonial.RateTitle}</FollowerNumTitle>
                        <FollowerNum>{testimonial.Rate}</FollowerNum>
                    </div>
                    <div className="grid grid-cols-2">
                        <FollowerNumTitle>{testimonial.StyleTitle}</FollowerNumTitle>
                        <FollowerNum>{testimonial.Style}</FollowerNum>
                    </div>
                    <div className="grid grid-cols-2">
                        <FollowerNumTitle>{testimonial.NicknameTitle}</FollowerNumTitle>
                        <FollowerNum>{testimonial.Nickname}</FollowerNum>
                    </div>
                    <div className="grid grid-cols-2">
                        <FollowerNumTitle>{testimonial.AgeTitle}</FollowerNumTitle>
                        <FollowerNum>{testimonial.Age}</FollowerNum>
                    </div>
                    <div className="grid grid-cols-2">
                        <FollowerNumTitle>{testimonial.GenderTitle}</FollowerNumTitle>
                        <FollowerNum>{testimonial.Gender}</FollowerNum>
                    </div>
                    <div className="grid grid-cols-2">
                        <FollowerNumTitle>{testimonial.EmailTitle}</FollowerNumTitle>
                        <FollowerNum>{testimonial.Email}</FollowerNum>
                    </div>
                    <div className="grid grid-cols-2">
                        <FollowerNumTitle>{testimonial.FacebookTitle}</FollowerNumTitle>
                        <FollowerNum>{testimonial.Facebook}</FollowerNum>
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
  );
};
