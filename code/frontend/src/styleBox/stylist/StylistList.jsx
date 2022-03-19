import tw from 'twin.macro'
import React, {Component} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "styleBox/navBar_footer/Footer.jsx";
import Cookies from 'react-cookies';
import { Container as ContainerBase} from "components/misc/Layouts";
import NavBar from "styleBox/navBar_footer/NavBar.jsx";
import NavBarCustomer from '../navBar_footer/NavBarCustomer';
import NavBarStylist from 'styleBox/navBar_footer/NavBarStylist';
import StylistListSingleProfile from "../../components/testimonials/StylistListSingleProfile";
import StylistListService from "api/styleBox/StylistListService";
import styled from "styled-components";
import {SectionHeading, Subheading as SubheadingBase} from "../../components/misc/Headings";
import {PrimaryButton as PrimaryButtonBase} from "../../components/misc/Buttons";
import {ReactComponent as SvgDotPattern} from "../../images/dot-pattern.svg";
import {Link} from 'react-router-dom';
import { ReactComponent as ArrowLeftIcon } from "../../images/arrow-left-3-icon.svg";
import { ReactComponent as ArrowRightIcon } from "../../images/arrow-right-3-icon.svg";
import QuizService from "../../api/styleBox/QuizService";
import NavBarAuthenticated from "../navBar_footer/NavBarAuthenticated";
// const Container = tw(ContainerBase)`min-h-screen bg-pink-900 text-white font-medium flex justify-center mt-8`;
const Container = tw.div`relative`;
const Content = tw.div`m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
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

const PrimaryButton = tw(PrimaryButtonBase)`mt-8 md:mt-10 text-sm inline-block mx-auto md:mx-0 inline-block bg-pink-500 hover:bg-gray-100 hover:text-pink-500 focus:bg-pink-500 focus:text-gray-100 rounded-full`;

const DecoratorBlob = styled(SvgDotPattern)(props => [
    tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-pink-500 -z-10`
]);

const Controls = styled.div`
  ${tw`flex mt-8 sm:mt-0`}
  .divider {
    ${tw`my-3 border-r`}
  }
`;
const ControlButton = styled.button`
  ${tw`mx-3 p-4 rounded-full transition duration-300 bg-gray-200 hover:bg-gray-300 text-pink-500 hover:text-pink-700 focus:outline-none focus:shadow-outline`}
  svg {
    ${tw`w-4 h-4 stroke-3`}
  }
`;

class StylistList extends Component{
    constructor(props){
        super(props);

        this.state = {
            page:1,
            totalPage:5,
            style:"",
            sort:"",
            search:"",
            limit:5,
            stylistLists: [{
                avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80",
                rate: "4.0",
                intro:
                    "Charlotte Hale is an 3-year experienced stylist, who is proficient at casual style and using details to highlight personal characteristics. ",
                stylistId: 1,
                nickname: "Charlotte",
                followNum: "2282",

            },{
                avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80",
                rate: "5.0",
                intro:
                    "Maxine is an 3-year experienced stylist, who is proficient at casual style and using details to highlight personal characteristics. ",
                stylistId: 2,
                nickname: "Maxine",
                followNum: "1000",

            }]
        }
        this.searchBtn = this.searchBtn.bind(this)
        this.sortBtn = this.sortBtn.bind(this)
        this.styleBtn = this.styleBtn.bind(this)
        this.changePage = this.changePage.bind(this)
        this.showStylistList = this.showStylistList.bind(this)
        this.submitInfo = this.submitInfo.bind(this)
    }

    changePage(event){
        if(event.target.name ==="prevBtn"){
            let curPage = this.state.page;
            this.setState({page:this.state.page-1})
            //this.showStylistList(this.state.page,this.state.style,this.state.sort, this.state.search,this.state.limit)
            this.showStylistList(curPage-2,this.state.style,this.state.sort, this.state.search,this.state.limit)
        }
        if(event.target.name ==="nextBtn"){
            this.setState({page:this.state.page+1})
            this.showStylistList(this.state.page,this.state.style,this.state.sort, this.state.search,this.state.limit)
        }
        //this.showStylistList(this.state.page,this.state.style,this.state.sort, this.state.search,this.state.limit)
        
    }

    checkCustomer(){
        return Cookies.load('role')==='Customer';
    }

    searchBtn(event){
        this.setState({
            search:event.target.value
        })
    }

    sortBtn(event){
        this.setState({
            sort:event.target.value
        })
    }

