import { FormGroup, ValidatorFn } from '@angular/forms';

export function passwordsValidator(pass: string, rePass: string): ValidatorFn {
  return (control) => {
    const group = control as FormGroup;
    const password = group.get(pass);
    const repeatPassword = group.get(rePass);

    return password?.value === repeatPassword?.value
      ? null
      : { passwordsValidator: true };
  };
}
