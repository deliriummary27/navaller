import React, { Component } from 'react'
import axios from 'axios'
import TimelinePoint from './TimelinePoint'

export default class Timeline extends Component {


    state = {
        data: [],
        box: null
    }

    componentDidMount() {
        axios.get('http://deliriummary.pythonanywhere.com/timeline/')
            .then(res => this.setState({
                data: res.data
            }))
    }

    handleHover = (event) => {

        const id = event.target.id
        const boxData = this.state.data.filter(item => item.title === id)
        this.setState({
            box: boxData[0]
        })
    }   

    handleHoverOut = (event) => {
        this.setState({
            box: null
        })
    }

    render() {
        const isDistanceNeeded = (ind) => {
            if (ind !== 0 && ind !== (this.state.data.length - 1)) {
                if (parseInt(this.state.data[ind].year) - parseInt(this.state.data[ind - 1].year) < 12 || this.state.data[ind].year - this.state.data[ind - 1] > -12) {
                    return true
                } else {
                    return false
                }
            }
        }
        const list = this.state.data.sort(function(a, b) {
            return a.year - b.year;
        });
        const point = list.map(item => {
            const indx = list.indexOf(item)
            return(
                <TimelinePoint previous={indx !== 0 ? parseInt(list[indx - 1].year) : null} id={item.title} distanceNeeded={isDistanceNeeded(indx)} index={item.id} box={this.state.box} data={this.state.data} handleHover={this.handleHover} handleHoverOut={this.handleHoverOut} year={item.year}/>  
                  
            )
        })

        return (
            <>
            <div className='timeline'>
                {point} 
            </div>
            </>
        )
    }
}

