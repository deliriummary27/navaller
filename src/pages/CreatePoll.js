import React, { Component } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

export default class CreatePoll extends Component {

    state = {
        questions: [],
        number: 0,
        value: '',
        key: null,
        keyArray: []
    }

    componentDidMount() {
        axios.get('http://rallendalle.pythonanywhere.com/api/questions/')
        .then(res => {
            this.setState({
                questions: res.data
            })
        })
    }

    handleQuestion = event => {
        const ques = event.target.elements.question.value
        if (window.location.pathname[14] === 'r') {
            axios.post('http://rallendalle.pythonanywhere.com/api/questions/', {
            ques: ques,
            article: parseInt(window.location.pathname[window.location.pathname.length - 1])
        })
        } else if (window.location.pathname[14] === 'd') {
            axios.post('http://rallendalle.pythonanywhere.com/api/questions/', {
            ques: ques,
            admiral: parseInt(window.location.pathname[window.location.pathname.length - 1])
        })
        } else if (window.location.pathname[14] === 'i') {
            axios.post('http://rallendalle.pythonanywhere.com/api/questions/', {
            ques: ques,
            timeline: parseInt(window.location.pathname[window.location.pathname.length - 1])
        })
        }
    }

    handleOption = (event) => {
        const opt = this.state.value
        const question = () => {
            if (window.location.pathname[14] === 'r') {
                return this.state.questions.filter(it => it.article === parseInt(window.location.pathname[window.location.pathname.length - 1]))[0]
            } else if (window.location.pathname[14] === 'd') {
                return this.state.questions.filter(it => it.admiral === parseInt(window.location.pathname[window.location.pathname.length - 1]))[0]
            } else if (window.location.pathname[14] === 'i') {
                return this.state.questions.filter(it => it.timeline === parseInt(window.location.pathname[window.location.pathname.length - 1]))[0]
            }
        }
        axios.post('http://rallendalle.pythonanywhere.com/api/options/', {
            opt: opt,
            question: question().id
        })
        .then(this.setState(prevState => {
            return {
                keyArray: [...prevState.keyArray, this.state.key]
            }
        }))

    }

    render() {
        const question = () => {
            if (window.location.pathname[14] === 'r') {
                return this.state.questions.filter(it => it.article === parseInt(window.location.pathname[window.location.pathname.length - 1]))
            } else if (window.location.pathname[14] === 'd') {
                return this.state.questions.filter(it => it.admiral === parseInt(window.location.pathname[window.location.pathname.length - 1]))
            } else if (window.location.pathname[14] === 'i') {
                return this.state.questions.filter(it => it.timeline === parseInt(window.location.pathname[window.location.pathname.length - 1]))
            }
        }
        const linkAdress = () => {
            if (window.location.pathname[14] === 'r') {
                return 'articles'
            } else if (window.location.pathname[14] === 'd') {
                return 'admirals'
            } else if (window.location.pathname[14] === 'i') {
                return 'timeline'
            }  
        }
        const numOpt = [0, 1, 2, 3, 4, 5]
        const opt = Array.from(Array(parseInt(this.state.number)).keys())
        return (
            <div>
                {question().length === 0 ? <form className='form-group create-form' onSubmit={this.handleQuestion}>
                    <div>
                        <label for='question'>Question</label>
                        <input id='question' name='question' className='form-control' placeholder='Add a question...'></input>
                    </div>
                    <button className='btn btn-primary' type='submit'>Next</button>
                </form> : <div className='create-form'>
                <h3 style={{color: 'rgb(0, 165, 230)'}} className='display-3'>{question()[0].ques}</h3>
                    </div>}
                
                {question().length !== 0 ? <div>
                    <form className='form-group create-form'>
                            <div>
                            <label for='number'>Choose the number of choices...</label>
                            <select id='number' onChange={(event) => this.setState({number: event.target.value})} className='form-control'>
                                {numOpt.map(it => <option value={it}>{it}</option>)}
                            </select>
                            </div>
                            {opt.map(it => <div className='create-poll-form'>
                                <label for='option'>Add an option...</label>
                                <input className='form-control' onChange={(event) => this.setState({value: event.target.value, key: it})} id='option' name='optionie' key={it} placeholder='Add a choice...'></input>
                            {this.state.keyArray.includes(it) ? <FontAwesomeIcon className='create-poll-form-icon' icon={faCheck}/> : <></>}
                            <button className='btn btn-primary' type='button' onClick={this.handleOption}>Add</button>
                        </div>)}
                        <Link style={{marginTop: '30px'}} className='btn btn-outline-primary' to={`/${linkAdress()}/${parseInt(window.location.pathname[window.location.pathname.length - 1])}`}>Return to the article page</Link>
                    </form>
                </div> : <></>}
            </div>
        )
    }
}
