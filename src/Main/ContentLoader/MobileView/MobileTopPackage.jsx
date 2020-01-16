import React from 'react'
import ContentLoader from 'react-content-loader'

const MobileTopPackage = props => (
	<ContentLoader 
		height={400}
		width={800}
		speed={2}
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
		{...props}
	>
		<rect x="-3.36" y="-10.37" rx="5" ry="5" width="786.07" height="424.99" /> 
		<rect x="36.83" y="30.67" rx="0" ry="0" width="0" height="0" />
	</ContentLoader>
)
export default MobileTopPackage