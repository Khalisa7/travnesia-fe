import React, { Component}  from 'react';
import ContentLoader from "react-content-loader"

const HeaderLoader = props => (
	<ContentLoader 
		height={400}
		width={700}
		speed={2}
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
		{...props}
	>
		<rect x="3.64" y="2.27" rx="5" ry="5" width="640.72" height="266.99" /> 
		<rect x="36.83" y="30.67" rx="0" ry="0" width="0" height="0" />
	</ContentLoader>
)

export default HeaderLoader