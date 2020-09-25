import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class CreateTimeline extends Component {

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
        const author = parseInt(this.props.id)
        const year = event.target.elements.year.value
        const image = this.state.images
        const des = event.target.elements.des.value
        const uploadData = new FormData()
        uploadData.append('title', title)
        uploadData.append('author', author)
        uploadData.append('year', year)
        uploadData.append('image', image, image.name) 
        uploadData.append('des', des) 
        axios.post('api/timeline/', uploadData)
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
                <label for='year'>Year</label>
                <input name='year' id='year' className='form-control' placeholder='Add a date here...'></input>
                </div>
                <div>
                <label for='image'>Upload an image</label>
                <input type='file' name='image' id='image' className='form-control image-input' onChange={this.handleFiles}></input>
                </div>
                <div>
                <label for='des'>Description</label>
                <textarea name='des' id='des' className='form-control' placeholder='Add your description here...'></textarea>
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


export default connect(mapStateToProps, null)(CreateTimeline)
