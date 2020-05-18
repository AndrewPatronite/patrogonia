import * as PasswordValidator from 'password-validator';
import { isEmpty } from 'lodash';

export const isValidPassword = (
    password,
    confirmedPassword,
    setErrorMessage
) => {
    let valid = false;
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
        // eslint-disable-next-line array-callback-return
        errors.map((error) => {
            switch (error) {
                case 'min':
                case 'max':
                    message && (message += ', ');
                    message += '8 to 16 characters';
                    break;
                default:
                    message && (message += ', ');
                    message += error;
                    break;
            }
        });
        setErrorMessage('Passwords: ' + message);
    } else if (password !== confirmedPassword) {
        setErrorMessage("Passwords don't match");
    } else {
        valid = true;
    }
    return valid;
};
