import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Formi from './components/auth/Formi';
import Newrdv from './components/views/Newrdv.js';
import NewPatientRdv from './components/views/NewPatientRdv';

import AppointmentTable from './components/views/AppointmentTable';
import ConsultationTable from './components/views/ConsultationTable';
import PatientAffectation from './components/views/PatientAffectation';
import Consultation from './components/views/Consultation';
import Aconsultation from './components/views/Aconsultation';
import PaymentsTable from './components/views/PaymentsTable';
import Patients from './components/views/Patients';
import PatientProfile from './components/views/PatientProfile';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

//redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import './App.css';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Route exact path='/' component={Landing} />
					<section className='container'>
						<Alert />
						<Switch>
							<Route exact path='/register' component={Register} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/newrdv' component={Newrdv} />
							<Route exact path='/newpatient' component={NewPatientRdv} />
							<Route exact path='/appointments' component={AppointmentTable} />
							<Route
								exact
								path='/appointment/:id'
								component={PatientAffectation}
							/>
							<Route exact path='/consultation/:id' component={Consultation} />

							<Route
								exact
								path='/consultations'
								component={ConsultationTable}
							/>

							<Route exact path='/aconsultation' component={Aconsultation} />
							<Route exact path='/payments' component={PaymentsTable} />
							<Route exact path='/patients' component={Patients} />
							<Route exact path='/patient_profile' component={PatientProfile} />

							<PrivateRoute
								exact
								path='/assistantedashboard'
								component={Dashboard}
							/>
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
