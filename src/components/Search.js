import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import ProfileArticle from './ProfileArticle'

export default class Search extends Component {

    state = {
        inputValue: null,
        articles: [],
        admirals: [], 
        timeline: []
    }

    componentDidMount() {
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
        axios.get('api/profiles/')
        .then(res => {
            this.setState({
                profile: res.data
            })
        })
    }

    render() {
        const list = [...this.state.articles, ...this.state.admirals, ...this.state.timeline]
        const article = () => {
            if (this.state.inputValue !== null) {
                return list.filter(it => {
                return it.title.toLowerCase().includes(this.state.inputValue.toLowerCase())
                })
            }
        }
        return (
            <div style={{marginTop: '120px'}}>
            <div className='nav-search'>
                <FontAwesomeIcon className='nav-search-icon' icon={faSearch}/>
                <input className='form-control' placeholder='search the articles...' value={this.state.inputValue} onChange={(event) => this.setState({inputValue: event.target.value})}></input>
            </div>
            {this.state.inputValue !== null && this.state.inputValue !== '' ? article().map(it => {
                const prof = this.state.profile.filter(item => item.user === it.author)
                const profile = prof.map(item => item.photo)
                return <div className='search-article'><ProfileArticle item={it} prof={profile}/></div>
            }) : <div></div>}
            </div>
        )
    }
}
