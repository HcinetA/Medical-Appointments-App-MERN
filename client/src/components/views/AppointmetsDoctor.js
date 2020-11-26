import React, { Fragment, useEffect } from 'react';
import { Table, Button, Loader } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPatient, getPatients } from '../../actions/patient';
import { addRdv, getRdvs, getRdvsd } from '../../actions/rdv';
import { getDoctors } from '../../actions/doctor';
const AppointmetsDoctor = ({
	getDoctors,
	doctor: { doctors },
	getPatients,
	patient: { patients },
	addPatient,
	getRdvs,
	rdv: { rdvs, loading },
	addRdv,
	getRdvsd,
	match,
}) => {
	useEffect(() => {
		getDoctors();
	}, [getDoctors]);
	useEffect(() => {
		getPatients();
	}, [getPatients]);

	useEffect(() => {
		getRdvsd(match.params.id);
	}, [getRdvsd, match.params.id]);

	return loading || rdvs === null ? (
		<Loader active />
	) : (
		<Fragment>
			<h1 className='large text-primary'> Mes Rendez-vous</h1>
			<Table striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell> # </Table.HeaderCell>{' '}
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
						<Table.Row key={rdv.id} rdv={rdv}>
							<Table.Cell> 1 </Table.Cell>{' '}
							<Table.Cell> {rdv.patient.name} </Table.Cell>{' '}
							<Table.Cell>
								<Moment format='YYYY/MM/DD'>{rdv.date}</Moment> | {rdv.time}{' '}
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
								<Link to={`/consultation/${rdv._id}`}>
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

AppointmetsDoctor.propTypes = {
	addPatient: PropTypes.func.isRequired,
	getDoctors: PropTypes.func.isRequired,
	doctor: PropTypes.object.isRequired,
	getPatients: PropTypes.func.isRequired,
	patient: PropTypes.object.isRequired,
	getRdvs: PropTypes.func.isRequired,
	rdv: PropTypes.object.isRequired,
	addRdv: PropTypes.func.isRequired,
	getRdvsd: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	doctor: state.doctor,
	rdv: state.rdv,
	patient: state.patient,
});
export default connect(mapStateToProps, {
	addPatient,
	getDoctors,
	getPatients,
	getRdvs,
	addRdv,
	getRdvsd,
})(AppointmetsDoctor);
