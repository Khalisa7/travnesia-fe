import React from 'react'
import './style/sJumbotronCity.css'

export default function Jumbotron() {
    return (
        <section className='jumbo-container'>
            <div className="container">
                <div className='jumbo-text'>
                    <h1 className='jumbo-heading'>Tokyo</h1>
                    <div className="row">
                        <ul className='jumbo-inline-list'>
                            <li>some text</li>
                            <li>some text</li>
                            <li>some text</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}