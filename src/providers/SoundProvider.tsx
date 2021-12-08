import { SoundContext } from '../context'
import React, { useCallback } from 'react'
import { Sound, SoundAudio } from '../environment/sound'

const SoundProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const pauseSound = useCallback((sound: Sound) => {
    const soundElement = SoundAudio[sound]

    try {
      soundElement.pause()
    } catch (e) {
      console.error(`Trouble pausing ${sound} sound: ${JSON.stringify(e)}`)
    }
  }, [])

  const playSound = useCallback(
    (sound: Sound, soundsToPause: Sound[] = []) => {
      const soundElement = SoundAudio[sound]
      if (soundElement) {
        soundElement.currentTime = 0
        soundElement
          .play()
          .then(() => {
            soundsToPause.forEach(pauseSound)
          })
          .catch((e) => {
            if (e && e.code === 0 && e.name === 'NotAllowedError') {
              console.debug("User hasn't interacted with the document yet")
            } else {
              console.error(
                `Trouble playing ${sound} sound: ${JSON.stringify(e)}`
              )
            }
          })
      }
    },
    [pauseSound]
  )

  const soundState = {
    pauseSound,
    playSound,
  }
  return (
    <SoundContext.Provider value={soundState}>{children}</SoundContext.Provider>
  )
}

export default SoundProvider
