import tw from 'twin.macro'
import AnchorLink from "react-anchor-link-smooth-scroll/lib/anchor-link";
import React, {Component} from 'react'
import { Container, Content2Xl } from '../components/misc/Layouts'
import { components } from "../ComponentRenderer.js";
import homePageImage from "../images/homepage-clothing.jpeg"
import stylistImage from "../images/stylist.jpeg"
import quizImage from "../images/quiz.jpeg"
import {SectionHeading as HeadingBase, Subheading} from "../components/misc/Headings";
import { SectionDescription as DescriptionBase } from "components/misc/Typography";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Features from "../components/features/ThreeColWithoutSideImage";
import TabItemGrid from "../components/cards/TabItemGrid";
import womenItem1 from "../images/clothing-items/women/bottoms/women-bottom-1.jpeg"
import womenItem2 from "../images/clothing-items/women/tops/women-tops-1.png"
import womenItem3 from "../images/clothing-items/women/accessories/women-accessories-1.jpeg"
import womenItem4 from "../images/clothing-items/women/bottoms/women-bottom-2.png"
import menItem1 from "../images/clothing-items/men/tops/men-tops-1.png"
import menItem2 from "../images/clothing-items/men/tops/men-tops-2.png"
import menItem3 from "../images/clothing-items/men/accessories/men-accessories-1.png"
import menItem4 from "../images/clothing-items/men/shoes/men-shoes-1.png"
import kidsItem1 from "../images/clothing-items/kids/dress/kids-dress-1.png"
import kidsItem2 from "../images/clothing-items/kids/tops/kids-tops-1.png"
import kidsItem3 from "../images/clothing-items/kids/bottoms/kids-bottoms-1.png"
import kidsItem4 from "../images/clothing-items/kids/dress/kids-dress-2.png"
import NavBar from "./navBar_footer/NavBar";
import Footer from "./navBar_footer/Footer";

const Row = tw.div`flex`;

const HeroRow = tw(Row)`flex-col lg:flex-row justify-between items-center pt-8 lg:pt-12 pb-16 max-w-screen-2xl mx-auto flex-wrap`;

const Column = tw.div`flex-1`



