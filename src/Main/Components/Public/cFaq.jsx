import React, { Component } from 'react'
import './style/sFaq.css'
import ScrollView from 'react-scroll-into-view'
import Translations from '../../../localization/translations.js'
import LocalizedStrings from 'react-localization'

class CFaq extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mobile: false,
      faq_icon1: false,
      faq_icon2: false,
      faq_icon3: false,
      faq_icon4: false,
      faq_icon5: false

    }

    this.faq1_onClick = this.faq1_onClick.bind(this)

     //Translations
     this.Translations = new Translations()
     var Locale = this.Translations.locale()
     this.lang = new LocalizedStrings({Locale})
  }

  faq1_onClick (i) {
    switch (i) {
      case 1 :
        this.setState({
          faq_icon1: !this.state.faq_icon1
        })
        break
      case 2 :
        this.setState({
          faq_icon2: !this.state.faq_icon2
        })
        break
      case 3 :
        this.setState({
          faq_icon3: !this.state.faq_icon3
        })
        break
      case 4 :
        this.setState({
          faq_icon4: !this.state.faq_icon4
        })
        break
      case 5 :
        this.setState({
          faq_icon5: !this.state.faq_icon5
        })
        break
    };
  }

  render () {
    return (
      <div className='faq'>
        <div className='container'>
          <div className='row justify-content-center pt-5 pb-5'>
            <div className='col-md-10'>
              <div className='row'>
                <div className='col-md-4 sticky'>
                  <div className=''>
                    <div className='clearfix pr-3' data-toggle='collapse' data-target='#collapse1' aria-expanded='false' aria-controls='collapse1' onClick={() => { this.faq1_onClick(1) }}>

                      <h6 className='float-left'>{this.lang.faq_menu}</h6>
                      <span className='float-right'>
                        <i className={this.state.faq_icon1 ? 'fa fa-chevron-up f-white primary-color' : 'fa fa-chevron-down f-primary-color'} />
                      </span>
                    </div>
                    <div className='collapse' id='collapse1'>
                      <div className='card card-body border-0 pt-3'>
                        <ScrollView selector='#faq_umum1'><li>{this.lang.order_menu}</li></ScrollView>
                        <ScrollView selector='#faq_umum2'><li>{this.lang.promotion_menu}</li></ScrollView>
                        <ScrollView selector='#faq_umum3'><li>{this.lang.voucher_menu}</li></ScrollView>
                        <ScrollView selector='#faq_umum4'><li>{this.lang.membership_menu}</li></ScrollView>
                        <ScrollView selector='#faq_umum5'><li>{this.lang.payment}</li></ScrollView>
                        <ScrollView selector='#faq_umum6'><li>{this.lang.contact}</li></ScrollView>
                        <ScrollView selector='#faq_umum7'><li>{this.lang.refund}</li></ScrollView>
                      </div>
                    </div>
                    <div className='clearfix pt-3 pr-3' data-toggle='collapse' data-target='#collapse2' aria-expanded='false' aria-controls='collapse2' onClick={() => { this.faq1_onClick(2) }}>
                      <h6 className='float-left '>{this.lang.booking}</h6>
                      <span className='float-right'>
                        <i className={this.state.faq_icon2 ? 'fa fa-chevron-up f-white primary-color' : 'fa fa-chevron-down f-primary-color'} />
                      </span>
                    </div>
                    <div className='collapse' id='collapse2'>
                      <div className='card card-body border-0 p-3'>
                        <ScrollView selector='#faq_booking1'><li>{this.lang.booking_step}</li></ScrollView>
                        <ScrollView selector='#faq_booking2'><li>{this.lang.booking_cancel}</li></ScrollView>
                        <ScrollView selector='#faq_booking3'><li>{this.lang.booking_reschedule}</li></ScrollView>
                      </div>
                    </div>
                    <div className='clearfix pt-3 pr-3' data-toggle='collapse' data-target='#collapse3' aria-expanded='false' aria-controls='collapse3' onClick={() => { this.faq1_onClick(3) }}>
                      <h6 className='float-left'>{this.lang.payment}</h6>
                      <span className='float-right'>
                        <i className={this.state.faq_icon3 ? 'fa fa-chevron-up f-white primary-color' : 'fa fa-chevron-down f-primary-color'} />
                      </span>
                    </div>
                    <div className='collapse' id='collapse3'>
                      <div className='card card-body border-0 p-3'>
                        <ScrollView selector='#faq_pembayaran1'><li>{this.lang.my_cart}</li></ScrollView>
                        <ScrollView selector='#faq_pembayaran2'><li>{this.lang.promotion_menu}</li></ScrollView>
                        <ScrollView selector='#faq_pembayaran3'><li>{this.lang.voucher_menu}</li></ScrollView>
                        <ScrollView selector='#faq_pembayaran4'><li>{this.lang.membership_menu}</li></ScrollView>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-md-8 pl-10'>
                  <div data-spy='scroll' data-target='#list-example' data-offset='0' className='scrollspy'>
                    <ul className='list-group'>
                      <div id='faq_umum1' className='titleFaq pt-0'><h4 >{this.lang.order_menu}</h4></div>
                      <li className='list-group-item'>
                        <h5>{this.lang.order_faq}</h5>
                        <p>{this.lang.order_faq_desc}</p>
                      </li>
                      <li className='list-group-item'><h5>{this.lang.faq_ask_1}</h5>
                        <div>
                          <p>{this.lang.faq_ans_1}</p>
                        </div>
                      </li>
                      <li className='list-group-item'><h5>{this.lang.faq_ask_2}</h5>
                        <div>
                          <p>{this.lang.faq_ans_2}</p>
                        </div>
                      </li>
                    </ul>

                    {/* kedua */}
                    <ul id='faq_umum2' className='list-group'>
                      <div className='titleFaq pt-3'><h4 >{this.lang.promotion_menu}</h4></div>
                      <li className='list-group-item'><h5>{this.lang.promotion_faq}</h5>
                        <p>{this.lang.promotion_faq_desc}</p>
                      </li>
                      <li className='list-group-item'><h5>{this.lang.faq_ask_1}</h5>
                        <div>
                          <p>{this.lang.faq_ans_1}</p>
                        </div>
                      </li>
                      <li className='list-group-item'><h5>{this.lang.faq_ask_2}</h5>
                        <div>
                          <p>{this.lang.faq_ans_2}</p>
                        </div>
                      </li>
                    </ul>

                    {/* // ketiga */}
                    <ul id='faq_umum3' className='list-group'>
                      <div className='titleFaq pt-3'><h4 >{this.lang.voucher_menu}</h4></div>
                      <li className='list-group-item'><h5>{this.lang.voucher_faq}</h5>
                        <div>
                          <p>{this.lang.voucher_faq_desc}</p>
                        </div>
                      </li>
                      <li className='list-group-item'><h5>{this.lang.faq_ask_1}</h5>
                        <div>
                          <p>{this.lang.faq_ans_1}</p>
                        </div>
                      </li>
                      <li className='list-group-item'><h5>{this.lang.faq_ask_2}</h5>
                        <div>
                          <p>{this.lang.faq_ans_2}</p>
                        </div>
                      </li>
                    </ul>

                    <ul id='faq_umum4' className='list-group'>
                      <div className='titleFaq pt-3'><h4 >{this.lang.membership_menu}</h4></div>
                      <li className='list-group-item'><h5>{this.lang.membership_faq}</h5>
                        <div>
                          <p>{this.lang.membership_faq_desc}</p>
                        </div>
                      </li>
                      <li className='list-group-item'><h5>{this.lang.membership_ask_1}</h5>
                        <div>
                          <p>{this.lang.faq_ans_1}</p>
                        </div>
                      </li>
                      <li className='list-group-item'>{this.lang.membership_ask_2}
                        <div>
                          <p>{this.lang.membership_ans_1}</p>
                        </div>
                      </li>
                      <li className='list-group-item'>{this.lang.membership_ask_3}
                        <div>
                          <p>{this.lang.membership_ans_1}</p>
                        </div>
                      </li>
                    </ul>

                    <ul id='faq_umum5' className='list-group'>
                      <div className='titleFaq pt-3'><h4 >{this.lang.payment}</h4></div>
                      <li className='list-group-item'><h6>{this.lang.payment_faq}</h6>
                        <div>
                          <p>
                          {this.lang.payment_faq_1}</p>
                          <ul>
                            <li>{this.lang.payment_que_1}</li>
                            <li>{this.lang.payment_que_1}</li>
                            <li>{this.lang.payment_que_1}</li>
                          </ul>
                        </div>
                      </li>
                      <li className='list-group-item'>{this.lang.payment_ask_1}
                        <div>
                          <p>
                          {this.lang.payment_que_2}</p>
                        </div>
                      </li>
                      <li className='list-group-item'>{this.lang.payment_ask_2}
                        <div>
                          <p>
                          {this.lang.payment_que_3}</p>
                        </div>
                      </li>
                      <li className='list-group-item'>{this.lang.payment_ask_3}
                        <div>
                          <p>
                          {this.lang.membership_ans_1}</p>
                        </div>
                      </li>
                    </ul>

                    <ul id='faq_umum6' className='list-group'>
                      <div className='titleFaq pt-3'><h4 >{this.lang.contact}</h4></div>
                      <li className='list-group-item'>{this.lang.contact_ask}
                        <div>
                          <p>
                          {this.lang.contact_ans}</p>
                        </div>
                      </li>
                    </ul>
                    <ul id='faq_umum7' className='list-group'>
                      <div className='titleFaq pt-3'><h4 >Refund</h4></div>
                      <li className='list-group-item'>{this.lang.refund_ask}
                        <div>
                          <p>
                          {this.lang.refund_ans}}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default CFaq
