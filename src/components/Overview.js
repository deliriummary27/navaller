import React, { Component } from 'react'
import axios from 'axios'
import ArticleOverview from './ArticleOverview'

export default class Overview extends Component {

    state = {
        article: []
    }

    componentDidMount() {
        axios.get('http://deliriummary.pythonanywhere.com/articles/')
            .then(res => {
                this.setState({
                    article: res.data
                })
            })
    }


    render() {
        const artic = this.state.article.filter(it => it.id === 1 || it.id === 2 || it.id === 3)
        const arties = artic.map((item,index) => {
            return(
                <div>
                    <ArticleOverview article={item}/>
                </div>
                

            )
        })

        return (
            <div className='article-overview-container'>
               <div className='article-overview d-flex'>
                    {arties}
                </div> 
            </div>
            
        )
    }
}
