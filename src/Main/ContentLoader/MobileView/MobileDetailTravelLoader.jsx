import React from 'react'
import ContentLoader from 'react-content-loader'

const MobileDetailTravelLoader = props => (
	<ContentLoader 
		rtl
		height={740}
		width={360}
		speed={2}
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
		{...props}
	>
		<rect x="-46.67" y="-17.78" rx="0" ry="0" width="428.97" height="200" /> 
		<rect x="11.03" y="194.61" rx="0" ry="0" width="147" height="13" /> 
		<rect x="12.03" y="216.61" rx="0" ry="0" width="188" height="19" /> 
		<rect x="10.03" y="240.61" rx="0" ry="0" width="340" height="121" /> 
		<rect x="9.03" y="379.61" rx="0" ry="0" width="341" height="50" /> 
		<rect x="10.03" y="441.61" rx="0" ry="0" width="341" height="180" />
	</ContentLoader>
)
export default MobileDetailTravelLoader