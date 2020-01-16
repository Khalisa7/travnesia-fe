import React from 'react'
import ContentLoader from 'react-content-loader'

const MobilePayment = props => (
	<ContentLoader 
		rtl
		height={740}
		width={360}
		speed={2}
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
		{...props}
	>
		<rect x="53.03" y="0.61" rx="0" ry="0" width="230.79" height="29.77" /> 
		<rect x="75.03" y="49.61" rx="0" ry="0" width="188" height="19" /> 
		<rect x="48.03" y="78.61" rx="0" ry="0" width="245" height="143" /> 
		<rect x="120.03" y="238.61" rx="0" ry="0" width="104" height="25" /> 
		<rect x="51.03" y="266.61" rx="0" ry="0" width="0" height="0" /> 
		<rect x="51.03" y="284.61" rx="0" ry="0" width="240" height="22" /> 
		<rect x="12.03" y="321.61" rx="0" ry="0" width="342" height="48" /> 
		<rect x="91.03" y="379.61" rx="0" ry="0" width="180" height="117" /> 
		<rect x="5.03" y="515.61" rx="0" ry="0" width="357" height="243" />
	</ContentLoader>
)
export default MobilePayment