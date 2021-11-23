import React, { useState } from 'react'
import { filter, isEmpty } from 'lodash'
import Player from './Player'
import PlayerStatsPanel from './PlayerStatsPanel'
import PlayerSpells from './PlayerSpells'
import { Maps } from '../environment/maps/Maps'
import PlayerOptions from './PlayerOptions'
import ThemedPanel from '../components/theme/ThemedPanel'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { advanceFocus } from '../utils'

const FieldMenu = ({
  showFieldMenu,
  closeFieldMenu,
  currentPlayer,
  castSpell,
}: {
  showFieldMenu: boolean
  closeFieldMenu: () => void
  currentPlayer: Player
  castSpell: (spellName: string, targetId: string) => void
}) => {
  const [tabIndex, setTabIndex] = useState(0)

  const availableSpells = filter(currentPlayer.spells, (spell) => {
    let canCast = spell.mpCost <= currentPlayer.stats.mp && !spell.offensive
    if (canCast) {
      switch (spell.spellName) {
        case 'HEAL':
          canCast = currentPlayer.stats.hp < currentPlayer.stats.hpTotal
          break
        case 'OUTSIDE':
          canCast = Maps.isCave(currentPlayer.location.mapName)
          break
        case 'RETURN':
          canCast =
            Maps.isField(currentPlayer.location.mapName) ||
            Maps.isTown(currentPlayer.location.mapName)
          break
      }
    }
    return canCast
  })

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if ('Tab' === e.key) {
      e.preventDefault()
      advanceFocus(e.target as Element, e.shiftKey)
    }
  }

  const tabProps = {
    justifyContent: 'flex-start',
    paddingRight: '1rem',
  }

  return (
    <Drawer
      size="sm"
      placement="left"
      onClose={closeFieldMenu}
      isOpen={showFieldMenu}
    >
      <DrawerOverlay />
      <DrawerContent
        background="transparent"
        boxShadow={0}
        paddingTop="1rem"
        paddingLeft="1rem"
      >
        <DrawerBody padding={0}>
          <ThemedPanel>
            <Tabs
              orientation="vertical"
              width="100%"
              index={tabIndex}
              isLazy
              onChange={setTabIndex}
              onKeyDown={handleKeyPress}
            >
              <TabList>
                <Tab {...tabProps}>Stats</Tab>
                <Tab {...tabProps} isDisabled={isEmpty(availableSpells)}>
                  Spells
                </Tab>
                <Tab {...tabProps}>Options</Tab>
              </TabList>

              <TabPanels>
                <TabPanel paddingY={0} display="flex" justifyContent="center">
                  <PlayerStatsPanel
                    playerStats={currentPlayer.stats}
                    showHeading={false}
                    includeBorder={false}
                  />
                </TabPanel>
                <TabPanel
                  paddingY={0}
                  display="flex"
                  justifyContent="center"
                  tabIndex={0}
                >
                  <PlayerSpells
                    currentPlayer={currentPlayer}
                    availableSpells={availableSpells}
                    castSpell={castSpell}
                    onSpellCast={() => {
                      setTabIndex(0)
                      closeFieldMenu()
                    }}
                  />
                </TabPanel>
                <TabPanel paddingY={0} display="flex" justifyContent="center">
                  <PlayerOptions />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ThemedPanel>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default FieldMenu
