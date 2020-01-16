import React, { Component } from 'react'
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom'
import AccessControl from "../../_config/middleware/AccessControl";

import PAboutUs from '../Pages/Public/pAboutUs'
import PHome from '../Pages/Public/pHome'
import PFaq from '../Pages/Public/pFaq'
import PPackageDetail from '../Pages/Public/pPackageDetail'
import PPage404 from '../Pages/Public/p404'
import PPageError from '../Pages/Public/pError'
import PTravel from '../Pages/Public/pTravel'
import PSignIn from '../Pages/Public/pSignIn'
import PSignUp from '../Pages/Public/pSignUp'
import PCart from '../Pages/Public/pCart'
import PCheckout from '../Pages/Public/pCheckout'
import PPayment from '../Pages/Public/pPayment'
import PTerms from '../Pages/Public/pTerms'
import PTeam from '../Pages/Public/pTeam'
import PCityDetail from '../Pages/Public/pCityDetail'
import PResetPassword from '../Pages/Public/pResetPassword'
import PMailResetPass from '../Pages/Public/pMailResetPass'

import PUserHome from '../Pages/User/pUserHome'
import PUserProfile from '../Pages/User/pUserProfile'
import PUserBook from '../Pages/User/pUserBook'
import PUserSupport from '../Pages/User/pUserSupport'
import PUserTicketOpen from '../Pages/User/pUserTicketOpen'
import PUserTicketRead from '../Pages/User/pUserTicketRead'
import PUserHistory from '../Pages/User/pUserHistory'
import PUserConfirm from '../Pages/User/pUserConfirm'


import PVendorHome from '../Pages/Vendor/pVendorHome'
import PVendorProfile from '../Pages/Vendor/pVendorProfile'
import PVendorProduct from '../Pages/Vendor/pVendorProduct'
import PVendorProductAdd from '../Pages/Vendor/pVendorProductAdd'
import PVendorSignIn from '../Pages/Vendor/pSignIn'
import PVendorSignUp from '../Pages/Vendor/pSignUp'
import PVendorTransaction from '../Pages/Vendor/pTransaction'
import PVendorDetail from '../Pages/Vendor/pDetailPackage'
import PVendorOrderDetail from '../Pages/Vendor/pVendorOrderDetail'
import PVResetPassword from '../Pages/Vendor/pResetPassword'
import PVMailResetPass from '../Pages/Vendor/pMailResetPass'


var accessControl = new AccessControl();
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        accessControl.loggedIn() === 'user'
            ? <Component {...props} />
            : <Redirect to='/signin' />
    )} />
)

const UserRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        accessControl.loggedIn() === 'user'
            ? <Component {...props} />
            : <Redirect to='/signin' />
    )} />
)

const PartnerRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        accessControl.loggedIn() === 'partner'
            ? <Component {...props} />
            : <Redirect to='/partner/signin' />
    )} />
)

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
        let isLogIn = accessControl.loggedIn()
        let goals 
        if(isLogIn === 'partner'){
            goals = <Redirect to='/partner' />
        }else if(isLogIn === 'user'){
            goals =  <Redirect to='/user' />
        }else{
            goals = <Component {...props} />
        }
        return goals
    }} />
)

class Routing extends Component {
    constructor(props) {
        super(props)
        this.AccessControl = new AccessControl();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div>
                <Switch>

                    {/* Public */}

                    <Route exact path='/' component={PHome} />
                    <Route exact path='/travel' component={PTravel} />
                    <Route exact path='/travel/search' component={PTravel} />
                    <Route exact path='/travel/detail/:data_slug' component={PPackageDetail} />
                    <Route exact path='/city/:city_id' component={PCityDetail} />
                    <Route exact path='/faq' component={PFaq} />
                    <Route exact path='/about-us' component={PAboutUs} />
                    <Route exact path='/terms-of-service' component={PTerms} />
                    <Route exact path='/team' component={PTeam} />

                    <AuthRoute exact path='/reset_pass' component={PResetPassword} />
                    <AuthRoute exact path='/forgot_pass' component={PMailResetPass} />

                    <AuthRoute exact path='/signin' component={PSignIn} />
                    <AuthRoute exact path='/signup' component={PSignUp} />
                    <AuthRoute exact path='/partner/signin' component={PVendorSignIn} />
                    <AuthRoute exact path='/partner/signup' component={PVendorSignUp} />
                    <AuthRoute exact path='/partner/reset_pass' component={PVResetPassword} />
                    <AuthRoute exact path='/partner/forgot_pass' component={PVMailResetPass} />
                 
                    <PrivateRoute exact path='/cart' component={PCart} />
                    <PrivateRoute exact path='/checkout/:token' component={PCheckout} />
                    <PrivateRoute exact path='/payment/:data_order' component={PPayment} />
                    
                    <UserRoute exact path='/user/dash' component={PUserHome} />
                    <UserRoute exact path='/user/profile' component={PUserProfile} />
                    <UserRoute exact path='/user/booking-history' component={PUserHistory} />
                    {/* <UserRoute exact path='/user/support' component={PUserSupport} />
                    <UserRoute exact path='/user/support/ticket/open' component={PUserTicketOpen} />
                    <UserRoute exact path='/user/support/ticket/id/:data_id' component={PUserTicketRead} /> */}
                    <UserRoute exact path='/user/booking' component={PUserBook} />
                    <UserRoute exact path='/confirmation_email' component={PUserConfirm} />


                    <PartnerRoute exact path='/partner' component={PVendorHome} />
                    <PartnerRoute exact path='/partner/profile' component={PVendorProfile} />
                    <PartnerRoute exact path='/partner/product' component={PVendorProduct} />
                    <PartnerRoute exact path='/partner/product/add' component={PVendorProductAdd} />
                    <PartnerRoute exact path='/partner/transaction' component={PVendorTransaction} />
                    <PartnerRoute exact path='/partner/transaction/:data_order' component={PVendorOrderDetail} />
                    <PartnerRoute exact path='/partner/product/detail/:data_slug' component={PVendorDetail} />
                    
                    {/* Error */}
                    <Route exact path='/error' component={PPageError} />
                    <Route component={PPage404} />

                </Switch>
            </div>
        )
    }
}
export default Routing
