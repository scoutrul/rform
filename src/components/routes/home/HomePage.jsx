import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reciveMakes, reciveModels, changeIsHaveCar } from '../../../actions'
import Container from 'muicss/lib/react/container'
import Appbar from 'muicss/lib/react/appbar'
import Divider from 'muicss/lib/react/divider';
import Form from 'muicss/lib/react/form'
import Dropdown from 'muicss/lib/react/dropdown'
import DropdownItem from 'muicss/lib/react/dropdown-item'
import Input from 'muicss/lib/react/input'
import Checkbox from 'muicss/lib/react/checkbox'
import Radio from 'muicss/lib/react/radio'
import Button from 'muicss/lib/react/button'


const mapStateToProps = state => {
	return {
		data: {
			Makes: state.CarsReducer.CarsMakes,
			Models: state.CarsReducer.CarModels,
			Ui: state.UI
		}
		
	}
}


class HomePage extends Component {

	state = {
		selectedCarMake: null,
		selectedСarModel: null,
	}

	componentDidMount(){
		this.props.reciveMakes()
		
	}

	loadCarModels = () => {
		//do action => fetch models from api and store it
	}

	selectCarMake = (e) => {
		this.setState({
			selectedCarMake: e,
			isHaveCar: true
			})
		this.props.reciveModels(e)
	}
	selectCarModel = (e) => {
		this.setState({
			selectedСarModel: e,
			})
	}
	ishaveCarChanger = () => {
		let changeFlag = !this.props.data.Ui.isHaveCar
		this.props.changeIsHaveCar(changeFlag)
	}

	render(){
		const CarModelList = () => (
			<Dropdown color="primary" label={ this.state.selectedCarMake || "Марка авто" } onSelect={(e)=>{this.selectCarMake(e)}}>
				{
					this.props.data.Makes.map((car)=>
						<DropdownItem key={car.make_id} value={car.make_id}>{car.make_display}</DropdownItem>
					)
				}
			</Dropdown>
		)
		const SelectedCarModelList = () => (
			<Dropdown color="primary" label={ this.state.selectedСarModel || "Модель авто" } onSelect={(e)=>{this.selectCarModel(e)}}>
				{
					this.props.data.Models.map((car)=>
						<DropdownItem key={`${car.model_make_id}_${car.model_name}`} value={car.model_name}>{car.model_name}</DropdownItem>
					)
				}
			</Dropdown>
		)
		return (
			<Container fluid={false}>
				<Appbar>
					React validation form
				</Appbar>
				<Form>
					<legend>Фамилия *</legend>
						<Input hint="Фамилия" required autoFocus={true}/>
					<legend>Имя *</legend>
						<Input hint="Имя" required/>
					<legend>Отчетство</legend>
						<Input hint="Отчетство" />
					<legend>Дата рождения</legend>
						<Input hint="Дата рождения" type="date" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
					<legend>Пол</legend>
						<Radio name="inputGender" label="Мужской" />
						<Radio name="inputGender" label="Женский" />
					<legend>Серия и номер паспорта</legend>
						<Input hint="Серия и номер паспорта" type="text" required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
					<legend>E-mail</legend>
						<Input hint="E-mail" type="email"/>
					<Checkbox name="havecar" label="Наличие авто" checked={this.props.data.Ui.isHaveCar} onChange={this.ishaveCarChanger}/>

					{this.props.data.Ui.isHaveCar && <CarModelList/>}

					<br/>

					{this.state.selectedCarMake && <SelectedCarModelList/>}

					<Divider />
					<Button variant="raised" className="mui--pull-right">Отправить</Button>
				</Form>
				<Divider />
				<div style={{ marginTop: '5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
					<pre>The State: {JSON.stringify(this.state, null, 2)}</pre>
					<pre>The Store: {JSON.stringify(this.props.data, null, 2)}</pre>
				</div>
			</Container>

		)
	}
}


export default connect(mapStateToProps, { reciveMakes, reciveModels, changeIsHaveCar })(HomePage)







// <input name="rusonly" pattern="\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"/>
