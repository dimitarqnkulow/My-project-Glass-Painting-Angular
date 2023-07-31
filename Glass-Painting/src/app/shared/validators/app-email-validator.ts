import { ValidatorFn } from '@angular/forms';

export function appEmailValidator(): ValidatorFn {
  const regExp = new RegExp(`[^@]{6,}@(abv|gmail|yahoo)\.(bg|com)$`);

  return (control) => {
    return control.value === '' || regExp.test(control.value)
      ? null
      : { appEmailValidator: true };
  };
}
