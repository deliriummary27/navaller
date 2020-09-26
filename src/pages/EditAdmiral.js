import React, { Component } from 'react'
import axios from 'axios'

class EditAdmiral extends Component {

    state = {
        articles: [],
        inner: {
            title: null,
            subtitle: null,
            content: null,
            image: null

        }
    }

    componentDidMount = () => {
        axios.get('http://rallendalle.pythonanywhere.com/api/admirals/')
        .then(res => {
            this.setState({
                articles: res.data,
                inner: {
                    title: res.data.filter(it => it.id === parseInt(window.location.pathname[window.location.pathname.length - 1]))[0].title,
                    subtitle: res.data.filter(it => it.id === parseInt(window.location.pathname[window.location.pathname.length - 1]))[0].subtitle,
                    content: res.data.filter(it => it.id === parseInt(window.location.pathname[window.location.pathname.length - 1]))[0].content,
                }
            })
        })
    }

    handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        return this.setState({
            inner: {
                [name]: value
            }
        })
    }

    handlePhoto = event => {
        const id = parseInt(window.location.pathname[window.location.pathname.length - 1])
        let photo = event.target.files[0]
        const uploadData = new FormData()
        uploadData.append('image', photo, photo.name)
        axios.patch(`http://rallendalle.pythonanywhere.com/api/admirals/${id}/`, uploadData)
    }

    handleSubmit = (event) => {
        const id = parseInt(window.location.pathname[window.location.pathname.length - 1])
        let title = event.target.elements.title.value
        let content = event.target.elements.content.value
        const subtitle = event.target.elements.subtitle.value
        axios.patch(`http://rallendalle.pythonanywhere.com/api/admirals/${id}/`, {
            title,
            subtitle,
            content
        })
        .then(this.props.history.push(`/admirals/${id}`))
    }

    render() {
        const article = this.state.articles.filter(it => it.id === parseInt(window.location.pathname[window.location.pathname.length - 1]))
        const form = article.map(it => {
            return (
                <form className='form-group create-form' onSubmit={this.handleSubmit}>
                    <div>
                    <label for='title'>Title</label>
                    <input className='form-control' name='title' id='title' value={this.state.inner.title} onChange={this.handleChange}></input>
                    </div>
                    <div>
                    <label for='subtitle'>Subtitle</label>
                    <input className='form-control' name='subtitle' id='subtitle' value={this.state.inner.subtitle} onChange={this.handleChange}></input>
                    </div>
                    <div>
                    <label for='content'>Content</label>
                    <textarea className='form-control' name='content' id='content' value={this.state.inner.content} onChange={this.handleChange}></textarea>
                    </div>
                    <div>
                    <label for='image'>Image</label>
                    <input type='file' className='form-control image-input' name='image' id='image' onChange={this.handlePhoto}></input>
                    </div>
                    <button className='btn btn-primary' type='submit'>Submit</button>
                </form>
            )
        })
        return (
            <div>
                {form}
            </div>
        )
    }
}




export default EditAdmiral
