import React from 'react';

import Input from 'muicss/lib/react/input';

export const InputPassport = props =>
  <Input
    label={props.header}
    type="tel"
    required={props.required}
    floatingLabel={false}
    hint="0000-000000"
    title="Допустимый формат 0000-000000"
    pattern="[0-9]{4}[\W][0-9]{6}"
    onChange={props.onValidate}
    value={props.Value}
  />
