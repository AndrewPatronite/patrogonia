import { Button, Stack } from '@chakra-ui/react'
import React, { ChangeEventHandler, useState } from 'react'
import { Input } from '../control'

interface PasswordInputProps {
  password: string
  confirmedPassword?: string
  onBlur: (e: { target: { name: string } }) => void
  onChange: ChangeEventHandler
  doConfirm?: boolean
  passwordErrorMessage?: string
  confirmedPasswordErrorMessage?: string
}

const PasswordInput = ({
  password,
  confirmedPassword,
  onBlur,
  onChange,
  doConfirm = false,
  passwordErrorMessage,
  confirmedPasswordErrorMessage,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Stack spacing="1rem">
      <Input
        isRequired
        name="password"
        label="Password"
        maxLength={16}
        type={showPassword ? 'text' : 'password'}
        value={password}
        onBlur={onBlur}
        onChange={onChange}
        autoComplete={doConfirm ? 'new-password' : undefined}
        errorMessage={passwordErrorMessage}
      />
      {doConfirm && (
        <Input
          isRequired
          name="confirmedPassword"
          label="Confirm"
          maxLength={16}
          type={showPassword ? 'text' : 'password'}
          value={confirmedPassword || ''}
          onBlur={onBlur}
          onChange={onChange}
          autoComplete="new-password"
          errorMessage={confirmedPasswordErrorMessage}
        />
      )}
      <Button
        variant="link"
        alignSelf="flex-end"
        marginLeft="0.25rem"
        height="1.75rem"
        size="sm"
        onClick={() => setShowPassword((previousValue) => !previousValue)}
      >
        {showPassword ? 'Hide' : 'Show'}
      </Button>
    </Stack>
  )
}

export default PasswordInput
