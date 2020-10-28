import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Patrogonia from './Patrogonia';
import ThemeProvider from './components/theme/ThemeProvider';

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Route exact path="/" component={Patrogonia} />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
