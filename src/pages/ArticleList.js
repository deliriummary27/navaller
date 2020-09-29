import React, { Component } from 'react'
import axios from 'axios'
import ProfileArticle from '../components/ProfileArticle'
export default class ArticleList extends Component {

    state = {
        article: [],
        profile: []
    }

    componentDidMount() {
        axios.get('http://deliriummary.pythonanywhere.com/articles/')
        .then(res => {
            this.setState({
                article: res.data
            })
        })
        axios.get('http://deliriummary.pythonanywhere.com/profiles/')
        .then(res => {
            this.setState({
                profile: res.data
            })
        })
    }

    render() {
        return (
            <div className='article-list'>
                {this.state.article.map(it => {
                    const prof = this.state.profile.filter(item => item.user === it.author)
                    const profile = prof.map(item => item.photo)
                    return(
                        <div className='article-list-item'>
                            <ProfileArticle item={it} prof={profile}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}
