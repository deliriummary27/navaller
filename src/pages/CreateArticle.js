import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class CreateArticle extends Component {

    state = {
        images: null
    }

    handleFiles = event => {
        const img = event.target.files[0]
        this.setState({
            images: img
        })
    }

    handleSubmit = (event) => {
        const title = event.target.elements.title.value
        const content = event.target.elements.content.value
        const image = this.state.images
        const author = this.props.id
        const uploadData = new FormData()
        uploadData.append('title', title)
        uploadData.append('author', author)
        uploadData.append('content', content) 
        uploadData.append('image', image, image.name) 
        axios.post('http://rallendalle.pythonanywhere.com/api/articles/', uploadData)
        .then(this.props.history.push('/profile'))
    }

    render() {
        return (
            <form className='form-group create-form' onSubmit={this.handleSubmit}>
                <div>
                <label for='title'>Title</label>
                <input name='title' id='title' className='form-control' placeholder='Add a title...'></input>
                </div>
                <div>
                <label for='title'>Content</label>
                <textarea name='content' id='content' className='form-control' placeholder='Write your article here...'></textarea>
                </div>
                <div>
                <label for='image'>Upload an image</label>
                <input type='file' name='image' id='image' className='form-control image-input' onChange={this.handleFiles}></input>
                </div>
                <button className='btn btn-primary' type='submit'>Submit</button>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        id: state.id,
        isAuthenticated: state.token = !null
    }
}


export default connect(mapStateToProps, null)(CreateArticle)
