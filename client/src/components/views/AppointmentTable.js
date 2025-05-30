import React, { Fragment, useEffect } from 'react';
import { Table, Button, Segment, Loader } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPatient, getPatients } from '../../actions/patient';
import { addRdv, getRdvs, deleteRdv } from '../../actions/rdv';
import { getDoctors } from '../../actions/doctor';
const AppointmentTable = ({
	getDoctors,
	doctor: { doctors },
	getPatients,
	patient: { patients },
	addPatient,
	getRdvs,
	rdv: { rdvs, loading },
	addRdv,
	auth,
	deleteRdv,
}) => {
	useEffect(() => {
		getDoctors();
	}, [getDoctors]);
	useEffect(() => {
		getPatients();
	}, [getPatients]);
	useEffect(() => {
		getRdvs();
	}, [getRdvs]);

	return loading || rdvs === null || auth.user === null ? (
		<Loader active />
	) : (
		<Fragment>
			<h1 className='large text-primary'> Liste des rendez-vous</h1>
			<Segment basic textAlign='right'>
				<Link to={`/aptd2/${auth.user._id}`}>
					<Button positive icon='filter' content='Mes Rendez-vous' />
				</Link>

				{/* <Input
					action={{ color: 'blue', content: 'Search' }}
					icon='search'
					iconPosition='left'
					placeholder='Patient Name'
				/> */}
			</Segment>{' '}
			<Table striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell> </Table.HeaderCell>{' '}
						<Table.HeaderCell> Name </Table.HeaderCell>{' '}
						<Table.HeaderCell> Date </Table.HeaderCell>{' '}
						<Table.HeaderCell> Doctor </Table.HeaderCell>{' '}
						<Table.HeaderCell> Status </Table.HeaderCell>{' '}
						<Table.HeaderCell> Options </Table.HeaderCell>{' '}
					</Table.Row>{' '}
				</Table.Header>
				<Table.Body>
					{' '}
					{rdvs.map((rdv) => (
						<Table.Row>
							<Table.Cell> </Table.Cell>{' '}
							<Table.Cell>
								{' '}
								<Link to={`/patient/${rdv.patient._id}`}>
									{rdv.patient.name}
								</Link>{' '}
							</Table.Cell>
							<Table.Cell>
								<Moment subtract={{ hours: 1 }} format='YYYY/MM/DD | hh:mm'>
									{rdv.date}
								</Moment>
							</Table.Cell>{' '}
							<Table.Cell> DR. {rdv.doctor.firstName} </Table.Cell>{' '}
							<Table.Cell>
								{' '}
								{rdv.status ? (
									<Button positive circular icon='check' disabled />
								) : (
									<Button negative circular icon='x' disabled />
								)}
							</Table.Cell>{' '}
							<Table.Cell>
								<Link to={`/appointment/${rdv._id}`}>
									<Button primary> Manage </Button>{' '}
								</Link>{' '}
							</Table.Cell>{' '}
						</Table.Row>
					))}{' '}
				</Table.Body>{' '}
			</Table>{' '}
		</Fragment>
	);
};

AppointmentTable.propTypes = {
	addPatient: PropTypes.func.isRequired,
	getDoctors: PropTypes.func.isRequired,
	doctor: PropTypes.object.isRequired,
	getPatients: PropTypes.func.isRequired,
	patient: PropTypes.object.isRequired,
	getRdvs: PropTypes.func.isRequired,
	rdv: PropTypes.object.isRequired,
	addRdv: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	deleteRdv: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	doctor: state.doctor,
	rdv: state.rdv,
	patient: state.patient,
	auth: state.auth,
});
export default connect(mapStateToProps, {
	addPatient,
	getDoctors,
	getPatients,
	getRdvs,
	addRdv,
	deleteRdv,
})(AppointmentTable);
