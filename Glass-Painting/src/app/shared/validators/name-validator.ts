import { ValidatorFn } from '@angular/forms';

export function nameValidator(): ValidatorFn {
  const regExp = new RegExp(`^[A-Za-z0-9]+$`);

  return (control) => {
    return control.value === '' || regExp.test(control.value)
      ? null
      : { nameValidator: true };
  };
}
