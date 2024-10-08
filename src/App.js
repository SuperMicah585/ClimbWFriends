import React, { useState, useEffect } from 'react';
import Main from './main'
import Demo from './demo'
import { BrowserRouter as Router, Route, Routes, Link,Navigate } from 'react-router-dom';


/*ToDos
refactor the app.js and add_climbs modal into smaller components.

react.memo child components when necessary to reduce renders.

Check for unessary re renders in general

consolidate styling

*/
function App() {


    return(
        <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </Router>

    )
}

export default App;
