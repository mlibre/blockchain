import React, { Component } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Router, Route, Switch } from 'react-router';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {Campaign} from './components/Campaign';
import {Home} from './components/Home';
import {NotFound} from './components/NotFound';
import history from './history.js'

class App extends Component {
	render(){
		return(
			<Router history={history}>
				<Container>
					<Menu secondary>
						<Menu.Item onClick={this.navigateToHome}>
							Home
						</Menu.Item>						
					</Menu>
					<Switch>
						<Route exact path='/' component={Home}/>
						<Route path='/campaigns/:address' component={Campaign}/>
						<Route component={NotFound}/> 
					</Switch>
					</Container>
			</Router>
		);
	}
	navigateToHome(e){
		e.preventDefault();
		history.push('/')
	}
}

export default App;
