import tw from 'twin.macro'
import AnchorLink from "react-anchor-link-smooth-scroll/lib/anchor-link";
import React, {Component} from 'react'
import { Container, Content2Xl, ContentWithVerticalPadding } from '../misc/Layouts'
import { components } from "../../ComponentRenderer.js";
// import heroScreenshotImageSrc from "../../images/demo/MainLandingPageHero.png";
import homePageImage from "../../images/homepage-clothing.jpeg"
import { SectionHeading as HeadingBase } from "../misc/Headings";
import { SectionDescription as DescriptionBase } from "../misc/Typography";
import { ReactComponent as CheckboxIcon } from "feather-icons/dist/icons/check-circle.svg";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

const Row = tw.div`flex`;
const NavRow = tw(Row)`flex flex-col lg:flex-row items-center justify-between`;
const NavLink = tw.a`mt-4 lg:mt-0 transition duration-300 font-medium pb-1 border-b-2 mr-12 text-gray-700 border-gray-400 hocus:border-gray-700`;
const PrimaryNavLink = tw(
    NavLink
)`text-gray-100 bg-pink-500 px-6 py-3 border-none rounded hocus:bg-pink-900 focus:shadow-inner mt-6 md:mt-4 lg:mt-0`;
const HeroRow = tw(Row)`flex-col lg:flex-row justify-between items-center pt-8 lg:pt-12 pb-16 max-w-screen-2xl mx-auto flex-wrap`;

const Column = tw.div`flex-1`



const TextColumn = tw(Column)`mx-auto lg:mr-0 max-w-2xl lg:max-w-xl xl:max-w-2xl flex-shrink-0`;
const Heading = tw(HeadingBase)`text-center lg:text-left text-pink-900 leading-snug`;
const Description = tw(
    DescriptionBase
)`mt-4 text-center lg:text-left lg:text-base text-gray-700 max-w-lg mx-auto lg:mx-0`;
const Actions = tw.div`flex flex-col sm:flex-row justify-center lg:justify-start`;
const ActionButton = tw(
    AnchorLink
)`px-8 py-3 font-bold rounded bg-pink-500 text-gray-100 hocus:bg-pink-700 hocus:text-gray-200 focus:shadow-inner focus:outline-none transition duration-300 mt-12 inline-block tracking-wide text-center px-10 py-4 font-semibold tracking-normal`;
const PrimaryButton = tw(ActionButton)``;
const SecondaryButton = tw(
    ActionButton
)`mt-6 sm:mt-12 sm:ml-8 bg-gray-300 text-gray-800 hocus:bg-gray-400 hocus:text-gray-900`;
const FeatureList = tw.ul`mt-6 leading-loose flex flex-wrap max-w-xl mx-auto lg:mx-0`;
const Feature = tw.li`mt-2 flex items-center flex-shrink-0 w-full sm:w-1/2 justify-center lg:justify-start`;
const FeatureIcon = tw(CheckboxIcon)`w-5 h-5 text-pink-500`;
const FeatureText = tw.p`ml-2 font-medium text-gray-700`;
const ImageColumn = tw(Column)`mx-auto lg:mr-0 relative mt-16 lg:mt-0 lg:ml-8`;
const ImageContainer = tw.div``;
const Image = tw.img`max-w-full rounded-t sm:rounded`;




class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            features : null,
            primaryButtonUrl : "#landingPageDemos",
            primaryButtonText : "Explore Demos",
            secondaryButtonUrl : "#componentDemos",
            secondaryButtonText : "View Components",
            buttonRoundedCss : "",
            landingPages : components.landingPages,
            innerPages : components.innerPages,
            blocks : components.blocks,
            heading : "Style Box",
            description : "The Style Box is a platform that integrates the idea of e-commerce and social network. It has three sections: design for you, design for others and favorite ootd sharing. The Style Box lets the customer get customized clothing shopping experience, gives stylists opportunities to show their talents and maintains an active fashion community. Our platform provides one-stop service, including outfit fixing, shopping, and delivery. The customer can pick up a stylist on our website to help them select clothing items and design the outfits. The customer will get a style report and buy all the clothing items on our website. Eventually, a style box would be delivered to the customer containing all they need to become a fashion insider."
        }
    }


    render() {
        return (
            <AnimationRevealPage disabled>
                <Container tw="bg-gray-100 -mx-8 -mt-8 pt-8 px-8">
                    <Content2Xl>
                        <div tw="flex flex-col justify-center h-full space-y-5">
                            {/*navigate bar*/}
                            <NavRow>
                                <div tw="flex flex-wrap justify-center lg:justify-end items-center -mr-12">
                                    <NavLink target="_blank"
                                             href="#">
                                        Stylists
                                    </NavLink>
                                    <NavLink target="_blank" href="#">
                                        Shopping
                                    </NavLink>
                                    <NavLink target="_blank" href="#">
                                        Community
                                    </NavLink>
                                    <div tw="md:hidden flex-auto h-0"></div>
                                    <PrimaryNavLink target="_blank" href="#">
                                        Sign In
                                    </PrimaryNavLink>
                                </div>
                            </NavRow>

                            <HeroRow>
                                <TextColumn>
                                    <Heading as="h1">{this.state.heading}</Heading>
                                    <Description>{this.state.description}</Description>
                                </TextColumn>
                                <ImageColumn>
                                    <ImageContainer>
                                        <Image src={homePageImage}/>
                                    </ImageContainer>
                                </ImageColumn>
                            </HeroRow>
                        </div>
                    </Content2Xl>
                </Container>
            </AnimationRevealPage>
        )
    }
}


export default HomePage

