import React, { Component}  from 'react';
import ContentLoader from "react-content-loader"

const PopularPackageLoader = props => (
	<ContentLoader 
	height={500}
	width={1500}
	speed={2}
	primaryColor="#f3f3f3"
	secondaryColor="#ecebeb"
	{...props}
	>
		<rect x="30.55" y="297.99" rx="4" ry="4" width="147.6" height="19.19" /> 
		<rect x="192.32" y="303.89" rx="4" ry="4" width="73.8" height="11.81" /> 
		<rect x="27" y="19" rx="5" ry="5" width="330.62" height="265.68" /> 
		<rect x="31.72" y="325.78" rx="0" ry="0" width="320.94" height="20.66" /> 
		<rect x="232.48" y="356.78" rx="0" ry="0" width="118.64" height="36.9" /> 
		<rect x="30.84" y="362.69" rx="0" ry="0" width="179.04" height="16.12" /> 
		<rect x="382.75" y="19" rx="5" ry="5" width="330.62" height="265.68" /> 
		<rect x="383.34" y="297.99" rx="4" ry="4" width="147.6" height="19.19" /> 
		<rect x="545.12" y="300.94" rx="4" ry="4" width="73.8" height="11.81" /> 
		<rect x="384.52" y="327.26" rx="0" ry="0" width="320.94" height="20.66" /> 
		<rect x="386.59" y="359.74" rx="0" ry="0" width="179.04" height="16.12" /> 
		<rect x="582.32" y="358.26" rx="0" ry="0" width="118.64" height="36.9" /> 
		<rect x="738.49" y="19" rx="5" ry="5" width="330.62" height="265.68" /> 
		<rect x="743.52" y="299.47" rx="4" ry="4" width="147.6" height="19.19" /> 
		<rect x="909.73" y="303.89" rx="4" ry="4" width="73.8" height="11.81" /> 
		<rect x="747.64" y="325.78" rx="0" ry="0" width="320.94" height="20.66" /> 
		<rect x="746.76" y="359.74" rx="0" ry="0" width="179.04" height="16.12" /> 
		<rect x="942.49" y="358.26" rx="0" ry="0" width="118.64" height="36.9" /> 
		<rect x="1087.99" y="20" rx="5" ry="5" width="330.62" height="265.68" /> 
		<rect x="1089.52" y="300.47" rx="4" ry="4" width="147.6" height="19.19" /> 
		<rect x="1249.73" y="300.89" rx="4" ry="4" width="73.8" height="11.81" /> 
		<rect x="1090.64" y="327.78" rx="0" ry="0" width="320.94" height="20.66" /> 
		<rect x="1091.76" y="359.74" rx="0" ry="0" width="179.04" height="16.12" /> 
		<rect x="1290.49" y="361.26" rx="0" ry="0" width="118.64" height="36.9" />
	</ContentLoader>
)

export default PopularPackageLoader