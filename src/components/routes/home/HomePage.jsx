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

import { InputRus, InputPassport, InputEmail } from './blocks';


const mapStateToProps = state => ({
  api: {
    Models: state.CarsReducer.CarModels,
    Makes: state.CarsReducer.CarsMakes,
  },
  form: { ...state.FormReducer },
});

@connect(mapStateToProps, actions)
export default class HomePage extends Component {
  componentDidMount() {

  }

 isHaveCarChanger = () => {
   this.props.reciveMakes(); // TD loading status
   this.props.changeIsHaveCar(!this.props.form.isHaveCar);
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

formSuccess = (e) => {
  e.preventDefault();
    console.log('waiting...');
  setTimeout(() => {
    console.log('success');
  }, 1000);
}

inputValidatePassport = val => {
	let _value = val.target.value;
	let execReg = /[^0-9]/g.exec(_value);
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



render() {
  const MakesList = () =>
    (<Dropdown color="primary" label={this.props.form.currentMakeName || 'Марка авто'} onSelect={(Make_ID) => this.getModels(Make_ID)}>
      {
        this.props.api.Makes.map((car, i) =>
          i < 30 &&
          <DropdownItem key={car.Make_ID} value={car.Make_ID} onClick={() => this.storeMakeName(car.Make_Name)}>{car.Make_Name}</DropdownItem>
        )
      }
    </Dropdown>);

  const ModelList = () =>
    (<Dropdown color="primary" label={this.props.form.currentModel || 'Модель авто'} onSelect={(e) => { this.onSelectModel(e); }}>
      {
        this.props.api.Models.map((car) =>
          <DropdownItem key={car.Model_ID} value={car.Model_Name}>{car.Model_Name}</DropdownItem>
        )
      }
    </Dropdown>);

  const DISPLAY_STORE = this.props.api;
  const DISPLAY_UI = this.props.form;
  return (
    <Container>
      <Form onSubmit={this.formSuccess}>
        <InputRus header="Фамилия *" autoFocus onValidate={this.inputValidateSurname}/>
        <InputRus header="Имя *"  onValidate={this.inputValidateName}/>
        <InputRus header="Отчетство"  onValidate={this.inputValidatePatronymic}/>
        <Input label="Дата рождения *" type="date" />
        <Radio name="inputGender" label="Мужской" />
        <Radio name="inputGender" label="Женский" />
        <InputPassport header="Серия и номер паспорта *" required onValidate={this.inputValidatePassport}/>
        <InputEmail header="E-mail *" />
        <Checkbox name="havecar" label="Наличие авто" checked={this.props.form.isHaveCar} onChange={this.isHaveCarChanger} />

        {this.props.form.isHaveCar && <MakesList />}

        <br />

        {this.props.form.currentMakeName && <ModelList />}

        <Divider />
        <Button variant="raised" className="mui--pull-right">Отправить</Button>
      </Form>

      <Divider />
      <div style={{ marginTop: '5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <pre>The UI Store: {JSON.stringify(DISPLAY_UI, null, 2)}</pre>
        <pre>The Store: {JSON.stringify(DISPLAY_STORE, null, 2)}</pre>
      </div>
    </Container>

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
