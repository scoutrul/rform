import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Container from 'muicss/lib/react/container';
import Divider from 'muicss/lib/react/divider';
import Form from 'muicss/lib/react/form';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
import Input from 'muicss/lib/react/input';
import Checkbox from 'muicss/lib/react/checkbox';
import Radio from 'muicss/lib/react/radio';
import Button from 'muicss/lib/react/button';

import { InputRus, InputPassport, InputEmail, LoadingScreen } from './blocks';


const mapStateToProps = state => ({
  CarsReducer: { ...state.CarsReducer },
  FormReducer: { ...state.FormReducer },
});

@connect(mapStateToProps, actions)
export default class HomePage extends Component {
  componentDidMount() {

  }

 isHaveCarChanger = () => {
   this.props.reciveMakes(); // TD loading status
   this.props.changeIsHaveCar(!this.props.FormReducer.isHaveCar);
 }

 getModels = Make_ID => {
   this.props.reciveModels(Make_ID);
 }
 storeMakeName = Make_Name => {
   this.props.selectMakeName(Make_Name);
   this.props.selectModel(false);
 }
 onSelectModel = Model_Name => {
   this.props.selectModel(Model_Name);
 }

formSubmit = (e) => {
  e.preventDefault();
    this.props.isSending()
  setTimeout(() => {
    this.props.isSendingDone()
  }, 400);
}

inputValidatePassport = val => {
	let _value = val.target.value;
	let execReg = /[^0-9\-]/g.exec(_value);
	let payload  = () => {
		return val.target.value = _value.replace(execReg, '')
	}
	this.props.passportValid(payload())
}

inputValidateRus = val => {
	let regexp = /[^а-яА-ЯёЁ\s]/g;
	let _value = val.target.value;
	let execReg = regexp.exec(_value);
	return _value.replace(execReg, '')
}

inputValidateSurname = e => {
	let payload = this.inputValidateRus(e);
	e.target.value = payload;
	this.props.surnameValid(payload)
}

inputValidateName = e => {
	let payload = this.inputValidateRus(e);
	e.target.value = payload;
	this.props.nameValid(payload)
}

inputValidatePatronymic = e => {
	let payload = this.inputValidateRus(e);
	e.target.value = payload;
	this.props.patronymicValid(payload)
}

inputValidateEmail = e => {
	let payload = e.target.value 
	this.props.emailValid(payload)
}



render() {
  const MakesList = () =>
    (<Dropdown color="primary" label={this.props.FormReducer.currentMakeName || 'Марка авто'} onSelect={(Make_ID) => this.getModels(Make_ID)}>
      {
        this.props.CarsReducer.CarsMakes.map((car, i) =>
          i < 30 &&
          <DropdownItem key={car.Make_ID} value={car.Make_ID} onClick={() => this.storeMakeName(car.Make_Name)}>{car.Make_Name}</DropdownItem>
        )
      }
    </Dropdown>);

  const ModelList = () =>
    (<Dropdown color="primary" label={this.props.FormReducer.currentModel || 'Модель авто'} onSelect={(e) => { this.onSelectModel(e); }}>
      {
        this.props.CarsReducer.CarsModels.map((car) =>
          <DropdownItem key={car.Model_ID} value={car.Model_Name}>{car.Model_Name}</DropdownItem>
        )
      }
    </Dropdown>);

  const DISPLAY_STORE = this.props.CarsReducer;
  const DISPLAY_UI = this.props.FormReducer;
  return (
  <div>
     {(this.props.CarsReducer.isLoading || this.props.FormReducer.isSending ) && <LoadingScreen />}

    <Container>
      <Form onSubmit={this.formSubmit} ref={(e)=> this.form = e}>
        <InputRus header="Фамилия *" autoFocus onValidate={this.inputValidateSurname} />
        <InputRus header="Имя *" onValidate={this.inputValidateName} />
        <InputRus header="Отчетство"  onValidate={this.inputValidatePatronymic}/>
        <Input label="Дата рождения *" type="date" />
        <Radio name="inputGender" label="Мужской" />
        <Radio name="inputGender" label="Женский" />
        <InputPassport header="Серия и номер паспорта *" onValidate={this.inputValidatePassport} />
        <InputEmail header="E-mail *" onValidate={this.inputValidateEmail} />
        <Checkbox name="havecar" label="Наличие авто" checked={this.props.FormReducer.isHaveCar} onChange={this.isHaveCarChanger} />

        {this.props.FormReducer.isHaveCar && <MakesList />}

        <br />

        {this.props.FormReducer.currentMakeName && <ModelList />}

        <Divider />
        <Button variant="raised" className="mui--pull-right">Отправить</Button>
      </Form>

      <Divider />
      <div style={{ marginTop: '5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <pre>The Form Store: {JSON.stringify(DISPLAY_UI, null, 2)}</pre>
      </div>
    </Container>
    </div>

  );
}
}


// # Тестовое задание React
// Разработать компонент формы с валидацией и фильтрацией ввода.
// ## Поля формы:
// + Фамилия`*` (только русские буквы, фильтрация ввода) 
// + Имя`*` (только русские буквы, фильтрация ввода) 
// + Отчество (только русские буквы, фильтрация ввода) 
// + Дата рождения`*` (старше 18 лет, формат - DD.MM.YYYY) 
// + Пол`*` 
// + Серия и номер паспорта`*` (сделать маску дл ввода, только цифры, фильтрация ввода) 
// + Электронная почта`*` (проверка валидности адреса) 
// + Наличие автомобиля 
// + Марка автомобиля (заполняется при наличии автомобиля, выбирается и списка) 
// + Модель автомобиля (заполняется при наличии автомобиля, зависит от выбранной марки автомобиля, выбирается из списка)

// `*` - обязательно для заполнения

// + Для не валидного поля необходимо подсвечивать поле и выводить сообщение об ошибке.

// После подтверждения данных формы сделать эмуляцию запроса на сервер с помощью таймаута и выводить на экран сообщение о сохранении данных на время таймаута.

// Весь функционал формы (валидация, ввод данных, фильтрация, сабмит) должен выполняться в редьюсере для этой формы с помощью Redux.
