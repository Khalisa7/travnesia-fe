import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'bootstrap'
import './_scss/app.scss'
import $ from 'jquery'
import * as Toastr from 'toastr';
import './/../node_modules/toastr/build/toastr.css'
window.toastr = toastr
window.jQuery = $
window.$ = $
require('webpack-jquery-ui')
require('webpack-jquery-ui/css')

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
