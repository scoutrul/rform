import React from 'react';

import Input from 'muicss/lib/react/input';

export const InputEmail = props =>
  <Input label={props.header} type="email" required={props.required} floatingLabel />;
