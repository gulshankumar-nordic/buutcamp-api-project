import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import Loading from './Loading';
import Navigation from './Navigation';
import Main from './Main'
import Login from './Login';
import Authentication from './Authentication';
import LocationDetail from './LocationDetail';
import LocationUpdate from './LocationUpdate';
import Footer from './Footer';
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
    <Loading>
      <Navigation />
      <Switch>
      <Route path="/home" exact={true} component={Main}/>
        <Route path="/login" exact={true} component={Login}/>
        <Redirect from="/logout" to="/login" />
        <Route path="/" exact={true} component={App}/>
        <Authentication>      
          <Route path="/" exact={true} component={App}/>
          <Route path="/:id" component={LocationDetail} exact={true} />
          <Route path="/:id/update" component={LocationUpdate} exact={true} />
        </Authentication>
      </Switch>
      <Footer/>
  
  </Loading>
  </BrowserRouter>
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
