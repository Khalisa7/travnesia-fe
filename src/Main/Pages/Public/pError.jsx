import React, { Component } from 'react'
import CError from '../../Components/Public/cError'

class PError extends Component {
    componentDidMount () {
        this.authenticate().then(() => {
        const ele = document.getElementById('ipl-progress-indicator')
        if (ele) {
            ele.classList.add('available')
            setTimeout(() => {
            ele.outerHTML = ''
            }, 1000)
        }
        })
    }

    authenticate () {
        return new Promise(resolve => setTimeout(resolve, 2000))
    }

    render () {
        return (
            <CError />
        )
    }
}

export default PError
