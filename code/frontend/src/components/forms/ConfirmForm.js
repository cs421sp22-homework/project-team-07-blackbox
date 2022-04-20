import React, {Component} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import {css} from "styled-components/macro"; //eslint-disable-line
import {SectionHeading, Subheading as SubheadingBase} from "components/misc/Headings.js";
import {PrimaryButton as PrimaryButtonBase} from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/email-illustration.svg";
import Rate from "../../styleBox/order/Star";
import orderService from "../../api/styleBox/OrderService";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
    tw`md:w-7/12 mt-16 md:mt-0`,
    props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-pink-500`
const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24`}
`

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`

class ConfirmForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: ""
        }
        this.confirm = this.confirm.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    confirm() {
        console.log("here")
        console.log("stars",this.child.state.num)
        console.log(this.state.comment)
        console.log(this.props.orderId)
        orderService.confirmOrder(this.child.state.num, this.state.comment, this.props.orderId)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                alert(error.response.data.displayMessage)
            })

        let info = {
            rate: this.child.state.num,
            comment: this.state.comment
        }
        console.log(info)
        this.props.history.push({
            pathname:'/orderDetail',
            query: {
                id: this.state.orderId,
                orderStatus: 6
            }
        })
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render() {
        return (
            <Container>
                <TwoColumn>
                    <ImageColumn>
                        <Image imageSrc={EmailIllustrationSrc}/>
                    </ImageColumn>
                    <TextColumn textOnLeft="...">
                        <TextContent>
                            {/*<Subheading>Please rate your stylist: {this.props.stylist.nickname}</Subheading>*/}
                            <Subheading>Please rate your stylist</Subheading>
                            <Heading>{<>Your order is <span tw="text-pink-600"> completed! </span><wbr/></>}</Heading>
                            {/*{description && <Description>{description}</Description>}*/}
                            <Form>
                                <Rate onRef={(ref) => { this.child = ref; }}/>
                                <Textarea name="comment" placeholder="Your Comment Here..." onChange={this.handleChange}/>
                                <SubmitButton type="submit" onClick={this.confirm}>Confirm</SubmitButton>
                            </Form>
                        </TextContent>
                    </TextColumn>
                </TwoColumn>
            </Container>
        );
    }
}

export default ConfirmForm

