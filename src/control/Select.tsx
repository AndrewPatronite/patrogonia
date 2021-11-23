import { Select as ChakraSelect, SelectProps } from '@chakra-ui/react'
import React from 'react'

const Select = (props: SelectProps) => (
  <ChakraSelect {...props} borderRadius={0} />
)

export default Select
