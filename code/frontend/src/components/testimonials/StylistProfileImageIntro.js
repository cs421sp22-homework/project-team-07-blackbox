import React, {Component} from "react";
import Slider from "react-slick";
import styled from "styled-components";
import tw from "twin.macro";
import {css} from "styled-components/macro"; //eslint-disable-line
//import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import {ReactComponent as QuotesLeftIcon} from "../../images/quotes-l.svg";
import {ReactComponent as QuotesRightIcon} from "../../images/quotes-r.svg";
import {ReactComponent as ArrowLeftIcon} from "../../images/arrow-left-2-icon.svg";
import {ReactComponent as ArrowRightIcon} from "../../images/arrow-right-2-icon.svg";
import {ReactComponent as SvgDecoratorBlob1} from "../../images/svg-decorator-blob-4.svg";
import {ReactComponent as SvgDecoratorBlob2} from "../../images/svg-decorator-blob-5.svg";

import "slick-carousel/slick/slick.css";
import {PrimaryButton as PrimaryButtonBase} from "../misc/Buttons";
import Multiselect from "multiselect-react-dropdown";
import {Input} from "@mui/material";
import StylistService from "../../api/styleBox/StylistService";
import ProfileService from "../../api/styleBox/ProfileService";
import AccountSettingService from "../../api/styleBox/AccountSettingService";
import {API_URL} from "../../Constants";

const HeadingTitle = tw.h2`text-4xl sm:text-5xl font-black tracking-wide text-center`
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
const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`
const MultiSelect = tw(Multiselect)`font-medium text-xl lg:text-xl xl:text-xl text-gray-700 mb-2 w-full border-solid border rounded py-1 px-2`;
const InputText = tw.input`font-medium text-xl lg:text-xl xl:text-xl text-gray-700 mb-2 w-full border-solid border rounded py-1 px-2 bg-gray-100`;
const MulSelect = tw.select`font-medium text-xl lg:text-xl xl:text-xl text-gray-700 mb-2 w-full border-solid border rounded py-1 px-2 bg-gray-100`;

const SliderControlButtonContainer = styled.div`
  ${tw`absolute top-0 h-full flex items-end md:items-center z-20`}
  button {
    ${tw`text-secondary-500 hover:text-pink-500 focus:outline-none transition duration-300 transform hover:scale-125 transform -translate-y-2/3 md:translate-y-0`}
    svg {
      ${tw`w-8`}
    }
  }
