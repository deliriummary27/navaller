import React, { Component } from 'react'
import axios from 'axios'

export default class Comments extends Component {

    state = {
        comments: [],
        articleType: ''
    }


    componentDidMount() {
        axios.get('http://rallendalle.pythonanywhere.com/api/comments/')
            .then(res => {
                this.setState({
                    comments: res.data
                })
            })

    }


    handleSubmit = (event) => {
        let name = event.target.elements.name.value
        let content = event.target.elements.content.value
        let article = this.props.item.id
        
        if (this.props.articleType === 'article') {
            return axios.post('http://rallendalle.pythonanywhere.com/api/comments/', {
            name: name,
            content: content,
            article: article
        })
        } else if (this.props.articleType === 'admiral') {
            return axios.post('http://rallendalle.pythonanywhere.com/api/comments/', {
            name: name,
            content: content,
            admiral: article
        })
        } else {
            return axios.post('http://rallendalle.pythonanywhere.com/api/comments/', {
            name: name,
            content: content,
            timeline: article
        })
        }
    }

    render() {
        let comment = () => {
            if (this.props.articleType === 'admiral') {
                return this.state.comments.filter(it => it.admiral === this.props.item.id)
            } else if (this.props.articleType === 'article') {
                return this.state.comments.filter(it => it.article === this.props.item.id)
            } else {
                return this.state.comments.filter(it => it.timeline === this.props.item.id)
            }
        }

        let commentie = comment().map(it => {
            return(
            <div className='comments-inner'>
            <p key={it.id}>By {it.name}</p>
            <h4 key={it.id} className='lead'>{it.content}</h4>
            { it.id !== comment()[comment().length - 1].id ? <hr className='my-4'></hr> : <hr className='my-4' style={{display: 'none'}}></hr>}
            </div>
            )
        })
        return (
            <div>
                <div className='comments-main'>
                    <div className='comments-tag'>
                        <small className='lead'>Comments</small>
                    </div>
                    <div className='comments-container'>
                        {commentie}
                    </div>
                </div>
                <form onSubmit={this.handleSubmit} className='comment-form'>
                    <div className='form-group'>
                    <div className='comment-form-inner'>
                    <label for='name'>Name</label>
                    <input className='form-control' id='name' name='name' placeholder='Enter your name'></input>
                    </div>
                    <div className='comment-form-inner-main'>
                    <label for='content'>Comment</label>
                    <textarea className='form-control' id='content' name='content' placeholder='Write your comment here'></textarea>
                    </div>
                    <button className='btn btn-primary' type='submit'>comment</button>
                    </div>
                </form>
            </div>
        )
    }
}
