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

class TimelinePage extends Component {

    state = {
        data: {},
        profiles: [],
        questions: [],
        isClicked: false
    }

    componentDidMount() {
        const articleID = this.props.match.params.slug
        axios.get(`api/timeline/${articleID}/`)
            .then(res => {
                this.setState({
                    data: res.data
                    
                })
            })
            axios.get('api/profiles/')
            .then(res => {
                this.setState({
                    profiles: res.data
                })
            })
            axios.get('api/questions/')
            .then(res => {
            this.setState({
                questions: res.data
            })
        })
    }

    handleDelete = (event) => {
        const articleID = this.props.match.params.slug
        axios.delete(`api/timeline/${articleID}/`)
        this.props.history.push('/')
 
    }

    copyLink = () => {
        const articleID = this.props.match.params.slug
        copy(`http://rallendalle.pythonanywhere.com/timeline/${articleID}`)
    }

    render() {
        const articleID = this.props.match.params.slug
        let link = `http://rallendalle.pythonanywhere.com/timeline/${articleID}`
        const profile = this.state.profiles.filter(it => it.user === this.state.data.author)
        const profilePhoto = profile.map(it => {
            return <div className='detail-info-profile'><img style={{marginTop: '-13px'}} key={it.id} src={it.photo} alt='p'></img></div>
        })
        const question = this.state.questions.filter(it => it.timeline === this.state.data.id)
        return (
            <div>
            <ArticleSideBar id={this.state.data.id} articleType='timeline'/>
            <div className='detail-container'>
            {parseInt(this.props.userId) === parseInt(this.state.data.author) ? <div className='buttons-article'>
                <button onClick={() => this.props.history.push(`/edit/timeline/${this.state.data.id}`)} className='btn btn-primary'>Edit</button>
                {question.length === 0 ? <button onClick={() => this.props.history.push(`/create/poll/timeline=${this.state.data.id}`)} className='btn btn-primary' style={{backgroundColor: 'rgb(91, 163, 163)', borderColor: 'rgb(91, 163, 163)'}}>Add a poll</button> : <></>}
                <button onClick={() => this.setState({isClicked: true})} className='btn btn-danger'>Delete</button>
                {this.state.isClicked ? <div>
                    <p style={{marginLeft: '13px'}}>Are you sure about deleting this post?</p>
                    <button onClick={this.handleDelete} className='btn btn-danger'>Yes</button>
                    <button onClick={() => this.setState({isClicked: false})} className='btn btn-primary'>No</button>
                </div> : <></>}
            </div> : <div></div>}
                <div className='detail-container-timeline'>
                <div className='share-buttons'>
                <div className='share-buttons-timeline'>
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
                </div>
                <h1 className='display-1'>{this.state.data.title}</h1>
                <img alt='t' src={this.state.data.image}></img>
                </div>
                <div className='detail-info'>
                    {profilePhoto}
                    <a href={`/public/profile/${parseInt(this.state.data.author)}`} className='display-4'>{this.state.data.authorName}</a>
                    <Like articleType='timeline' item={this.state.data}/>
                </div>
                {this.state.data.year < 0 ? <h5 style={{marginTop: '70px', position: 'absolute'}}>Date: {-this.state.data.year}.BC</h5> : <h5 style={{position: 'absolute', marginTop: '70px'}}>Date: {this.state.data.year}</h5>}
                <p className='lead'>{this.state.data.des}</p>
                <Poll item={this.state.data} articleType='timeline'/>
                <Comments item={this.state.data} articleType='timeline'/>
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

export default connect(mapStateToProps, null)(TimelinePage)

