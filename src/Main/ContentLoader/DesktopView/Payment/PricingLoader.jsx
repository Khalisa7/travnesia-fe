import React, { Component}  from 'react';
import ContentLoader from "react-content-loader"

const PricingLoader = props => (
	<ContentLoader 
		height={300}
		width={1000}
		speed={2}
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
		{...props}
	>
		<rect x="25" y="15" rx="5" ry="5" width="519.75" height="23.63" />
	</ContentLoader>
)

export default PricingLoader