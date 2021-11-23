import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Input } from '../control'
import PasswordInput from './PasswordInput'
import { Button, Stack } from '@chakra-ui/react'
import { isEmpty } from 'lodash'
import { encrypt } from './helper'

interface LoginFormProps {
  login: (username: string, password: string) => void
}

const LoginForm = ({ login }: LoginFormProps) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      const { username, password } = values
      login(username, encrypt(password))
    },
    validationSchema: Yup.object({
      username: Yup.string().trim().required('Required'),
      password: Yup.string().trim().required('Required'),
    }),
  })

  const submitLogin = (e: { preventDefault: () => void }) => {
    formik.submitForm()
    e.preventDefault()
  }

  const handleBlur = ({ target: { name } }: { target: { name: string } }) =>
    formik.setFieldTouched(name)

  return (
    <form onSubmit={submitLogin}>
      <Stack spacing="1rem">
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
          password={formik.values.password}
          onBlur={handleBlur}
          onChange={formik.handleChange}
          passwordErrorMessage={
            formik.touched.password ? formik.errors.password : undefined
          }
        />
        <Button
          type="submit"
          alignSelf="flex-end"
          colorScheme="blue"
          isDisabled={!isEmpty(formik.errors)}
        >
          Login
        </Button>
      </Stack>
    </form>
  )
}

export default LoginForm