const TextColumn = tw(Column)`mx-auto lg:mr-0 max-w-2xl lg:max-w-xl xl:max-w-2xl flex-shrink-0`;
const Heading = tw(HeadingBase)`text-center lg:text-left text-pink-900 leading-snug`;
const Description = tw(
    DescriptionBase
)`mt-4 text-center lg:text-left lg:text-base text-gray-700 max-w-lg mx-auto lg:mx-0`;
const Actions = tw.div`flex flex-col sm:flex-row justify-center lg:justify-start`;
const ActionButton = tw.a`px-8 py-3 font-bold rounded bg-pink-500 text-gray-100 hocus:bg-pink-700 hocus:text-gray-200 focus:shadow-inner focus:outline-none transition duration-300 mt-12 inline-block tracking-wide text-center px-10 py-4 font-semibold tracking-normal`;
const SecondaryButton = tw(
    ActionButton
)`mt-6 sm:mt-12 sm:ml-8 bg-gray-300 text-gray-800 hocus:bg-gray-500 hocus:text-gray-900`;
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
            description : "The Style Box is a platform that integrates the idea of e-commerce and social network. It has three sections: design for you, design for others and favorite ootd sharing. The Style Box lets the customer get customized clothing shopping experience, gives stylists opportunities to show their talents and maintains an active fashion community. Our platform provides one-stop service, including outfit fixing, shopping, and delivery. The customer can pick up a stylist on our website to help them select clothing items and design the outfits. The customer will get a style report and buy all the clothing items on our website. Eventually, a style box would be delivered to the customer containing all they need to become a fashion insider.",
            items: {
                womenItem1: womenItem1,
                womenItem2: womenItem2,
                womenItem3: womenItem3,
                womenItem4: womenItem4,
                menItem1: menItem1,
                menItem2: menItem2,
                menItem3: menItem3,
                menItem4: menItem4,
                kidsItem1: kidsItem1,
                kidsItem2: kidsItem2,
                kidsItem3: kidsItem3,
                kidsItem4: kidsItem4,
            }
        }
    }


    render() {
        return (
            <AnimationRevealPage>
                <Container tw="bg-gray-100 -mx-8 -mt-8 pt-8 px-8">
                    <Content2Xl>
                        <div tw="flex flex-col justify-center h-full space-y-5">
                            {/*navigate bar*/}
                            <NavBar/>
                            {/*Intro to Style Box*/}
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
                        {/*Quiz*/}
                        <Features
                            subheading={<Subheading> </Subheading>}
                            heading={
                                <>
                                    Take a Quiz to let us know more about you!
                                </>
                            }
                            description={
                                <>
                                    <div>The quiz will help us better know about your preference and match you with the stylists.</div>
                                </>
                            }
                        />
                        <div tw="flex justify-center h-full space-y-4">
                            <Image src={quizImage}/>
                        </div>
                        <div tw="flex justify-center pb-20">
                            <Actions>
                                <SecondaryButton href="/quiz">
                                    Take Quiz
                                </SecondaryButton>
                            </Actions>
                        </div>
                        {/*Stylist*/}
                        <Features
                            subheading={<Subheading> </Subheading>}
                            heading={
                                <>
                                    Find the stylist to fix your outfit!
                                </>
                            }
                            description={
                                <>
                                    <div>You may choose to place an order to the stylist.</div>
                                    <div>Ask them to pick clothing items suit you best and design your outfit.</div>
                                </>
                            }
                        />
                        <div tw="flex justify-center h-full space-y-4">
                            <Image src={stylistImage}/>
                        </div>
                        <div tw="flex justify-center pb-20">
                            <Actions>
                                <SecondaryButton href="#">
                                    Choose a stylist
                                </SecondaryButton>
                            </Actions>
                        </div>

                        {/*Shopping*/}
                        <Features
                            subheading={<Subheading> </Subheading>}
                            heading={
                                <>
                                    <div>What? Wanna shop on your own?</div>
                                    <div>See Our Shopping Center!</div>
                                </>
                            }
                            description={
                                <>
                                    <div>We have clothes of various brand on our platform.</div>
                                    <div>For each clothing item, we will also show you the way to match and recommend sizes for you.</div>
                                </>
                            }
                        />
                        <TabItemGrid
                            heading={
                                <></>
                            }
                            tabs={{
                                Women: [
                                    {
                                        imageSrc:
                                            this.state.items["womenItem1"],
                                        title: "FISHERMAN PANT",
                                        content: "HIGHCOUNT TWILL FISHERMAN PAINT BLACK",
                                        price: "$49.99",
                                        url: "#"
                                    },
                                    {
                                        imageSrc:
                                            this.state.items["womenItem2"],
                                        title: "Rounded Cardigan",
                                        content: "WHOLEGARMENT ROUNDED CARDIGAN IVORY",
                                        price: "$39.99",
                                        url: "#"
                                    },
                                    {
                                        imageSrc:
                                            this.state.items["womenItem3"],
                                        title: "Single Shoulder Bag",
                                        content: "PADDING FOLDED BAG LIME GREEN",
                                        price: "$7.99",
                                        url: "#"
                                    },
                                    {
                                        imageSrc:
                                            this.state.items["womenItem4"],
                                        title: "Short Skirt",
                                        content: "CARCONNE WOMENS SHORTS LIGHT GREY",
                                        price: "$7.99",
                                        url: "#"
                                    },],
                                Men: [{
                                    imageSrc:
                                        this.state.items["menItem1"],
                                    title: "Wool Jacket",
                                    content: "3B COMBAT BLAZER WOOL NAVY",
                                    price: "$99.99",
                                    url: "#"
                                },
                                    {
                                        imageSrc:
                                            this.state.items["menItem2"],
                                        title: "Crew Sweat",
                                        content: "CREW SWEAT HEATHER GREY",
                                        price: "$49.00",
                                        url: "#"
                                    },
                                    {
                                        imageSrc:
                                            this.state.items["menItem3"],
                                        title: "Silk Tie",
                                        content: "SLIK TIE CREST SHIELD EMBROIDERY BLACK",
                                        price: "$99.99",
                                        url: "#"
                                    },
                                    {
                                        imageSrc:
                                            this.state.items["menItem4"],
                                        title: "WING SHOES",
                                        content: "8138D MOC TOE BRIAR OIL SLICK",
                                        price: "$99.99",
                                        url: "#"
                                    }],
                                Kids: [{
                                    imageSrc:
                                        this.state.items["kidsItem1"],
                                    title: "Disney Winnie the Pooh Skater Dress",
                                    content: "FUN SKATER DRESS 100% COTTON",
                                    price: "$29.99",
                                    url: "#"
                                },
                                    {
                                        imageSrc:
                                            this.state.items["kidsItem2"],
                                        title: "Baby Cardigan In Organic Cotton",
                                        content: "SUPERCRAFTED ORGANIC COTTON SOFT SWEATERKNIT",
                                        price: "$40.00",
                                        url: "#"
                                    },
                                    {
                                        imageSrc:
                                            this.state.items["kidsItem3"],
                                        title: "Baby Sweatpants",
                                        content: "SOFT AND SWEET SEATPANTS IN ORGANIC FRENCH TERRY",
                                        price: "$19.99",
                                        url: "#"
                                    },
                                    {
                                        imageSrc:
                                            this.state.items["kidsItem4"],
                                        title: "Baby Pocket Overalls",
                                        content: "SUPERSOFT AND STURDY ORGANIC COTTON FRENCH TERRY BABY POCKET",
                                        price: "$99.99",
                                        url: "#"
                                    }],

                            }
                            }

                            moreLink={
                                {
                                    Women: "Women-Items",
                                    Men: "Men-Items",
                                    Kids: "Kids-Items",
                                }
                            }
                        />

                    </Content2Xl>
                </Container>
                <Footer/>
            </AnimationRevealPage>
        )
    }
}


export default HomePage