    styleBtn(event){
        this.setState({
            style:event.target.value
        })
    }



    showStylistList(pageValue,styleValue,sortValue,searchValue,limitValue){
        StylistListService.getStylistList(pageValue,styleValue,sortValue,searchValue,limitValue)
            .then(response => {
                console.log(response.data)
                this.setState({

            stylistLists: response.data.data,
            totalPage: response.data.totalPages
        }
        )}
            )
            .catch(error => console.log(error.response))
    }
    submitInfo(){
        let info = {
            page: this.state.page,
            style: this.state.style,
            sort: this.state.sort,
            search: this.state.search,
            limit: this.state.limit

        }
        StylistListService.searchInfo(info)
            // .then(response => {
            // this.setState({
            //     page:0,
            //     style:"",
            //     sort:"",
            //     search:"",})
            // this.redirect()})
        // this.redirect();
        this.showStylistList(this.state.page-1,this.state.style,this.state.sort, this.state.search,this.state.limit)


    }


    componentDidMount(){
        this.showStylistList(0,"","","",5)
    }


    render() {
        return(
            <AnimationRevealPage>
                <NavBarAuthenticated/>
                {/*<StylistListSingleProfile stylistLists={this.state.stylistLists}/>*/}
                <div className="col-12 col-lg-5 text-right ">
                    {/*<input type="text" value={this.state.search} onChange = {this.props.changeFt}/>*/}
                    <input type="text" value={this.state.search} name="search" placeholder='Enter Search Keyword' onChange = {this.searchBtn}/>
                    <select   onChange={this.sortBtn}>
                        <option disabled selected value> - select an sort option - </option>
                        <option value="rate">rate</option>
                        <option value="followNum">followNum</option>
                        <option value="orderNum">orderNum</option>
                        <option value="">null</option>
                    </select>
                    <select  onChange={this.styleBtn}>
                        <option disabled selected value> - select an style option - </option>
                        <option value="Sexy">sexy</option>
                        <option value="Sports">sports</option>
                        <option value="Casual">casual</option>
                        <option value="Academic">academic</option>
                        <option value="Formal">formal</option>
                        <option value="">null</option>
                    </select>
                    <PrimaryButton name="submitBtn" className="add-btn btn-Search" type="submit"  onClick={this.submitInfo}>Search </PrimaryButton>

                </div>

                <Container>
                    {/*<Content>*/}
                    {/*<MainContainer>*/}
                    {/*<MainContent>*/}

                        {this.state.stylistLists.map((stylistLst, index) => (
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
                                        {/* <Link to={{pathname:'/stylistList', query:{stylistId:stylistLst.stylistId}}}>
                                            <PrimaryButton >
                                            {"Learn More"}
                                            </PrimaryButton>
                                        </Link> */}
                                        <PrimaryButton onClick={()=>{this.props.history.push({
                                            pathname:'/stylist/homepage',
                                            query:{stylistId: stylistLst.stylistId}
                                        })}}>Learn More</PrimaryButton>

                                    </TextContent>
                                </TextColumn>
                            </TwoColumn>
                        ))}

                        <div className="flex justify-center my-6 ">
                        <nav>
                        <ul className="flex list-style-none">
                                    {(this.state.page === 1)
                                        ? <li className="page-item disabled"><ControlButton
                                            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 pointer-events-none focus:shadow-none"
                                            tabindex="-1" aria-disabled="true"><ArrowLeftIcon /></ControlButton></li>
                                        : <li class="page-item"><ControlButton name='prevBtn'
                                            class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                            onClick={this.changePage}><ArrowLeftIcon /></ControlButton></li>}

                                    <li class="page-item"><p className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 pointer-events-none focus:shadow-none">{this.state.page}</p></li>

                                    {(this.state.page === this.state.totalPage)
                                        ? <li className="page-item disabled"><ControlButton
                                            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 pointer-events-none focus:shadow-none"
                                            tabindex="-1" aria-disabled="true"><ArrowRightIcon /></ControlButton></li>
                                        : <li class="page-item"><ControlButton name='nextBtn'
                                            class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                                            onClick={this.changePage}><ArrowRightIcon /></ControlButton></li>
                                    }
                                </ul>
                        </nav>
                    </div>
                    {/*</MainContent>*/}
                    {/*</MainContainer>*/}
                    {/*</Content>*/}
                </Container>
                <Footer />
            </AnimationRevealPage>
        )
    }
}


export default StylistList
