import React, { Component}  from 'react';
import ContentLoader from "react-content-loader"

const CheckoutLoader = props => (
	<ContentLoader 
		height={1000}
		width={1300}
		speed={2}
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
		{...props}
	>
		<rect x="35.37" y="39.13" rx="0" ry="0" width="15.6" height="0" /> 
		<rect x="29.23" y="22.6" rx="0" ry="0" width="802.4" height="239" /> 
		<rect x="28.62" y="279.67" rx="0" ry="0" width="806.93" height="664.56" /> 
		<rect x="869.53" y="21.13" rx="0" ry="0" width="399.2" height="755.91" />
	</ContentLoader>
)

export default CheckoutLoader