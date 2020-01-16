import React, { Component}  from 'react';
import ContentLoader from "react-content-loader"

const PackageDetail = props => (
	<ContentLoader 
		height={850}
		width={1100}
		speed={2}
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
		{...props}
	>
		<rect x="109.18" y="356.99" rx="4" ry="4" width="155.61" height="8.51" /> 
		<rect x="108.18" y="385.62" rx="3" ry="3" width="113.05" height="8.51" /> 
		<rect x="14.99" y="445.53" rx="3" ry="3" width="465.5" height="8.51" /> 
		<rect x="14.99" y="472.15" rx="3" ry="3" width="505.4" height="8.51" /> 
		<rect x="14.99" y="498.78" rx="3" ry="3" width="267.33" height="8.51" /> 
		<circle cx="54.89" cy="378.92" r="39.9" /> 
		<rect x="12.61" y="22.42" rx="0" ry="0" width="700.99" height="301" /> 
		<rect x="735.1" y="22.83" rx="0" ry="0" width="309.74" height="38" /> 
		<rect x="734.1" y="65.83" rx="0" ry="0" width="309.89" height="324.21" /> 
		<rect x="18.6" y="522.83" rx="0" ry="0" width="692.18" height="162.74" /> 
		<rect x="17.6" y="698.83" rx="0" ry="0" width="694.08" height="37" /> 
		<rect x="18.6" y="740.83" rx="0" ry="0" width="694.08" height="40" /> 
		<rect x="736.1" y="409.83" rx="0" ry="0" width="312.09" height="38" /> 
		<rect x="738.1" y="453.83" rx="0" ry="0" width="310" height="136" />
	</ContentLoader>
)

export default PackageDetail