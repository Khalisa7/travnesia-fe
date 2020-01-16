import React, { Component } from 'react'
import ContentLoader from "react-content-loader"


const TravelListMobileLoader = props => (
	<ContentLoader
		height={900}
		width={500}
		speed={2}
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
		{...props}
		
	>
		<rect x="7.77" y="7.67" rx="0" ry="0" width="625.95" height="272.22" />
		<rect x="9.23" y="296.67" rx="0" ry="0" width="622.72" height="267.75" />
		<rect x="461.23" y="298.67" rx="0" ry="0" width="0" height="0" />
		<rect x="12.23" y="587.67" rx="0" ry="0" width="619.02" height="278.88" />
	</ContentLoader>
)
export default TravelListMobileLoader