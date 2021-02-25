import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login';
import Navbar from './components/Navbar'
import Admin from './components/Admin'
import { auth } from './firebase'

function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false)

  //Hago que cargue primero la info de firebase antes de renderizar el componente
  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        setFirebaseUser(user)
      }
      else {
        setFirebaseUser(null)
      }
    })
  }, [])

  return firebaseUser !== false ? (
    <Router>
      <div className="container-fluid">
        <Navbar firebaseUser={firebaseUser}/>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            inicio...
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <p>Loading</p>
  )
}

export default App;
