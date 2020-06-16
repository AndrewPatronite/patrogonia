import { playSound, pauseSound } from './sound';

describe('sound', () => {
    it('plays the soundClass passed in', () => {
        const sound = {
            play: jasmine.createSpy('play'),
        };
        spyOn(document, 'getElementsByClassName').and.returnValue([sound]);
        const soundClass = 'field-music';

        playSound(soundClass);

        expect(document.getElementsByClassName).toHaveBeenCalledWith(
            soundClass
        );
        expect(sound.play).toHaveBeenCalled();
    });

    it('logs Trouble when playing the soundClass passed in fails', () => {
        const sound = {
            play: jasmine
                .createSpy('play')
                .and.throwError('No worky' ),
        };
        spyOn(document, 'getElementsByClassName').and.returnValue([sound]);
        spyOn(console, 'log');
        const soundClass = 'field-music';

        playSound(soundClass);

        expect(document.getElementsByClassName).toHaveBeenCalledWith(
            soundClass
        );
        expect(sound.play).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith('Trouble playing field-music sound: {}');
    });

    it('pauses the soundClass passed in', () => {
        const sound = {
            pause: jasmine.createSpy('pause'),
        };
        spyOn(document, 'getElementsByClassName').and.returnValue([sound]);
        const soundClass = 'field-music';

        pauseSound(soundClass);

        expect(document.getElementsByClassName).toHaveBeenCalledWith(
            soundClass
        );
        expect(sound.pause).toHaveBeenCalled();
    });

    it('logs Trouble when pausing the soundClass passed in fails', () => {
        const sound = {
            pause: jasmine
                .createSpy('play')
                .and.throwError('No worky' ),
        };
        spyOn(document, 'getElementsByClassName').and.returnValue([sound]);
        spyOn(console, 'log');
        const soundClass = 'field-music';

        pauseSound(soundClass);

        expect(document.getElementsByClassName).toHaveBeenCalledWith(
            soundClass
        );
        expect(sound.pause).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith('Trouble pausing field-music sound: {}');
    });
});
