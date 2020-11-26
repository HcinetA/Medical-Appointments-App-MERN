import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import Navbar from './components/layout/Navbar';
import Nav from './components/layout/Nav';

import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Newrdv from './components/views/Newrdv.js';
import NewPatientRdv from './components/views/NewPatientRdv';
import ModifRdv from './components/views/ModifRdv';
import AppointmetsDoctor from './components/views/AppointmetsDoctor';
import AppointmentDoctors2 from './components/views/AppointmentDoctors2';

import AppointmentTable from './components/views/AppointmentTable';
import ConsultationTable from './components/views/ConsultationTable';
import AppTable from './components/views/AppTable';
import MakePayment from './components/views/MakePayment';
import PatientAffectation from './components/views/PatientAffectation';
import Consultation from './components/views/Consultation';
import Aconsultation from './components/views/Aconsultation';
import PaymentsTable from './components/views/PaymentsTable';
import Patients from './components/views/Patients';
import Dpatients from './components/views/Dpatients';
import Dcpatients from './components/views/Dcpatients';
import DcpatientProfile from './components/views/DcpatientProfile';
import DpatientProfile from './components/views/DpatientProfile';

import PatientProfile from './components/views/PatientProfile';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Doctor2Dash from './components/dashboard/Doctor2Dash';

import DoctorDash from './components/dashboard/DoctorDash';

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
					<Nav />
					<Route exact path='/' component={Landing} />
					<section className='container'>
						<Alert />
						<Switch>
							<Route exact path='/register' component={Register} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/newrdv' component={Newrdv} />
							<Route exact path='/newpatient' component={NewPatientRdv} />
							<Route exact path='/appointments' component={AppointmentTable} />
							<Route exact path='/apps' component={AppTable} />
							<Route
								exact
								path='/appointment/:id'
								component={PatientAffectation}
							/>
							<Route exact path='/modifrdv/:id' component={ModifRdv} />
							<Route exact path='/payment/:id' component={MakePayment} />
							<Route exact path='/consultation/:id' component={Consultation} />
							<Route exact path='/app/:id' component={Aconsultation} />
							<Route exact path='/patient/:id' component={PatientProfile} />
							<Route exact path='/dcpatient/:id' component={DcpatientProfile} />
							<Route exact path='/dpatient/:id' component={DpatientProfile} />
							<Route exact path='/aptd/:id' component={AppointmetsDoctor} />
							<Route exact path='/aptd2/:id' component={AppointmentDoctors2} />

							<Route
								exact
								path='/consultations'
								component={ConsultationTable}
							/>

							<Route exact path='/payments' component={PaymentsTable} />
							<Route exact path='/patients' component={Patients} />
							<Route exact path='/dcpatients' component={Dcpatients} />

							<Route exact path='/dpatients' component={Dpatients} />

							<PrivateRoute
								exact
								path='/assistantedashboard'
								component={Dashboard}
							/>
							<PrivateRoute
								exact
								path='/doctordashboard'
								component={DoctorDash}
							/>
							<PrivateRoute
								exact
								path='/cdoctordashboard'
								component={Doctor2Dash}
							/>
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
