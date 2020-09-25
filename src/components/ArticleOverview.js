import React from 'react'
import { Link } from "react-router-dom";
export default function ArticleOverview({article}) {

    function shorten(str, maxLen, separator = ' ') {
        if (str.length <= maxLen) return str;
        return str.substr(0, str.lastIndexOf(separator, maxLen));
    }
    
    return (
        <div className='article-overview-center'>
            <img alt='q' key={article.id} src={article.image}></img>
            <h5 className='display-5'>{article.title}</h5>
            <p className='lead'>{shorten(article.content, 50)}...</p>
            <Link to={`/articles/${article.id}`} className='btn btn-outline-primary article-overview-center-link'>read more</Link>
        </div>
        
    )
}



