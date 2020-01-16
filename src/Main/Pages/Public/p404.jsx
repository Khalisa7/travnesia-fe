import React, { Component } from 'react'
import C404 from '../../Components/Public/c404'

class P404 extends Component {
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
            <C404 />
        )
    }
}

export default P404
