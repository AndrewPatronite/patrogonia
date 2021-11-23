import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import React from 'react'
import LoginForm from './LoginForm'
import Player from '../player/Player'
import CreateAccountForm from './CreateAccountForm'
import QuickStartForm from './QuickStartForm'
import { advanceFocus } from '../utils'

interface AccountSelectorProps {
  login: (username: string, password: string) => void
  createAccount: (player: Player) => void
}

const AccountSelector = ({ login, createAccount }: AccountSelectorProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if ('Tab' === e.key) {
      e.preventDefault()
      advanceFocus(e.target as Element, e.shiftKey)
    }
  }

  return (
    <Flex height="39rem" direction="column" justifyContent="center">
      <Box borderWidth={1}>
        <Tabs isLazy onKeyDown={handleKeyPress}>
          <TabList>
            <Tab>Quick Start</Tab>
            <Tab>Create Account</Tab>
            <Tab>Login</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <QuickStartForm createAccount={createAccount} />
            </TabPanel>
            <TabPanel>
              <CreateAccountForm createAccount={createAccount} />
            </TabPanel>
            <TabPanel>
              <LoginForm login={login} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  )
}

export default AccountSelector