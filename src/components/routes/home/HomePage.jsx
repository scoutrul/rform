import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reciveMakes, reciveModels, changeIsHaveCar, selectMakeName, selectModel } from '../../../actions'
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
		},
		Ui: {...state.UI}
	}
}


class HomePage extends Component {

	componentDidMount(){

	}

	ishaveCarChanger = () => {
		this.props.reciveMakes()
		this.props.changeIsHaveCar(!this.props.Ui.isHaveCar)
	}

	getModels = (Make_ID) => {
		this.props.reciveModels(Make_ID)
	}
	storeMakeName = (Make_Name) => {
		this.props.selectMakeName(Make_Name)
		this.props.selectModel(false)
	}
	onSelectModel = (e) => {
		this.props.selectModel(e)
	}

	

	render(){
		const MakesList = () => (
			<Dropdown color="primary" label={ this.props.Ui.currentMakeName || "Марка авто" } onSelect={(Make_ID)=>this.getModels(Make_ID)}>
				{ 
					this.props.data.Makes.map((car, i) =>
						i<20 &&
						<DropdownItem key={car.Make_ID} value={car.Make_ID} onClick={()=>this.storeMakeName(car.Make_Name)}>{car.Make_Name}</DropdownItem>
					)
				}
			</Dropdown>
		)
		const ModelList = () => (
			<Dropdown color="primary" label={ this.props.Ui.currentModel || "Модель авто" } onSelect={(e)=>{this.onSelectModel(e)}}>
				{
					this.props.data.Models.map((car)=>
						<DropdownItem key={car.Model_ID} value={car.Model_Name}>{car.Model_Name}</DropdownItem>
					)
				}
			</Dropdown>
		)

		const DISPLAY_STORE = this.props.data;
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
					<Checkbox name="havecar" label="Наличие авто" checked={this.props.Ui.isHaveCar} onChange={this.ishaveCarChanger}/>

					{this.props.Ui.isHaveCar && <MakesList/>}

					<br/>

					{this.props.Ui.currentMakeName && <ModelList/>}

					<Divider />
					<Button variant="raised" className="mui--pull-right">Отправить</Button>
				</Form>
				<Divider />
				<div style={{ marginTop: '5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
					<pre>The Store: {JSON.stringify(DISPLAY_STORE, null, 2)}</pre>
				</div>
			</Container>

		)
	}
}


export default connect(mapStateToProps, { reciveMakes, reciveModels, changeIsHaveCar, selectMakeName, selectModel } )(HomePage)







// <input name="rusonly" pattern="\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"/>
