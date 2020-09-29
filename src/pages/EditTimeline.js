import React, { Component } from 'react'
import axios from 'axios'

class EditTimeline extends Component {

    state = {
        articles: [],
        inner: {
            title: null,
            year: null,
            image: null,
            des: null

        }
    }

    componentDidMount = () => {
        axios.get('http://deliriummary.pythonanywhere.com/timeline/')
        .then(res => {
            this.setState({
                articles: res.data,
                inner: {
                    title: res.data.filter(it => it.id === parseInt(window.location.pathname[window.location.pathname.length - 1]))[0].title,
                    year: res.data.filter(it => it.id === parseInt(window.location.pathname[window.location.pathname.length - 1]))[0].year,
                    des: res.data.filter(it => it.id === parseInt(window.location.pathname[window.location.pathname.length - 1]))[0].des,
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
        axios.patch(`http://deliriummary.pythonanywhere.com/timeline/${id}/`, uploadData)
    }

    handleSubmit = (event) => {
        const id = parseInt(window.location.pathname[window.location.pathname.length - 1])
        let title = event.target.elements.title.value
        let year = event.target.elements.year.value
        let des = event.target.elements.des.value
        axios.patch(`http://deliriummary.pythonanywhere.com/timeline/${id}/`, {
            title,
            year,
            des
        })
        .then(this.props.history.push(`/timeline/${id}`))
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
                    <label for='year'>Year</label>
                    <input className='form-control' name='year' id='year' value={this.state.inner.year} onChange={this.handleChange}></input>
                    </div>
                    <div>
                    <label for='des'>Description</label>
                    <textarea className='form-control' name='des' id='des' value={this.state.inner.des} onChange={this.handleChange}></textarea>
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




export default EditTimeline
