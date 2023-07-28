import { ValidatorFn } from '@angular/forms';

export function appEmailValidator(): ValidatorFn {
  const regExp = new RegExp(`[^@]{6,}@(abv|gmail|yahoo)\.(bg|com)$`);
  console.log('VALIDATOR RUNS');

  return (control) => {
    console.log('CONTROLLER RUNS');
    return control.value === '' || regExp.test(control.value)
      ? null
      : { appEmailValidator: true };
  };
}
