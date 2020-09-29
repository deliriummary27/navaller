import React, { Component } from 'react'
import axios from 'axios'

export default class ArticleSideBar extends Component {

    state = {
        articles: [],
    }

    componentDidMount() {
        if (this.props.articleType === 'article') {
            axios.get('http://deliriummary.pythonanywhere.com/articles/')
            .then(res => {
                this.setState({
                    articles: res.data
                })
            })
        } else if (this.props.articleType === 'admiral') {
            axios.get('http://deliriummary.pythonanywhere.com/admirals/')
            .then(res => {
                this.setState({
                    articles: res.data
                })
            })
        } else if (this.props.articleType === 'timeline') {
            axios.get('http://deliriummary.pythonanywhere.com/timeline/')
            .then(res => {
                this.setState({
                    articles: res.data
                })
            })
        }
    }

    render() {
        console.log(this.state.articles)
        const linkie = (it) => {
            if (this.props.articleType === 'article') {
                return `/articles/${it.id}`
            } else if (this.props.articleType === 'admiral') {
                return `/admirals/${it.id}`
            } else if (this.props.articleType === 'timeline') {
                return `/timeline/${it.id}`
            }
        }
        return (
            <div className='article-sidebar'>
                <h5 style={{marginLeft: '35%'}}>Articles</h5>
                <div className='show-line' style={{marginBottom: '30px'}}></div>
                {this.state.articles.map(it => {
                    return(
                        <div className='article-sidebar-inner' style={it.id === this.props.id ? {backgroundColor: 'rgba(160, 160, 160, 0.171)'} : {}}>
                            <img src={it.image} alt='s'></img>
                            <a href={linkie(it)} className='display-4' style={it.title.length > 20 ? {fontSize: '20px'} : {}}>{it.title}</a>
                        </div>  
                    )
                })}
            </div>
        )
    }
}
