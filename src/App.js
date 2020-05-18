import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Patrogonia from './Patrogonia';

function App() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Patrogonia} />
        </BrowserRouter>
    );
}

export default App;
