import React from 'react'
import navy1 from '../images/navy.jpg'
import navy2 from '../images/navy2.jpg'
import navy3 from '../images/navy3.jpg'
import arrowLeft from '../images/arrow-left.png'
import arrowRight from '../images/arrow-right.png'

const images = [navy1, navy2, navy3]
const texts = ['The Us Navy', 'The Indian Navy', 'A Destroyer Ship']

export default class Carousel extends React.Component {

    state = {
        image: 1
    }


    handleRightClick = event => {
        if (this.state.image < 2) {
            return this.setState(prevState => {
                return {
                    image: prevState.image + 1
                }
            })
        }
    }

    handleLeftClick = event => {
        if (this.state.image > 0) {
            return this.setState(prevState => {
                return {
                    image: prevState.image - 1
                }
            })
        }
    }

    render() {
        return (
        <div className='carousel slides'>
            <div className='carousel-inner'>
                <div className='carousel-item active'>
                    <img src={images[this.state.image]} alt='navy'></img>
                </div>
                <div className='carousel-arrow-left'>
                    <img onClick={this.handleLeftClick} src={arrowLeft} alt='arrow'></img>
                </div>
                <div className='carousel-arrow-right'>
                    <img onClick={this.handleRightClick} src={arrowRight} alt='arrow'></img>
                </div>
                <div className='banner'>
                    <h5 className='display-4'>{texts[this.state.image]}</h5>
                </div>
            </div>
        </div>
        )
    }
    
}
