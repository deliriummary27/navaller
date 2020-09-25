import React, { Component } from 'react'
import axios from 'axios'
import Comments from '../components/Comments'
import Poll from '../components/Poll'
import copy from "copy-to-clipboard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faTelegramPlane } from '@fortawesome/free-brands-svg-icons'
import ShareLink from 'react-twitter-share-link'
import { TelegramShareButton } from "react-share"
import Like from '../components/Like'
import ArticleSideBar from '../components/ArticleSideBar'
import {connect} from 'react-redux'

class AdmiralPage extends Component {

    state = {
        data: {},
        profiles: [],
        questions: [],
        isClicked: false
    }

    componentDidMount() {
        const articleID = this.props.match.params.slug
        axios.get(`http://127.0.0.1:8000/api/admirals/${articleID}/`)
            .then(res => {
                this.setState({
                    data: res.data
                    
                })
            })
            axios.get('http://127.0.0.1:8000/api/profiles/')
            .then(res => {
                this.setState({
                    profiles: res.data
                })
            })
            axios.get('http://127.0.0.1:8000/api/questions/')
            .then(res => {
            this.setState({
                questions: res.data
            })
        })
    }

    handleDelete = (event) => {
        const articleID = this.props.match.params.slug
        axios.delete(`http://127.0.0.1:8000/api/admirals/${articleID}/`)
        this.props.history.push('/')
 
    }

    copyLink = () => {
        const articleID = this.props.match.params.slug
        copy(`http://localhost:3000/admirals/${articleID}`)
    }

    render() {
        const articleID = this.props.match.params.slug
        let link = `http://localhost:3000/admirals/${articleID}`
        const profile = this.state.profiles.filter(it => it.user === this.state.data.author)
        const profilePhoto = profile.map(it => {
            return <div className='detail-info-profile'><img key={it.id} src={it.photo} alt='p'></img></div>
        })
        const question = this.state.questions.filter(it => it.admiral === this.state.data.id)
        return (
            
            <div>
            <ArticleSideBar id={this.state.data.id} articleType='admiral'/>
            <div className='detail-container'>
            {parseInt(this.props.userId) === parseInt(this.state.data.author) ? <div className='buttons-article'>
                <button onClick={() => this.props.history.push(`/edit/admirals/${this.state.data.id}`)} className='btn btn-primary'>Edit</button>
                {question.length === 0 ? <button onClick={() => this.props.history.push(`/create/poll/admirals=${this.state.data.id}`)} className='btn btn-primary' style={{backgroundColor: 'rgb(91, 163, 163)', borderColor: 'rgb(91, 163, 163)'}}>Add a poll</button> : <></>}
                <button onClick={() => this.setState({isClicked: true})} className='btn btn-danger'>Delete</button>
                {this.state.isClicked ? <div>
                    <p style={{marginLeft: '13px'}}>Are you sure about deleting this post?</p>
                    <button onClick={this.handleDelete} className='btn btn-danger'>Yes</button>
                    <button onClick={() => this.setState({isClicked: false})} className='btn btn-primary'>No</button>
                </div> : <></>}
            </div> : <div></div>}
                <div className='detail-container-admiral'>
                <h1 className='display-1' style={{marginBottom: '-80px'}}>{this.state.data.title}</h1>
                <p className='lead'>{this.state.data.subtitle}</p>
                <div className='share-buttons' style={{marginTop: '-60px'}}>
                    <div className='share-buttons-border mt-2' style={{position: 'absolute'}}>
                    <button onClick={this.copyLink}><FontAwesomeIcon icon={faShare}/></button>
                    </div>
                    <ShareLink link={link}>
                    {link => (
                        <div className='share-buttons-border' style={{position: 'absolute', marginTop: '8px', marginLeft: '50px'}}>
                            {/* eslint-disable-next-line */}
                            <a href={link} target='_blank'><FontAwesomeIcon icon={faTwitter}/></a>
                        </div> 
                    )}
                    </ShareLink> 
                    <TelegramShareButton url={link}>
                    <div className='share-buttons-border' style={{position: 'absolute', marginTop: '12px', marginLeft: '100px'}}>
                        {/* eslint-disable-next-line */}
                        <a href={link} target='_blank'><FontAwesomeIcon icon={faTelegramPlane}/></a>
                    </div>
                    </TelegramShareButton>
                </div>
                <img alt='t' src={this.state.data.image}></img>
                </div>
                <div className='detail-info'>
                    {profilePhoto}
                    <a href={`/public/profile/${parseInt(this.state.data.author)}`} className='display-4'>{this.state.data.authorName}</a>
                    <h6>{String(this.state.data.date).slice(0, 10)}</h6>
                    <div className='like-margin' style={{marginLeft: '-400px'}}>
                    <Like articleType='admiral' item={this.state.data}/> 
                    </div>
                </div>
                <p className='lead'>{this.state.data.content}</p>
                <Poll item={this.state.data} articleType='admiral'/>
                <Comments item={this.state.data} articleType='admiral'/>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.id
    }
}

export default connect(mapStateToProps, null)(AdmiralPage)