`;

const NextArrow = ({currentSlide, slideCount, ...props}) => (
    <SliderControlButtonContainer tw="right-0">
        <button {...props}>
            <ArrowRightIcon/>
        </button>
    </SliderControlButtonContainer>
);
const PreviousArrow = ({currentSlide, slideCount, ...props}) => (
    <SliderControlButtonContainer tw="left-0">
        <button {...props}>
            <ArrowLeftIcon/>
        </button>
    </SliderControlButtonContainer>
);

const DecoratorBlob1 = tw(
    SvgDecoratorBlob1
)`absolute w-32 top-0 left-0 -z-10 text-pink-500 opacity-25 transform -translate-x-full`;
const DecoratorBlob2 = tw(
    SvgDecoratorBlob2
)`absolute w-32 bottom-0 right-0 -z-10 text-pink-500 opacity-15 transform translate-x-2/3 translate-y-8`;

class StylistProfileImageIntro extends Component {
    constructor(props) {
        super(props)

        this.state = {
            edit: false,
            styles: [{name: 'Academic', id: 1},
                {name: 'Casual', id: 2},
                {name: 'Sexy', id: 3},
                {name: 'Sports', id: 4},
                {name: 'Formal', id: 5}],
            selectedStyles: [],
            nickname: this.props.testimonials[0].nickname,
            age: this.props.testimonials[0].age,
            gender: this.props.testimonials[0].gender,
            email: this.props.testimonials[0].email,
            facebook: this.props.testimonials[0].facebook,
            intro: this.props.testimonials[0].intro
        }

        console.log("construct child", this.props.testimonials[0])

        // method part
        this.clickedit = this.clickedit.bind(this)
        this.onSelectStyle = this.onSelectStyle.bind(this)
        this.onRemoveStyle = this.onRemoveStyle.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submitInfo = this.submitInfo.bind(this)
    }

    clickedit() {
        if (this.state.edit === false) {
            this.setState({edit: true});
        }
    }

    onSelectStyle(selectedList, selectedItem) {
        this.setState({
            selectedStyles: selectedList.map((st) => {
                if (st.hasOwnProperty('name')) {
                    return st.name
                } else {
                    return st
                }
            })
        })
    }

    onRemoveStyle(selectedList, selectedItem) {
        this.setState({
            selectedStyles: selectedList.map((st) => {
                if (st.hasOwnProperty('name')) {
                    return st.name
                } else {
                    return st
                }
            })
        })
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    submitInfo() {
        let profileInfo = {
            styleSet : this.state.selectedStyles,
            gender: this.state.gender,
            age: this.state.age,
            intro: this.state.intro,
        }
        let accInfo = {
            nickname: this.state.nickname,
            email: this.state.email,
            facebook: this.state.facebook,
        }
        console.log(profileInfo)
        console.log(accInfo)
        this.setState({edit: false})
        ProfileService.modifyStylistProfile(profileInfo)
        AccountSettingService.modifyAccount(accInfo)
        // this.redirect();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
                    nickname: nextProps.testimonials[0].nickname,
                    age: nextProps.testimonials[0].age,
                    gender: nextProps.testimonials[0].gender,
                    email: nextProps.testimonials[0].email,
                    facebook: nextProps.testimonials[0].facebook,
                    intro: nextProps.testimonials[0].intro,
                    selectedStyles: nextProps.testimonials[0].style
                })
    }

    render() {
        return (
            <Container>
                <Content>
                    <HeadingInfoContainer>
                        <HeadingTitle>Stylist Profile</HeadingTitle>
                        <HeadingDescription></HeadingDescription>
                    </HeadingInfoContainer>
                    <TestimonialSliderContainer>
                        <TestimonialSlider nextArrow={<NextArrow/>} prevArrow={<PreviousArrow/>}>
                            {this.props.testimonials.map((testimonial, index) => (
                                <Testimonial key={index}>
                                    <ImageContainer>
                                        <img src={testimonial.photo} alt={testimonial.customerName}/>
                                    </ImageContainer>
                                    <TextContainer>
                                        <QuoteContainer>
                                            <QuotesLeft/>
                                            {this.state.edit ? <InputText value={this.state.intro} name="intro" type="text"
                                                                          onChange={this.handleChange}/> : <Quote>{this.state.intro}</Quote>}
                                            <QuotesRight/>
                                        </QuoteContainer>
                                        <CustomerInfo>
                                            <div className="grid grid-cols-2">
                                                <CustomerTitle>UserName:</CustomerTitle>
                                                <CustomerName>{testimonial.username}</CustomerName>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <FollowerNumTitle>FollowerNum:</FollowerNumTitle>
                                                <FollowerNum>{testimonial.followerNum === null ? 30 : testimonial.followerNum}</FollowerNum>
                                            </div>

                                            <div className="grid grid-cols-2">
                                                <FollowerNumTitle>Rate:</FollowerNumTitle>
                                                <FollowerNum>{testimonial.rate === null ? 5 : testimonial.rate}</FollowerNum>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <FollowerNumTitle>Style:</FollowerNumTitle>
                                                {this.state.edit ?
                                                    <MultiSelect
                                                        options={this.state.styles} // Options to display in the dropdown
                                                        selectedValues={this.state.selectedStyles.map((st, index) => {
                                                            return {id: index, name: st}
                                                        })} // Preselected value to persist in dropdown
                                                        onSelect={this.onSelectStyle} // Function will trigger on select event
                                                        onRemove={this.onRemoveStyle} // Function will trigger on remove event
                                                        displayValue="name" // Property name to display in the dropdown options
                                                    /> : <FollowerNum>{this.state.selectedStyles + " "}</FollowerNum>}
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <FollowerNumTitle>Nickname:</FollowerNumTitle>
                                                {this.state.edit ?
                                                    <InputText value={this.state.nickname} name="nickname" type="text"
                                                               onChange={this.handleChange}/>
                                                    : <FollowerNum>{this.state.nickname}</FollowerNum>}
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <FollowerNumTitle>Age:</FollowerNumTitle>
                                                {this.state.edit ?
                                                    <InputText value={this.state.age} name="age" type="text"
                                                               onChange={this.handleChange}/>
                                                    :<FollowerNum>{this.state.age}</FollowerNum>}
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <FollowerNumTitle>Gender:</FollowerNumTitle>
                                                {this.state.edit ?
                                                    // <InputText value={this.state.gender} name="gender" type="text"
                                                    //            onChange={this.handleChange}/>
                                                    <MulSelect
                                                                    value={this.state.gender} name="gender" onChange={this.handleChange}>
                                                                <option value="male">male</option>
                                                                <option value="female">female</option>
                                                            </MulSelect>
                                                    :<FollowerNum>{this.state.gender}</FollowerNum>}
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <FollowerNumTitle>Email:</FollowerNumTitle>
                                                {this.state.edit ?
                                                    <InputText value={this.state.email} name="email" type="text"
                                                               onChange={this.handleChange}/>
                                                    :<FollowerNum>{this.state.email}</FollowerNum>}
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <FollowerNumTitle>Facebook:</FollowerNumTitle>
                                                {this.state.edit ?
                                                    <InputText value={this.state.facebook} name="facebook" type="text"
                                                               onChange={this.handleChange}/>
                                                    :<FollowerNum>{this.state.facebook}</FollowerNum>}
                                            </div>
                                            {this.state.edit ?
                                                <SubmitButton className="w-32 ml-60"
                                                              onClick={this.submitInfo}>Submit</SubmitButton>
                                                :<SubmitButton className="w-32 ml-60"
                                                          onClick={this.clickedit}>Edit</SubmitButton>}
                                        </CustomerInfo>

                                    </TextContainer>
                                </Testimonial>
                            ))}
                        </TestimonialSlider>
                    </TestimonialSliderContainer>
                </Content>
                <DecoratorBlob1/>
                <DecoratorBlob2/>
            </Container>
        )
    }
}

export default StylistProfileImageIntro
