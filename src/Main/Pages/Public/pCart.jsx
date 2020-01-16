import React, { Component } from 'react'
import CCart from '../../Components/Public/cCart'

class PCart extends Component {
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
            <div>
                <CCart/>
            </div>
        )
    }
}

export default PCart
