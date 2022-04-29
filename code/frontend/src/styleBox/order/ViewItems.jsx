import React,{Component} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { motion } from "framer-motion";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import {API_URL} from "../../Constants";

// const Row = tw.div`flex flex-col lg:flex-row -mb-10`;
const Heading = tw(SectionHeading)`text-left lg:text-4xl xl:text-5xl`;

const PostsContainer = tw.div`mt-12 flex flex-col sm:flex-row sm:justify-between lg:justify-start`;
const Post = tw(motion.a)`block sm:max-w-sm cursor-pointer mb-16 last:mb-0 sm:mb-0 sm:odd:mr-8 lg:mr-8 xl:mr-16`;
const Image = styled(motion.div)(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-64 bg-cover bg-center rounded`
]);
const Title = tw.h5`mt-6 text-xl font-bold transition duration-300 group-hover:text-primary-500`;
const AuthorName = tw.h6`font-semibold text-lg`;

const RecentPostsContainer = styled.div`
  ${tw`mt-24 lg:mt-0`}
  ${PostsContainer} {
    ${tw`flex flex-wrap lg:flex-col`}
  }
  ${Post} {
    ${tw`flex justify-between mb-10 max-w-none w-full sm:w-1/2 lg:w-auto sm:odd:pr-12 lg:odd:pr-0 mr-0`}
  }
  ${Title} {
    ${tw`text-base xl:text-lg mt-0 mr-4 lg:max-w-xs`}
  }
  ${AuthorName} {
    ${tw`mt-3 text-sm text-secondary-100 font-normal leading-none`}
  }
  ${Image} {
    ${tw`h-20 w-20 flex-shrink-0`}
  }
`;
const PostTextContainer = tw.div``

// This setting is for animating the post background image on hover
const postBackgroundSizeAnimation = {
  rest: {
    backgroundSize: "100%"
  },
  hover: {
    backgroundSize: "110%"
  }
};

const recentPosts = [
  {
    postImageSrc:
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
    title: "Getting the most out of your vacation",
    authorName: "Aaron Patterson",
    url: "https://reddit.com"
  },
  {
    postImageSrc:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
    title: "Choosing the perfect Safaris in Africa",
    authorName: "Sam Phipphen",
    url: "https://reddit.com"
  },
  {
    postImageSrc:
      "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
    title: "Hiking during the monsoon in Asia",
    authorName: "Tony Hawk",
    url: "https://timerse.com"
  },
  {
    postImageSrc:
      "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
    title: "Must carry items while travelling to Thailand",
    authorName: "Himali Turn",
    url: "https://timerse.com"
  },
  {
    postImageSrc:
      "https://images.unsplash.com/photo-1546971587-02375cbbdade?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=641&q=80",
    title: "An extremely funny trip to the Swiss Alps",
    authorName: "Naomi Watts",
    url: "https://timerse.com"
  },
]

class ViewItems extends Component{
  constructor(props){
    super(props)

    this.state = {
    }
  }

  render(){
  return (
    <Container>
      <ContentWithPaddingXl>
          <RecentPostsContainer>
            <Heading>Items</Heading>
            <PostsContainer>
              {this.props.items.map((item, index) => (
              <Post key={index} href={item.link} className="group">
                <PostTextContainer>
                  <div>{index+1}</div>
                  <Title>{item.itemName}</Title>
                  <AuthorName>{item.itemId}</AuthorName>
                </PostTextContainer>
                <Image imageSrc={item.itemImage} />
                {/* <Image imageSrc={item.itemImage} /> */}
              </Post>
              ))}
            </PostsContainer>
          </RecentPostsContainer>
      </ContentWithPaddingXl>
    </Container>
  );
};}

export default ViewItems;
