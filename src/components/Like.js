import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'


class Like extends Component {

    state = {
        likes: [],
        starsCount: 0
    }

    componentDidMount() {
        console.log(this.props.arti)
        axios.get('http://127.0.0.1:8000/api/likes/')
            .then(res => {
                this.setState({
                    likes: res.data
                })
            })
    }

    changeState = () => {
        this.setState({
            isClicked: !this.state.isClicked
        })
    }

    handleClick = () => {
        this.changeState()
        let like = () => {
            if (this.props.articleType === 'article') {
                return this.state.likes.filter(it => it.article === parseInt(this.props.item.id))[0]
            } else if (this.props.articleType === 'admiral') {
                return this.state.likes.filter(it => it.admiral === parseInt(this.props.item.id))[0]
            } else {
                return this.state.likes.filter(it => it.timeline === parseInt(this.props.item.id))[0]
            }
        }
        const id = like().id
        axios.put(`http://127.0.0.1:8000/api/likes/${id}/`, {
            likes: like().likes + this.state.starsCount,
            people: like().people + 1
        })
        
    }

    render() {
        let like = () => {
            if (this.props.articleType === 'article') {
                return this.state.likes.filter(it => it.article === parseInt(this.props.item.id))
            } else if (this.props.articleType === 'admiral') {
                return this.state.likes.filter(it => it.admiral === parseInt(this.props.item.id))
            } else {
                return this.state.likes.filter(it => it.timeline === parseInt(this.props.item.id))
            }
        }
        return (
            <div className='stars-container'>
            <form className='stars' onSubmit={this.handleClick}>
                <FontAwesomeIcon icon={faStar} style={this.state.starsCount !== 0 ? {color: 'rgb(0, 165, 230)'} : {}} onClick={() => this.setState({starsCount: 1})}/>
                <FontAwesomeIcon icon={faStar} style={this.state.starsCount > 1 ? {color: 'rgb(0, 165, 230)'} : {}} onClick={() => this.setState({starsCount: 2})}/>
                <FontAwesomeIcon icon={faStar} style={this.state.starsCount > 2 ? {color: 'rgb(0, 165, 230)'} : {}} onClick={() => this.setState({starsCount: 3})}/>
                <FontAwesomeIcon icon={faStar} style={this.state.starsCount > 3 ? {color: 'rgb(0, 165, 230)'} : {}} onClick={() => this.setState({starsCount: 4})}/>
                <FontAwesomeIcon icon={faStar} style={this.state.starsCount > 4 ? {color: 'rgb(0, 165, 230)'} : {}} onClick={() => this.setState({starsCount: 5})}/>
                <button type='submit' className='btn btn-link'>Submit</button>
            </form>
            {like().map(it => <p>{String(it.likes / it.people).slice(0, 4)}</p>)}
            </div>
        )
    }
}



export default Like
