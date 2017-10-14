import React from 'react';

export const LoadingScreen = () => 
	<div style={styles}>
			<img src="https://cdn.dribbble.com/users/729829/screenshots/3468434/galshir-spinner.gif" style={{maxWidth: '100%'}}/>
	</div>

const styles = {
	position: 'absolute',
	width: '100vw',
	height: '100vh',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	zIndex: 10,
	backgroundColor: 'rgba(255, 255, 255, 0.7)'

}