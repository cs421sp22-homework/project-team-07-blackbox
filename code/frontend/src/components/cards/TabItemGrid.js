import React, { useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";


const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;
const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${props => props.active && tw`bg-pink-500! text-gray-100!`}
  }
`;

const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(motion.a)`bg-gray-100 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}"); `}
  ${tw`xl:h-64 bg-center bg-contain bg-no-repeat relative rounded-t`}
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm bg-pink-500 hocus:bg-pink-900`;


const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-pink-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;



export default ({
                    heading = "Checkout the Menu",
                    tabs = {
                        Starter: [
                            {
                                imageSrc:
                                    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
                                title: "Veg Mixer",
                                content: "Tomato Salad & Carrot",
                                price: "$5.99",
                                rating: "5.0",
                                reviews: "87",
                                url: "#"
                            }
                        ],

                    },
                    moreLink = {
                        Starter: "www.baidu.com"
                    }
                }) => {
    /*
     * To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab
     * as the key and value of the key will be its content (as an array of objects).
     * To see what attributes are configurable of each object inside this array see the example above for "Starters".
     */
    const tabsKeys = Object.keys(tabs);
    const [activeTab, setActiveTab] = useState(tabsKeys[0]);
    return (
        <div>
                <HeaderRow>
                    <Header>{heading}</Header>
                    <TabsControl>
                        {Object.keys(tabs).map((tabName, index) => (
                            <TabControl key={index} active={activeTab === tabName} onClick={() => setActiveTab(tabName)}>
                                {tabName}
                            </TabControl>
                        ))}
                    </TabsControl>
                </HeaderRow>

                {tabsKeys.map((tabKey, index) => (
                    <TabContent tw="flex justify-end"
                        key={index}
                        variants={{
                            current: {
                                opacity: 1,
                                scale:1,
                                display: "flex",
                            },
                            hidden: {
                                opacity: 0,
                                scale:0.8,
                                display: "none",
                            }
                        }}
                        transition={{ duration: 0.4 }}
                        initial={activeTab === tabKey ? "current" : "hidden"}
                        animate={activeTab === tabKey ? "current" : "hidden"}
                    >
                        {tabs[tabKey].map((card, index) => (
                            <CardContainer key={index}>
                                <Card className="group" href={card.url} initial="rest" whileHover="hover" animate="rest">
                                    <CardImageContainer imageSrc={card.imageSrc}>
                                        <CardHoverOverlay
                                            variants={{
                                                hover: {
                                                    opacity: 1,
                                                    height: "auto"
                                                },
                                                rest: {
                                                    opacity: 0,
                                                    height: 0
                                                }
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <CardButton>Buy Now</CardButton>
                                        </CardHoverOverlay>
                                    </CardImageContainer>
                                    <CardText>
                                        <CardTitle>{card.title}</CardTitle>
                                        <CardContent>{card.content}</CardContent>
                                        <CardPrice>{card.price}</CardPrice>
                                    </CardText>
                                </Card>
                            </CardContainer>

                        ))}
                        <a href={moreLink[tabKey]} tw="mr-12 mt-4 text-pink-500">Find Out More</a>
                    </TabContent>

                ))}
        </div>
    );
};

