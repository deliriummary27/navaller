import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class CreateProfile extends Component {


    handleSubmit = event => {
        const uploadData = new FormData()
        uploadData.append('user', parseInt(this.props.id)) 
        uploadData.append('email', event.target.elements.email.value) 
        uploadData.append('phone', event.target.elements.phone.value)
        uploadData.append('country', event.target.elements.country.value)
        uploadData.append('instagram', event.target.elements.instagram.value)
        uploadData.append('twitter', event.target.elements.twitter.value)
        uploadData.append('youtube', event.target.elements.youtube.value)
        uploadData.append('photo', event.target.elements.photo.files[0], event.target.elements.photo.files[0].name)
        uploadData.append('bio', event.target.elements.bio.value)

        axios.post('http://127.0.0.1:8000/api/profiles/', uploadData)
        this.props.history.push('/profile')
    }

    render() {
        return (
            <div>
                <form className='form-group create-form' onSubmit={this.handleSubmit}>
                    <div>
                    <label for='email'>Email</label>
                    <input className='form-control' name='email' id='email'></input>
                    </div>
                    <div>
                    <label for='phone'>Phone Number</label>
                    <input className='form-control' name='phone' id='phone'></input>
                    </div>
                    <div>
                    <label for='country'>Country</label>
                    <input className='form-control' name='country' id='country'></input>
                    </div>
                    <div>
                    <label for='instagram'>Instagram</label>
                    <input className='form-control' name='instagram' id='instagram'></input>
                    </div>
                    <div>
                    <label for='twitter'>Twitter</label>
                    <input className='form-control' name='twitter' id='twitter'></input>
                    </div>
                    <div>
                    <label for='youtube'>Youtube</label>
                    <input className='form-control' name='youtube' id='youtube'></input>
                    </div>
                    <div>
                    <label for='photo'>Photo</label>
                    <input type='file' className='form-control image-input' name='photo' id='photo'></input>
                    </div>
                    <div>
                    <label for='bio'>Bio</label>
                    <input className='form-control' name='bio' id='bio'></input>
                    </div>
                    <button className='btn btn-primary' type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        id: state.id
    }
}

export default connect(mapStateToProps)(CreateProfile)
