const getSound = (soundClass) => document.getElementsByClassName(soundClass)[0];

export const playSound = (soundClass) => {
    try {
        const sound = getSound(soundClass);
        sound.play();
    } catch (e) {
        console.log(
            `Trouble playing ${soundClass} sound: ${JSON.stringify(e)}`
        );
    }
};

export const pauseSound = (soundClass) => {
    try {
        const sound = getSound(soundClass);
        sound.pause();
    } catch (e) {
        console.log(
            `Trouble pausing ${soundClass} sound: ${JSON.stringify(e)}`
        );
    }
};
