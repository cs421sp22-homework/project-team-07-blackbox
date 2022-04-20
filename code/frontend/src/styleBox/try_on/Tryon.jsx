import React, {Component} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading as HeadingTitle } from "../../components/misc/Headings";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../images/svg-decorator-blob-3.svg";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import NavBarAuthenticated from "../navBar_footer/NavBarAuthenticated";
import ImageUploader from "react-images-upload";
import TryonService from "api/styleBox/TryonService";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const ThreeColumn = tw.div`flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap`;
const SmallColumn = tw.div`mt-24 lg:w-1/12`;
const Column = tw.div`mt-24 lg:w-1/4`;
const LargeColumn = tw.div`mt-24 lg:w-1/3`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-sm`;

const Card = tw.div`lg:mx-4 xl:mx-8 max-w-sm lg:max-w-xs`;
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`bg-cover bg-center h-80 lg:h-64 rounded`
]);
const Empty = tw.div`bg-cover bg-center h-40 lg:h-1 rounded`
const Plus = tw.div`mt-24 ml-12 lg:h-4 lg:w-1/12 leading-relaxed font-bold text-2xl`
const Category = tw.div`mt-4 text-secondary-100 font-bold text-sm`;
const Title = tw.h4`mt-2 leading-relaxed font-bold text-lg`;
const Link = tw.a`inline-block mt-2 text-sm text-primary-500 font-bold cursor-pointer transition duration-300 border-b-2 border-transparent hover:border-primary-500`;
const Button = tw.button`mt-20 py-3 bg-pink-500 text-gray-100 rounded-full font-bold tracking-wide 
shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-pink-700 hocus:-translate-y-px hocus:shadow-xl`;

const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`-z-10 absolute bottom-0 right-0 w-48 h-48 transform translate-x-40 -translate-y-8 opacity-25`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob2
)`-z-10 absolute top-0 left-0 w-48 h-48 transform -translate-x-32 translate-y-full opacity-25`;

class Tryon extends Component{
  constructor(props){
    super(props)

    this.state = {
      personImage: [],
      clothesImage: [],      
    }
    
    this.submit = this.submit.bind(this)
    this.onDropPerson = this.onDropPerson.bind(this)
    this.onDropClothes = this.onDropClothes.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onDropPerson(pictureFiles, pictureDataURLs){
    this.setState({
      personImage: pictureFiles
    });
  }

  onDropClothes(pictureFiles, pictureDataURLs){
    this.setState({
      clothesImage: pictureFiles
    });
  }

  submit(){
    let info={
      personImage: this.state.personImage,
      clothesImage:this.state.clothesImage,
    }

    console.log(info)

    TryonService.getTryon(info) 
    .then((response)=>{
      console.log(response.data);
      alert("Create Tryon success!");
      // this.props.history.push({
      //   pathname:'/TryonResult',
      //   query: {
      //       tryonImage: this.state.orderId,
      //   }
      // })
    })
    .catch((error) => {
      console.log(error.response);
      alert("Create order failed. Please try again.");
      // this.props.history.push("/");
    })
  }

  render(){
  return (   
    <AnimationRevealPage>
      <NavBarAuthenticated/>
      <Container>
      
      <Content>
        <HeadingInfoContainer>
          <HeadingTitle>Virtual Try-On</HeadingTitle>
          <HeadingDescription>Upload your images and generate try-on result!</HeadingDescription>
        </HeadingInfoContainer>
        <ThreeColumn>
          {/* {blogPosts.map((post, index) => (
            <Column key={index}>
              <Card>
                <Image imageSrc={post.imageSrc} />
                <Category>{post.category}</Category>
                <Title>{post.title}</Title>
                <Link href={post.url}>Read Post</Link>
              </Card>
            </Column>
           ))}  */}
          <Column>
            <Card>
            <ImageUploader
                      withIcon={true}
                      withPreview={true}
                      withLabel={false}
                      buttonText="Choose images"
                      buttonStyles={{background:'rgb(236 72 153'}}
                      onChange={this.onDropPerson}
                      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                      maxFileSize={5242880}
                    />
              
            </Card>
          </Column>

          <SmallColumn >
            <Empty/>
            <Plus>
              +
            </Plus>
          </SmallColumn>

          <Column>
          <Card>
            <ImageUploader
                      withIcon={true}
                      withPreview={true}
                      withLabel={false}
                      buttonText="Choose images"
                      buttonStyles={{background:'rgb(236 72 153'}}
                      onChange={this.onDropClothes}
                      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                      maxFileSize={5242880}
                    />
            </Card>
          </Column>

          <SmallColumn >
            <Empty/>
            <Plus>
              =
            </Plus>
          </SmallColumn>

          <LargeColumn>
            <Card><Button onClick={this.submit}>Generate try-on</Button></Card>
            {/* <Card>
              <Image imageSrc={this.blogPosts[1].imageSrc} />
              <Category>{this.blogPosts[1].category}</Category>
              <Title>{this.blogPosts[1].title}</Title>
              <Link href={this.blogPosts[1].url}>Read Post</Link>
          </Card> */}
            
          </LargeColumn>
        </ThreeColumn>
      </Content>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
    </AnimationRevealPage>
  );}
};


export default Tryon