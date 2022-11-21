import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';
import Header from './components/Header/Header';
import Items from './components/Items/Items';

function App() {

  return (
    <div className="App" >
      <Header />
      <Switch>
        <Route path="/auth/:type" component={ Auth } />
        <Route path="/items" component={ Items } />
        <Route exact path="/">
          <Redirect to="/auth/sign-up" />
        </Route>
        <Route path="*" >
          <Redirect to="/auth/sign-in" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
