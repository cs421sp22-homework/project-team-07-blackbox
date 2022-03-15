import React, {Component} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import {ReactComponent as SvgDotPatternIcon} from "../../images/dot-pattern.svg";
import Multiselect from 'multiselect-react-dropdown';
import OrderService from "api/styleBox/OrderService";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const Button = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-pink-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-pink-700 hocus:-translate-y-px hocus:shadow-xl`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-gray-100 text-pink-500 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-black text-base font-medium tracking-wide border-b-2 py-2 text-black hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div` flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-pink-500 text-gray-100 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-pink-700 hocus:-translate-y-px hocus:shadow-xl`;
const Select = tw.select`w-full  mt-6 py-3 bg-gray-100 text-pink-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-pink-700 hocus:-translate-y-px hocus:shadow-xl`;
const MultiSelect = tw(Multiselect)`w-full  mt-6 bg-gray-100 text-pink-500  tracking-wide text-sm transition duration-300 
transform hover:text-pink-700 hover:bg-gray-200`;



const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-pink-500 fill-current w-24`


class CreateOrderForm extends Component{
  constructor(props){
    super(props)

    this.state = {
      styles : [{name: 'Academic', id: 1},
        {name: 'Casual', id: 2},
        {name: 'Sexy', id: 3},
        {name: 'Sports', id: 4},
        {name: 'Formal', id: 5}],
      occasions : [{name: 'Date', id: 1},
        {name: 'Meeting', id: 2},
        {name: 'Party', id: 3},
        {name: 'Daily', id: 4},
        {name: 'Travel', id: 5}],
      selectedStyles: [],
      selectedOccasions: [],
      orderPrice: 0,
      clothPriceLow: 0,
      clothPriceHigh: 0,
      description: ''
      
    }
    
    this.onSelectStyle = this.onSelectStyle.bind(this)
    this.onRemoveStyle = this.onRemoveStyle.bind(this)
    this.onSelectOccasion = this.onSelectOccasion.bind(this)
    this.onRemoveOccasion = this.onRemoveOccasion.bind(this)
    this.submitInfo = this.submitInfo.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.show = this.show.bind(this)
  }

  onSelectStyle(selectedList, selectedItem){
    this.setState({
      selectedStyles: selectedList
    })
  }

  onRemoveStyle(selectedList, selectedItem){
    this.setState({
      selectedStyles: selectedList
    })
  }

  onSelectOccasion(selectedList, selectedItem){
    this.setState({
      selectedOccasions: selectedList
    })
  }

  onRemoveOccasion(selectedList, selectedItem){
    this.setState({
      selectedOccasions: selectedList
    })
  }

  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  show(){
    console.log(this.state.selectedStyles)
  }

  submitInfo(event){
    let info = {
      styleSet : this.state.selectedStyles,
      occasionSet: this.state.selectedOccasions,
      description: this.state.description,
      orderPrice: this.state.orderPrice,
      clothPriceLow: this.state.clothPriceLow,
      clothPriceHigh: this.state.clothPriceHigh
    }
    event.preventDefault();
    console.log("create info")
    OrderService.createOrder(this.props.stylist.stylistId,info) //this.props.location.stylistId
    .then((response)=>{
      console.log(response.data);
      alert("Create order success!");
      this.props.history.push({
        pathname:'/stylist/homepage',
        state: {
          stylistId: this.props.stylist.stylistId
        }
      });
    })
    .catch((error) => {
      console.log(error.response);
      alert("Create order failed. Please try again.");
      // this.props.history.push("/");
    })
  }

  render(){
  return (
    <Container>
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2 align="center">Create an Order</h2>
            <form>

                <Column>
                  <div>Stylist Name: {this.props.stylist.nickname}</div>
                  <div>Stylist ID: {this.props.stylist.stylistId}</div>
                  <InputContainer>
                    <Label htmlFor="style-input">Select style(s) that you want stylist to design.</Label>
                    <MultiSelect
                      options={this.state.styles} // Options to display in the dropdown
                      selectedValues={this.state.selectedStyles} // Preselected value to persist in dropdown
                      onSelect={this.onSelectStyle} // Function will trigger on select event
                      onRemove={this.onRemoveStyle} // Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                      />
                    
                    {/* <Button onClick={this.show}>test</Button> */}
                  </InputContainer>

                  <InputContainer>
                    <Label htmlFor="occasion-input">Select occasion(s) that you will dress for.</Label>
                    <MultiSelect
                      options={this.state.occasions} // Options to display in the dropdown
                      selectedValues={this.state.selectedOccasions} // Preselected value to persist in dropdown
                      onSelect={this.onSelectOccasion} // Function will trigger on select event
                      onRemove={this.onRemoveOccasion} // Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                      />
                    {/* <Input id="email-input" type="email" name="email" placeholder="E.g. john@mail.com" /> */}
                  </InputContainer>

                  <InputContainer>
                    <Label >How much do you want to pay for this design?</Label>
                    <Input pattern="[0-9]*" type="text" name="orderPrice" placeholder="10" onChange={this.handleChange}/>
                  </InputContainer>

                  <InputContainer>
                    <Label >What price of clothing is acceptable for you?</Label>
                    <Input pattern="[0-9]*" type="text" name="clothPriceLow" placeholder="0" onChange={this.handleChange}/>
                    <Input pattern="[0-9]*" type="text" name="clothPriceHigh" placeholder="100" onChange={this.handleChange}/>
                  </InputContainer>

                  <InputContainer tw="flex-1">
                    <Label htmlFor="name-input">What other things do you want to talk to the stylist?</Label>
                    <TextArea id="message-input" name="description" placeholder="Details about your request." onChange={this.handleChange}/>
                  </InputContainer>
                </Column>

              <SubmitButton type="submit" value="Submit" onClick={this.submitInfo}>Submit</SubmitButton>
            </form>
          </div>
          <SvgDotPattern1 />
        </FormContainer>
      </Content>
    </Container>
  )}
}

export default CreateOrderForm