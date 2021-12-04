const getSound = (soundClass: string) =>
  document.getElementsByClassName(soundClass)[0] as HTMLAudioElement

export const playSound = (soundClass: string) => {
  try {
    const sound = getSound(soundClass)
    sound.play()
  } catch (e) {
    console.error(`Trouble playing ${soundClass} sound: ${JSON.stringify(e)}`)
  }
}

export const pauseSound = (soundClass: string) => {
  try {
    const sound = getSound(soundClass)
    sound.pause()
  } catch (e) {
    console.error(`Trouble pausing ${soundClass} sound: ${JSON.stringify(e)}`)
  }
}
