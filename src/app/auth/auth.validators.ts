import {AbstractControl, FormGroup} from '@angular/forms';

export function ValidatePassword(control: AbstractControl) {
  if ((control.value.length < 7) || (control.value.length > 64)) {
    return { 'validPassword': true };
  }
  return null;
}

// Make sure that the new password has been entered twice
export function PasswordConfirmed(group: FormGroup): { [s: string]: boolean } {
  if (group.value.password !== group.value.password2) {
    return { 'passwordsdontmatch': true };
  } else {
    return null;
  }
}
