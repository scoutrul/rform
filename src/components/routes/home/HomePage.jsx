import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reciveMakes, GET_MAKES } from '../../../actions'
import { bindActionCreators } from 'redux'

const mapStateToProps = state => {
	return {
		Makes: state
	}
}


class HomePage extends Component {

	componentDidMount(){
		this.props.reciveMakes()
	}

	render(){
		return (
			<div>
				<h1 style={{ fontSize: 50, fontWeigth: 'bold', textAlign: 'center' }}>
					http://www.carqueryapi.com/
				</h1>
				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
					<pre>{JSON.stringify(this.props.Makes, null, 2)}</pre>
				</div>
			</div>
		)
	}
}


export default connect(mapStateToProps, {reciveMakes})(HomePage)













// <input name="rusonly" pattern="\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"/>
