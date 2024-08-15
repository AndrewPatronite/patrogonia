import React from 'react';
import { encrypt, validatePassword } from './helper';
import { Button, Stack } from '@chakra-ui/react';
import PasswordInput from './PasswordInput';
import { Input } from '../control';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import isEmpty from 'lodash/isEmpty';
import { startingLocation } from './startingLocation';
import { Player } from '../player';
import { CredentialedPlayer } from '../player/types';

interface CreateAccountFormProps {
  createAccount: (player: Partial<Player>) => void;
}

const CreateAccountForm = ({ createAccount }: CreateAccountFormProps) => {
  const validationSchema: any = Yup.object({
    name: Yup.string().trim().required('Required'),
    username: Yup.string().trim().required('Required'),
    password: Yup.string()
      .trim()
      .required('Required')
      .min(8, '8 to 16 characters, uppercase, digits, symbols')
      .max(16, '8 to 16 characters, uppercase, digits, symbols'),
    confirmedPassword: Yup.string()
      .trim()
      .required('Required')
      .min(8, '8 to 16 characters, uppercase, digits, symbols')
      .max(16, '8 to 16 characters, uppercase, digits, symbols')
      .test('password-requirements', function () {
        const passwordStatus = validatePassword(
          formik.values.password,
          formik.values.confirmedPassword
        );
        return (
          passwordStatus.isValid ||
          this.createError({
            message: passwordStatus.errorMessage,
          })
        );
      }),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: '',
      confirmedPassword: '',
    },
    onSubmit: async (values) => {
      const { name, username, password } = values;
      const player: Partial<CredentialedPlayer> = {
        name,
        username,
        password: encrypt(password),
        location: startingLocation,
      };
      createAccount(player);
    },
    validationSchema,
  });

  const submitNewAccount = (e: { preventDefault: () => void }) => {
    formik.submitForm();
    e.preventDefault();
  };

  const handleBlur = ({ target: { name } }: { target: { name: string } }) =>
    formik.setFieldTouched(name);

  return (
    <form onSubmit={submitNewAccount}>
      <Stack spacing="1rem">
        <Input
          autoComplete="off"
          isRequired
          name="name"
          label="Character name"
          value={formik.values.name}
          onBlur={handleBlur}
          onChange={formik.handleChange}
          errorMessage={formik.touched.name ? formik.errors.name : undefined}
        />
        <Input
          autoComplete="off"
          isRequired
          name="username"
          label="Username"
          value={formik.values.username}
          onBlur={handleBlur}
          onChange={formik.handleChange}
          errorMessage={
            formik.touched.username ? formik.errors.username : undefined
          }
        />
        <PasswordInput
          doConfirm={true}
          password={formik.values.password}
          confirmedPassword={formik.values.confirmedPassword}
          onBlur={handleBlur}
          onChange={formik.handleChange}
          passwordErrorMessage={
            formik.touched.password ? formik.errors.password : undefined
          }
          confirmedPasswordErrorMessage={
            formik.touched.confirmedPassword
              ? formik.errors.confirmedPassword
              : undefined
          }
        />
        <Button
          type="submit"
          alignSelf="flex-end"
          colorScheme="blue"
          isDisabled={!isEmpty(formik.errors)}
        >
          Create
        </Button>
      </Stack>
    </form>
  );
};

export default CreateAccountForm;
