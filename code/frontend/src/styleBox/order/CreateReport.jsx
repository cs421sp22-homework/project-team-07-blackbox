import React, {Component} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import {ReactComponent as SvgDotPatternIcon} from "../../images/dot-pattern.svg";
import Multiselect from 'multiselect-react-dropdown';
import ReportService from "api/styleBox/ReportService";
import NavBarAuthenticated from "styleBox/navBar_footer/NavBarAuthenticated";
import Footer from "styleBox/navBar_footer/Footer";
import ImageUploader from "react-images-upload";
import TableDemo from "./TableDemo";


const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const Button = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-pink-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-pink-700 hocus:-translate-y-px hocus:shadow-xl`;
const BackButton = tw.button`mx-8 mt-10 mt-8 md:mt-8 sm:w-32 mt-6 py-3 bg-pink-500 text-gray-100 rounded-full font-bold tracking-wide 
shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-pink-700 hocus:-translate-y-px hocus:shadow-xl
absolute left-1/2`;

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

const TwoColumn = tw.div`relative flex flex-col sm:flex-row justify-between`;
const Column = tw.div`relative flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`relative top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-pink-500 text-gray-100 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-pink-700 hocus:-translate-y-px hocus:shadow-xl`;
const Select = tw.select`w-full  mt-6 py-3 bg-gray-100 text-pink-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-pink-700 hocus:-translate-y-px hocus:shadow-xl`;
const MultiSelect = tw(Multiselect)`w-full  mt-6 bg-gray-100 text-pink-500  tracking-wide text-sm transition duration-300 
transform hover:text-pink-700 hover:bg-gray-200`;



const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-pink-500 fill-current w-24`


class CreateReportForm extends Component{
  constructor(props){
    super(props)

    this.state = {
      // orderId: this.props.orderId,
      orderId: 1,
      outfitImage: [],
      idea:'',
      items: [],
      
    }
    
    this.submitInfo = this.submitInfo.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.back = this.back.bind(this)
    this.onDropOutfit = this.onDropOutfit.bind(this)
    this.setItems = this.setItems.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  back(){
    this.props.history.push({
        pathname:'/orderDetail',
        query: {
            id: this.state.orderId,
        }
    })
    // console.log(this.state.outfitImage)
    // console.log(this.state.items)
  }

  onDropOutfit(pictureFiles, pictureDataURLs){
    this.setState({
      outfitImage: pictureFiles
    });
    
  }

  setItems(allItems){
    this.setState({
      items:allItems
    })
  }

  submitInfo(event){
    let info = {
      outfitImage: this.state.outfitImage,
      idea: this.state.idea,
      items: this.state.items.map((item)=>{
        var newItem = {
          itemsId: item.itemsId,
		      itemName: item.itemName,
		      link: item.link,
		      itemImage: item.itemImage,
        }
        return newItem
      }),
    }
    event.preventDefault();
    console.log(info)

    ReportService.createReport(this.state.orderId, info) 
    .then((response)=>{
      console.log(response.data);
      alert("Create report success!");
      this.props.history.push({
        pathname:'/orderDetail',
        query: {
            id: this.state.orderId,
        }
      })
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
      <NavBarAuthenticated/>
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2 align="center">Create an Report</h2>        
            <form>
            <Column>
            <Label >Order number: {this.props.location.query.id}</Label>
            </Column>
            <TwoColumn>
                <Column>
                  <Label >Stylist Name: stylist1</Label>
                  <Label >Stylist ID: 0001</Label>
                  {/* <Label >Stylist Name: {this.props.stylistName}</Label>
                  <Label >Stylist ID: {this.props.stylistId}</Label> */}
                </Column>
                <Column>
                  <Label ></Label>
                  <Label >Customer Name: customer1</Label>
                  <Label >Customer ID: 0002</Label>
                  {/* <Label >Customer Name: {this.props.customerName}</Label>
                  <Label >Customer ID: {this.props.customerId}</Label> */}
                </Column>
              </TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="style-input">Upload Outfite Image:</Label>
                    <ImageUploader
                      withIcon={true}
                      withPreview={true}
                      withLabel={false}
                      buttonText="Choose images"
                      // buttonStyles={{background:'rgb(236 72 153'}}
                      onChange={this.onDropOutfit}
                      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                      maxFileSize={5242880}
                    />
                  </InputContainer>

                  <InputContainer>
                    <Label>Outfit Design Idea:</Label>
                    <TextArea id="message-input" name="idea" placeholder="Details about your design." onChange={this.handleChange}/>
                    </InputContainer>

                  <InputContainer>
                    <Label>Items for Outfit:</Label>
                    <TableDemo setItems={this.setItems}/>
                  </InputContainer>

                </Column>

              <SubmitButton type="submit" value="Submit" onClick={this.submitInfo}>Submit</SubmitButton>
            </form>
          </div>
          <SvgDotPattern1 />
        </FormContainer>
      </Content>
      <BackButton onClick={this.back}>Back</BackButton>
      <Footer/>
    </Container>
  )}
}

export default CreateReportForm