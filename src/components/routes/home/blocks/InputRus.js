import React from 'react'

import Input from 'muicss/lib/react/input';

const onValidNumber = (e) => {
	let res = /[^0-9]/g.exec(e.target.value);
	e.target.value = e.target.value.replace(res, '');
}

export const InputRus = props =>
<Input label={props.header} type="text" required={props.required} pattern="[а-яА-ЯёЁ]+" autoFocus={props.autoFocus} title="Только русские буквы" floatingLabel={true}/>

export const InputPassport = props => 
<Input label={props.header} type="tel" required={props.required} floatingLabel={false} hint="0000-000000" title="Допустимый формат 0000-000000" pattern="[0-9]{4}[- ][0-9]{6}" />

export const InputEmail = props =>
<Input label={props.header} type="email" required={props.required} floatingLabel={true}/>