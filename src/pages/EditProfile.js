import React, { Component } from 'react'
import {connect} from'react-redux'
import axios from 'axios'
class EditProfile extends Component {

    state = {
        profiles: [],
        prof: {
            email: null,
            phone: null,
            country: null,
            instagram: null,
            twitter: null,
            youtube: null,
            photo: null,
            bio: null

        }
    }

    componentDidMount = () => {
        axios.get('http://127.0.0.1:8000/api/profiles/')
        .then(res => {
            this.setState({
                profiles: res.data,
                prof: {
                    email: res.data.filter(it => it.user === parseInt(this.props.id))[0].email,
                    phone: res.data.filter(it => it.user === parseInt(this.props.id))[0].phone,
                    country: res.data.filter(it => it.user === parseInt(this.props.id))[0].country,
                    instagram: res.data.filter(it => it.user === parseInt(this.props.id))[0].instagram,
                    twitter: res.data.filter(it => it.user === parseInt(this.props.id))[0].twitter,
                    youtube: res.data.filter(it => it.user === parseInt(this.props.id))[0].youtube,
                    bio: res.data.filter(it => it.user === parseInt(this.props.id))[0].bio
                }
            })
        })
    }

    handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        return this.setState({
            prof: {
                [name]: value
            }
        })
    }

    handlePhoto = event => {
        const profile = this.state.profiles.filter(it => it.user === parseInt(this.props.id))
        const id = profile[0].id
        let photoe = event.target.files[0]
        const uploadData = new FormData()
        uploadData.append('photo', photoe, photoe.name)
        axios.patch(`http://127.0.0.1:8000/api/profiles/${id}/`, uploadData)
    }

    handleSubmit = (event) => {
        const profile = this.state.profiles.filter(it => it.user === parseInt(this.props.id))
        const id = profile[0].id
        let email = event.target.elements.email.value
        let phone = event.target.elements.phone.value
        let country = event.target.elements.country.value
        let instagram = event.target.elements.instagram.value
        let twitter = event.target.elements.twitter.value
        let youtube = event.target.elements.youtube.value
        let bio = event.target.elements.bio.value
        axios.patch(`http://127.0.0.1:8000/api/profiles/${id}/`, {
            email,
            phone,
            country,
            instagram,
            twitter,
            youtube,
            bio
        })
    }

    render() {
        const profile = this.state.profiles.filter(it => it.user === parseInt(this.props.id))
        const photo = profile.map(it => it.photo)[0]
        console.log(photo)
        const form = profile.map(it => {
            return (
                <form className='form-group create-form' onSubmit={this.handleSubmit}>
                    <div>
                    <label for='email'>Email</label>
                    <input className='form-control' name='email' id='email' value={this.state.prof.email} onChange={this.handleChange}></input>
                    </div>
                    <div>
                    <label for='phone'>Phone Number</label>
                    <input className='form-control' name='phone' id='phone' value={this.state.prof.phone} onChange={this.handleChange}></input>
                    </div>
                    <div>
                    <label for='country'>Country</label>
                    <input className='form-control' name='country' id='country' value={this.state.prof.country} onChange={this.handleChange}></input>
                    </div>
                    <div>
                    <label for='instagram'>Instagram</label>
                    <input className='form-control' name='instagram' id='instagram' value={this.state.prof.instagram} onChange={this.handleChange}></input>
                    </div>
                    <div>
                    <label for='twitter'>Twitter</label>
                    <input className='form-control' name='twitter' id='twitter' value={this.state.prof.twitter} onChange={this.handleChange}></input>
                    </div>
                    <div>
                    <label for='youtube'>Youtube</label>
                    <input className='form-control' name='youtube' id='youtube' value={this.state.prof.youtube} onChange={this.handleChange}></input>
                    </div>
                    <div>
                    <label for='photo'>Photo</label>
                    <input type='file' className='form-control image-input' name='photo' id='photo' onChange={this.handlePhoto}></input>
                    </div>
                    <div>
                    <label for='bio'>Bio</label>
                    <input className='form-control' name='bio' id='bio' value={this.state.prof.bio} onChange={this.handleChange}></input>
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

const mapStateToProps = state => {
    return {
        id: state.id,
        isAuthenticated: state.token = !null
    }
}


export default connect(mapStateToProps, null)(EditProfile)
