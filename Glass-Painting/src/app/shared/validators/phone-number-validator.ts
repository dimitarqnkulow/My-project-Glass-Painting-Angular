import { ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  const regExp = new RegExp(
    `^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`
  );

  return (control) => {
    return control.value === '' || regExp.test(control.value)
      ? null
      : { phoneNumberValidator: true };
  };
}
