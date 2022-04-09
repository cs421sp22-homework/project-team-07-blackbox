import React, {Component} from 'react'
import '../../styles/star.css'
import tw from "twin.macro";
import {Subheading as SubheadingBase} from "../../components/misc/Headings";

export default class Rate extends Component {
    state = {
        count: this.props.number || 5,
        num: this.props.def || 0,
        enter: 0,
        leave: this.props.def || 0,
        state: ['So bad', 'Not satisfied', 'Ordinary', 'Satisfied', 'Excellent']
    }
    /** 页面渲染前 */
    componentWillMount = () => {
    }
    /** 页面渲染后 */
    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }
    /** 数据更新前 */
    componentWillUpdate = () => {
        this.showState()
    }

    showState() {
        let {count, num, enter, state} = this.state
        if (num == 0 && enter == 0) {
            return ''
        } else if (num == 1 || enter == 1) {
            return state[0]
        } else if (num == 2 || enter == 2) {
            return state[1]
        } else if (num == 3 || enter == 3) {
            return state[2]
        } else if (num == 4 || enter == 4) {
            return state[3]
        } else if (num == 5 || enter == 5) {
            return state[4]
        }
    }

    /** 数据更新后 */
    componentDidUpdate = () => {
    }

    render() {
        let {count, num, enter, leave} = this.state
        return (
            <div className="rate">
                <p className="photo">
                    {new Array(count).fill().map((item, index) => (
                        <span
                            key={index}
                            onClick={() => {
                                num = index + 1
                                leave = num
                                this.setState({num, leave})
                            }}
                            onMouseEnter={() => {
                                enter = index + 1
                                num = 0
                                this.setState({enter, num})
                            }}
                            onMouseLeave={() => {
                                enter = 0
                                num = leave
                                this.setState({enter, num})
                            }}
                        >
              {enter > index ? (
                  <i className="high"/>
              ) : num > index ? (
                  <i className="high"/>
              ) : (
                  <i className="nohigh"/>
              )}
            </span>
                    ))}
                    <text className='font-bold text-pink-500'> {this.showState()} </text>
                </p>
            </div>
        )
    }
}

