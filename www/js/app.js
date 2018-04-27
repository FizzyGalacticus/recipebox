import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import store from 'redux/store';

import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import NoMatch from './components/NoMatch';

import Navbar from './components/Navbar';

import {ROUTES} from './routes.js';


class Layout extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div>
						<Navbar links={ROUTES} />

						<div className='container'>
							<Switch>
								{ROUTES.map((link, i) => {
									return (
										<Route
											key={i}
											path={link.href}
											component={link.component}
										/>
									);
								})}

								<Redirect exact from="/" to="/home" />
								<Route component={NoMatch} />
							</Switch>
						</div>
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

const app = document.getElementById('app');

ReactDOM.render(<Layout />, app);
