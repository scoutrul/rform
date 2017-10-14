import React from 'react';

import Input from 'muicss/lib/react/input';

export const InputRus = props =>
  <Input
    label={props.header}
    type="text"
    required={props.required}
    pattern="[а-яА-ЯёЁ\s]+"
    autoFocus={props.autoFocus}
    title="Только русские буквы"
    floatingLabel
    onChange={props.onValidate}
  />;

