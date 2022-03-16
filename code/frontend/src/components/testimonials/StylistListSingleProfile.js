import React, {Component} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import StatsIllustrationSrc from "images/stats-illustration.svg";
import { ReactComponent as SvgDotPattern } from "images/dot-pattern.svg";
import StylistProfileImageIntro from "./StylistProfileImageIntro";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto relative`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left `;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const Statistics = tw.div`flex flex-col items-center sm:block text-center md:text-left mt-4`;
const Value = tw.div`text-left sm:inline-block sm:mr-12 last:mr-0 mt-4 font-bold text-lg sm:text-xl lg:text-2xl text-pink-500  tracking-wide`;
const Key = tw.div`text-left sm:inline-block sm:mr-12 last:mr-0 mt-4 font-medium text-pink-500`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-8 md:mt-10 text-sm inline-block mx-auto md:mx-0 `;

const DecoratorBlob = styled(SvgDotPattern)(props => [
  tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-pink-500 -z-10`
]);


  class StylistListSingleProfile extends Component {
    constructor(props) {
      super(props)

      this.state = {}
      //this.learnMore = this.learnMore.bind(this)



      // method part
    }

    render() {
      return (
          <Container>
            {this.props.stylistLists.map((stylistLst, index) => (
                <TwoColumn css={!true && tw`md:items-center`} key={index}>
                  <ImageColumn css={null}>
                    {true ? <Image imageSrc={stylistLst.avatar} css={null}/> :
                       <img src={null} css={null} alt=""/>}
                    {false && <DecoratorBlob css={null}/>}
                  </ImageColumn>
                  <TextColumn textOnLeft={false}>
                    <TextContent>
                      { <Subheading>Stylist Information</Subheading>}
                      {/*<Heading>{heading}</Heading>*/}
                      <Description>{stylistLst.intro}</Description>
                      <Statistics>

                        <div className="grid grid-cols-3">
                          <Value>{stylistLst.nickname}</Value>
                          <Value>{stylistLst.followNum}</Value>
                          <Value>{stylistLst.rate}</Value>
                        </div>

                        <div className="grid grid-cols-3">
                          <Key>{"Nickname"}</Key>
                          <Key>{"FollowerNum"}</Key>
                          <Key>{"Rate"}</Key>
                        </div>


                      </Statistics>
                      {/*onClick={this.learnMore.bind(this,testimonial.stylistId)}*/}
                      <PrimaryButton  href={null}>
                        {"Learn More"}
                      </PrimaryButton>
                    </TextContent>
                  </TextColumn>
                </TwoColumn>
            ))}
          </Container>
      )
    }

}
export default StylistListSingleProfile