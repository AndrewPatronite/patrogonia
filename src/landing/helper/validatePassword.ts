import PasswordValidator from 'password-validator';
import isEmpty from 'lodash/isEmpty';

interface PasswordStatus {
  isValid: boolean;
  errorMessage?: string;
}

export const validatePassword = (
  password: string,
  confirmedPassword: string
): PasswordStatus => {
  const passwordStatus: PasswordStatus = { isValid: false };
  const passwordValidator = new PasswordValidator();
  // prettier-ignore
  passwordValidator
    .is().min(8)
    .is().max(16)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .has().not().spaces();
  passwordValidator.validate(password);

  const errors = passwordValidator.validate(password, { list: true });
  if (!isEmpty(errors)) {
    let message = '';
    (errors as string[]).forEach((error: string) => {
      switch (error) {
        case 'min':
        case 'max':
          message += `${message ? ', ' : ''}8 to 16 characters`;
          break;
        default:
          message += `${message ? ', ' : ''}${error}`;
          break;
      }
    });
    passwordStatus.errorMessage = 'Passwords: ' + message;
  } else if (password !== confirmedPassword) {
    passwordStatus.errorMessage = "Passwords don't match";
  } else {
    passwordStatus.isValid = true;
  }
  return passwordStatus;
};
