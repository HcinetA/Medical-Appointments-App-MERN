import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Formi from './components/auth/Formi';
import Newrdv from './components/views/Newrdv.js';
import NewPatientRdv from './components/views/NewPatientRdv';
import AppointmentTable from './components/views/AppointmentTable';
import PatientAffectation from './components/views/PatientAffectation';
import Consultation from './components/views/Consultation';
import Aconsultation from './components/views/Aconsultation';
import PaymentsTable from './components/views/PaymentsTable';
import Patients from './components/views/Patients';
import PatientProfile from './components/views/PatientProfile';
//redux

import './App.css';

const App = () => (
	<Router>
		<Fragment>
			<Navbar />
			<Route exact path='/' component={Landing} />
			<section className='container'>
				<Switch>
					<Route exact path='/register' component={Register} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/newrdv' component={Newrdv} />
					<Route exact path='/newpatient' component={NewPatientRdv} />
					<Route exact path='/appointments' component={AppointmentTable} />
					<Route exact path='/paffectation' component={PatientAffectation} />
					<Route exact path='/consultation' component={Consultation} />

					<Route exact path='/aconsultation' component={Aconsultation} />
					<Route exact path='/payments' component={PaymentsTable} />
					<Route exact path='/patients' component={Patients} />
					<Route exact path='/patient_profile' component={PatientProfile} />

					<Route exact path='/form' component={Formi} />
				</Switch>
			</section>
		</Fragment>
	</Router>
);
export default App;
