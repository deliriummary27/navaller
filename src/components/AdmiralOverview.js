import React, { Component } from 'react'
import axios from 'axios'
import Admiral from './Admiral'
export default class AdmiralOverview extends Component {

    state = {
        admirals: []
    }

    componentDidMount() {
        axios.get('api/admirals/')
            .then(res => {
                return this.setState({
                    admirals: res.data
                })
            })
    }

    render() {
        const admiralList = this.state.admirals.filter(it => it.id === 1 || it.id === 2 || it.id === 3 || it.id === 4 || it.id === 5)
        const admiral = admiralList.map(item => {
            return <Admiral admiral={item}/>
        })

        return (
            <div className='admiral-overview d-flex'>
                {admiral}
            </div>
        )
    }
}


