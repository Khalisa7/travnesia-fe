import React, { Component}  from 'react';
import ContentLoader from "react-content-loader"

const PopularDestinationLoader = props => (
	<ContentLoader 
		height={700}
		width={1000}
		speed={2}
		primaryColor="#e1e0e2"
		secondaryColor="#ecebeb"
		{...props}
	>
		<rect x="5" y="25.33" rx="0" ry="0" width="365.28" height="194.25" /> 
		<rect x="439.7" y="19.33" rx="0" ry="0" width="7.8" height="0" /> 
		<rect x="389.1" y="26.33" rx="0" ry="0" width="602.29" height="191.88" /> 
		<rect x="369.2" y="54.33" rx="0" ry="0" width="0" height="0" /> 
		<rect x="-31.9" y="234.33" rx="0" ry="0" width="403" height="165" /> 
		<rect x="387.1" y="236.33" rx="0" ry="0" width="359" height="164" /> 
		<rect x="755.1" y="239.33" rx="0" ry="0" width="238" height="160" />
	</ContentLoader>
)

export default PopularDestinationLoader