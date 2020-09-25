import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faEnvelope, faMobileAlt, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import ProfileArticle from '../components/ProfileArticle'


class PublicProfile extends Component {

    state = {
        profiles: {},
        articles: [],
        admirals: [],
        timeline: []
    }

    componentDidMount = () => {
        const ID = this.props.match.params.slug
        axios.get(`api/profiles/`)
        .then(res => {
            this.setState({
                profiles: res.data.filter(it => it.user === parseInt(ID))[0]
            })
        })
        axios.get('api/articles/')
        .then(res => {
            this.setState({
                articles: res.data
            })
        })
        axios.get('api/admirals/')
        .then(res => {
            this.setState({
                admirals: res.data
            })
        })
        axios.get('api/timeline/')
        .then(res => {
            this.setState({
                timeline: res.data
            })
        })
    }

    render() {
        const ID = this.props.match.params.slug
        const article = this.state.articles.filter(it => it.author === parseInt(ID))
        const admiral = this.state.admirals.filter(it => it.author === parseInt(ID))
        const timeline = this.state.timeline.filter(it => it.author === parseInt(ID))
        const list = [...article, ...admiral, ...timeline]
        const arti = list.sort(function(a, b) {
            let c = new Date(a.date);
            let d = new Date(b.date);
            return d-c;
        });
        const articleList = arti.map(it => {
            return  <ProfileArticle item={it} prof={this.state.profiles.photo}/>
        })
        const it = this.state.profiles
        return (
            <div>
                <div className='profile-header-center'>
                <div>
                <div className='profile-header-center-container'>
                    <img key={it.id} alt='p' src={it.photo}></img>
                </div>
                <div className='profile-page-username'>
                    <FontAwesomeIcon icon={faPen} className='faInfo'/>
                   <h1 key={it.id}>{it.username}</h1> 
                   <h3 key={it.id}>{it.bio}</h3>
                </div> 
                <div className='profile-social-first'>
                <div className='profile-social-icon'>
                    <FontAwesomeIcon icon={faEnvelope}/>
                    <h3 key={it.id}>{it.email}</h3>
                </div>
                <div className='profile-social-icon'>
                    <FontAwesomeIcon icon={faMobileAlt}/>
                    <h3 key={it.id}>{it.phone}</h3>
                </div>
                <div className='profile-social-icon'>
                    <FontAwesomeIcon icon={faMapMarkerAlt}/>
                    <h3 key={it.id}>{it.country}</h3>
                </div>
                </div>
                <div className='profile-social-second'>
                <div className='profile-social-icon'>
                    <FontAwesomeIcon icon={faInstagram}/>
                    {/*eslint-disable-next-line*/}
                    <h3 key={it.id}><a target="_blank" href={it.instagram}>{it.instagram}</a></h3>
                </div>
                <div className='profile-social-icon'>
                    <FontAwesomeIcon icon={faTwitter}/>
                    {/*eslint-disable-next-line*/}
                    <h3 key={it.id}><a target="_blank" href={it.twitter}>{it.twitter}</a></h3>
                </div>
                <div className='profile-social-icon'>
                    <FontAwesomeIcon icon={faYoutube}/>
                    {/*eslint-disable-next-line*/}
                    <h3 key={it.id}><a target="_blank" href={it.youtube}>{it.youtube}</a></h3>
                </div>
                </div>
                </div>
                </div>
                <div className='profile-article-container'>
                {articleList}
                </div>
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


export default connect(mapStateToProps, null)(PublicProfile)
