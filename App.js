
import './App.css';

import Login from './Login';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Page2 from './Page2';
import Page3 from './Page3';

export const WHITE = '#f9f9f9';
export const BLUE = '#0373fc';


function App() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [currentFeedback, setCurrentFeedback] = useState({})

  const handleEmailChane = (e) => setEmail(e.target.value)
  const handleNamedChane = (e) => setName(e.target.value)

  return (
    <Router>
      <Switch >
        <Route path="*">
          <Login
            email={email}
            name={name}
            handleEmailChane={handleEmailChane}
            handleNamedChane={handleNamedChane}
          />
        </Route>
        <Route path="/">
          <Login
            email={email}
            name={name}
            handleEmailChane={handleEmailChane}
            handleNamedChane={handleNamedChane}
          />
        </Route>

        <Route path="/Page1">
          <Login
            email={email}
            name={name}
            handleEmailChane={handleEmailChane}
            handleNamedChane={handleNamedChane}
          />
        </Route>

        <Route path="/Page2">
          <Page2 email={email} name={name} setCurrentFeedback={setCurrentFeedback} />
        </Route>

        <Route path="/Page3">
          <Page3 email={email} name={name} feedback_id={currentFeedback.feedback_id} />
        </Route>

        {/* <Route component={Login} /> */}
        {/* <Redirect from='*' to='/Page1' /> */}
        {/* <Route exact  path="*">
          <Redirect to="/Page1" />
        </Route> */}

      </Switch>

      
      
    </Router>
    
  );
}


export default App;
