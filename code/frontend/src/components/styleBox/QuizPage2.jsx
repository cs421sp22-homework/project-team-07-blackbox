import React, {Component} from 'react'
import QuizForm from "./QuizForm";
import "../../styles/tailwind.min.css"
import tw from 'twin.macro'

const heading = tw.div`mb-20 text-2xl text-pink-700`;
const HeadingLine = tw(heading)``;

class QuizPage2 extends Component{
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render() {
        return (
            <QuizForm>
                <span>
                    <form>
                        <HeadingLine>What size do you typically wear?</HeadingLine>
                        <div className=" grid grid-cols-2 gap-2">
                            <label>Shirt&Bouse</label>
                            <div className="grid grid-cols-2">
                                <select defaultValue="Medium" onChange={(e)=>this.setState({gender: e.target.value})}>
                                    <option value="XXS">XXS</option>
                                    <option value="XS">XS</option>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                    <option value="XL">XL</option>
                                    <option value="2XL">2XL</option>
                                    <option value="3XL">3XL</option>
                                </select>

                            </div>
                            <label>Bottoms</label>
                            <div className="grid grid-cols-2">
                                <select defaultValue="Medium" onChange={(e)=>this.setState({gender: e.target.value})}>
                                    <option value="XXS">XXS</option>
                                    <option value="XS">XS</option>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                    <option value="XL">XL</option>
                                    <option value="2XL">2XL</option>
                                    <option value="3XL">3XL</option>
                                </select>

                            </div>
                            <label>Jeans</label>
                            <div className="grid grid-cols-2">
                                <select defaultValue="Medium" onChange={(e)=>this.setState({gender: e.target.value})}>
                                    <option value="XXS">XXS</option>
                                    <option value="XS">XS</option>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                    <option value="XL">XL</option>
                                    <option value="2XL">2XL</option>
                                    <option value="3XL">3XL</option>
                                </select>
                            </div>
                            <label>Shoes</label>
                            <div className="grid grid-cols-2">
                                <select defaultValue="Medium" onChange={(e)=>this.setState({gender: e.target.value})}>
                                    <option value="XXS">XXS</option>
                                    <option value="XS">XS</option>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                    <option value="XL">XL</option>
                                    <option value="2XL">2XL</option>
                                    <option value="3XL">3XL</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className="grid grid-cols-2">
                        <button onClick={this.props.prevPage}>Prev</button>
                        <button onClick={this.props.nextPage}>Next</button>
                    </div>
                </span>

            </QuizForm>
        )
    }
}

export default QuizPage2