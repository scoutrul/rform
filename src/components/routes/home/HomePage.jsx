import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../styles/index'
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
  Cars: state.CarsReducer,
  Form: state.FormReducer,
});

@connect(mapStateToProps, actions)
export default class HomePage extends Component {
 isHaveCarChanger = () => {
   this.props.reciveMakes(); // TD loading status
   this.props.changeIsHaveCar(!this.props.Form.isHaveCar);
 }

 getModels = MakeID => {
   this.props.reciveModels(MakeID);
 }
 storeMakeName = MakeName => {
   this.props.selectMakeName(MakeName);
   this.props.selectModel(false);
 }
 onSelectModel = ModelName => {
   this.props.selectModel(ModelName);
 }

formSubmit = e => {
  e.preventDefault();
  this.props.isSending();
  setTimeout(() => {
    this.props.isSendingDone();
    this.props.formReset()
    alert('success!')
  }, 400);
}

inputValidatePassport = val => {
  const _value = val.target.value;
  const execReg = /[^0-9\-]/g.exec(_value);
  const payload = () => val.target.value = _value.replace(execReg, '');
  this.props.passportValid(payload());
}

inputValidateRus = val => {
  const regexp = /[^а-яА-ЯёЁ\s]/g;
  const _value = val.target.value;
  const execReg = regexp.exec(_value);
  return _value.replace(execReg, '');
}

inputValidateSurname = e => {
  const payload = this.inputValidateRus(e);
  e.target.value = payload;
  this.props.surnameValid(payload);
}

inputValidateName = e => {
  const payload = this.inputValidateRus(e);
  e.target.value = payload;
  this.props.nameValid(payload);
}

inputValidatePatronymic = e => {
  const payload = this.inputValidateRus(e);
  e.target.value = payload;
  this.props.patronymicValid(payload);
}

inputValidateEmail = e => {
  const payload = e.target.value;
  this.props.emailValid(payload);
}

setGender = e => {
  this.props.setGender(e.target.value)
}

setBirthDate = e => {
  this.props.setBirthDate(e.target.value)
}

render() {
  const MakesList = () =>
    (<Dropdown color="primary" label={this.props.Form.currentMakeName || 'Марка авто'} onSelect={(MakeID) => this.getModels(MakeID)}>
      {
        this.props.Cars.CarMakes.map((car, i) =>
          i < 30 &&
          <DropdownItem key={car.Make_ID} value={car.Make_ID} onClick={() => this.storeMakeName(car.Make_Name)}>{car.Make_Name}</DropdownItem>
        )
      }
    </Dropdown>);

  const ModelList = () =>
    (<Dropdown color="primary" label={this.props.Form.currentModel || 'Модель авто'} onSelect={(e) => { this.onSelectModel(e); }}>
      {
        this.props.Cars.CarModels.map((car) =>
          <DropdownItem key={car.Model_ID} value={car.Model_Name}>{car.Model_Name}</DropdownItem>
        )
      }
    </Dropdown>);

  const DISPLAY_UI = this.props.Form;
  return (
    <div>
      {(this.props.Cars.isLoading || this.props.Form.isSending) && <LoadingScreen />}

      <Container>
        <Form onSubmit={this.formSubmit} ref={(e) => this.form = e}>
          <InputRus header="Фамилия *" Value={this.props.Form.surname} autoFocus onValidate={this.inputValidateSurname} />
          <InputRus header="Имя *" Value={this.props.Form.name} onValidate={this.inputValidateName} />
          <InputRus header="Отчетство" Value={this.props.Form.patronymic} onValidate={this.inputValidatePatronymic} />
          <Input label="Дата рождения *" type="date" value={this.props.Form.birthdate} onChange={this.setBirthDate} />
          <Radio name="inputGender" label="Мужской" value="Мужской" checked={this.props.Form.gender} onChange={this.setGender} />
          <Radio name="inputGender" label="Женский" value="Женский" checked={this.props.Form.gender} onChange={this.setGender} />
          <InputPassport header="Серия и номер паспорта *" Value={this.props.Form.passport} onValidate={this.inputValidatePassport} />
          <InputEmail header="E-mail *" onValidate={this.inputValidateEmail} Value={this.props.Form.email} />
          <Checkbox name="havecar" label="Наличие авто" checked={this.props.Form.isHaveCar} onChange={this.isHaveCarChanger} />

          {this.props.Form.isHaveCar && <MakesList />}

          <br />

          {this.props.Form.currentMakeName && <ModelList />}

          <Divider />
          <Button variant="raised" className="mui--pull-right">Отправить</Button>
        </Form>

        <Divider />
        <div className="storeContainer">
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
