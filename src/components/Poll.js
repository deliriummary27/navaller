import React, { Component } from 'react'
import axios from 'axios'

export default class Poll extends Component {


    state = {
        questions: [], 
        options: [],
        isClicked: false,
        chosenID: 0
    }



    componentDidMount() {
        axios.get('api/questions/')
            .then(res => {
                this.setState({
                    questions: res.data
                })
            })
        axios.get('api/options/')
            .then(res => {
                this.setState({
                    options: res.data
                })
            })
    }


    handleSubmit = (event) => {
        let question = () => {
            if (this.props.articleType === 'admiral') {
                return this.state.questions.filter(it => it.admiral === this.props.item.id)[0]
            } else if (this.props.articleType === 'article') {
                return this.state.questions.filter(it => it.article === this.props.item.id)[0]
            } else {
                return this.state.questions.filter(it => it.timeline === this.props.item.id)[0]
            }}
        if(question() !== undefined) {
            const id = parseInt(event.target.lang)
            let option = this.state.options.filter(it => it.question === question().id)
            let optionSpecial = option.filter(it => it.id === id)
            const name = event.target.id
            axios.put(`api/options/${id}/`, {
                opt: name,
                votes: optionSpecial[0].votes + 1,
                article: this.props.item.id
            })
        }
        
    }

    handleClick = (event) => {
        const chosenID = parseInt(event.target.lang)
        return this.setState({
            chosenID: chosenID
        })
    }

    render() {
        let question = () => {
            if (this.props.articleType === 'admiral') {
                return this.state.questions.filter(it => it.admiral === this.props.item.id)[0]
            } else if (this.props.articleType === 'article') {
                return this.state.questions.filter(it => it.article === this.props.item.id)[0]
            } else {
                return this.state.questions.filter(it => it.timeline === this.props.item.id)[0]
            }}
        if (question() !== undefined) {
        let option = this.state.options.filter(it => it.question === question().id)
        let opti = option.map(it => {
        return (
            <div>
            {this.state.isClicked === false ? 
            <div className='poll-options'>
            <input type='radio' id={it.opt} name='optionie' lang={it.id} onClick={this.handleClick} onChange={this.handleSubmit}></input>
            <label for={it.opt}>{it.opt}</label>
            </div>
            : <div style={{marginBottom: '10px'}} className='poll-results'>
                <label>{it.opt}</label>
                <div className='poll-results-container'>
                    <div style={{position: 'absolute', height: '20px', width: `${it.votes * 5}px`, backgroundColor: `${it.id === this.state.chosenID ? 'rgb(50, 216, 35)' : 'orange'}`}}> 
                    <small key={it.id}>{it.id === this.state.chosenID ? it.votes + 1 : it.votes}</small>
                    </div>
                </div>
            </div>}
            </div>
            )
            })
        return (
            <div>
                <h5 className='diplay-5' style={{marginTop: '100px', color: 'rgb(0, 165, 230)', fontSize: '30px'}}>{question().ques}</h5>
                <form className='poll-container' onSubmit={this.handleSubmit}>
                    {opti}
                    <br></br>
                </form>
                <button className='btn btn-primary' onClick={() => {this.setState({isClicked: true})}}>Results</button>
            </div>
        )
        }
        else {
            return <div></div>
        }
        
    }
}
