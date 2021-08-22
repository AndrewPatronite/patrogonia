import React from 'react';
import ThemeProvider from './components/theme/ThemeProvider';
import Patrogonia from './Patrogonia';
import { BrowserRouter } from 'react-router-dom';
import { CharacterPositionProvider, ModalStateProvider } from './context';

function App() {
    return (
        <ThemeProvider>
            <CharacterPositionProvider>
                <ModalStateProvider>
                    <BrowserRouter>
                        <Patrogonia />
                    </BrowserRouter>
                </ModalStateProvider>
            </CharacterPositionProvider>
        </ThemeProvider>
    );
}

export default App;
