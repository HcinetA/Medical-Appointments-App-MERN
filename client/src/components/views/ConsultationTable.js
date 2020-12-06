import React, { Fragment, useEffect } from 'react';
import { Table, Button, Segment, Loader } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPatient, getPatients } from '../../actions/patient';
import { addRdv, getRdvs, getRdvsFalse } from '../../actions/rdv';
import { getDoctors } from '../../actions/doctor';
const ConsultationTable = ({
	getDoctors,
	doctor: { doctors },
	getPatients,
	patient: { patients },
	addPatient,
	getRdvs,
	rdv: { rdvs, loading },
	addRdv,
	auth,
	getRdvsFalse,
}) => {
	useEffect(() => {
		getDoctors();
	}, [getDoctors]);
	useEffect(() => {
		getPatients();
	}, [getPatients]);
	useEffect(() => {
		getRdvsFalse();
	}, [getRdvsFalse]);

	return loading || rdvs === null || auth.user === null ? (
		<Loader active />
	) : (
		<Fragment>
			<h1 className='large text-primary'> Liste des rendez-vous</h1>
			<Segment basic textAlign='right'>
				<Link to={`/aptd/${auth.user._id}`}>
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
						<Table.Row key={rdv.id} rdv={rdv}>
							<Table.Cell> </Table.Cell>{' '}
							<Table.Cell>
								{' '}
								<Link to={`/patient/${rdv.patient._id}`}>
									{rdv.patient.name}
								</Link>{' '}
							</Table.Cell>
							<Table.Cell>
								<Moment format='YYYY/MM/DD | hh:mm'>{rdv.date}</Moment>
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
									<Button basic color='teal'>
										{' '}
										Débuter Consultation{' '}
									</Button>{' '}
								</Link>{' '}
								<Link to={`/consultation/${rdv._id}`}>
									<Button basic color='green'>
										{' '}
										Débuter Traitement{' '}
									</Button>{' '}
								</Link>{' '}
							</Table.Cell>{' '}
						</Table.Row>
					))}{' '}
				</Table.Body>{' '}
			</Table>{' '}
		</Fragment>
	);
};

ConsultationTable.propTypes = {
	addPatient: PropTypes.func.isRequired,
	getDoctors: PropTypes.func.isRequired,
	doctor: PropTypes.object.isRequired,
	getPatients: PropTypes.func.isRequired,
	patient: PropTypes.object.isRequired,
	getRdvs: PropTypes.func.isRequired,
	rdv: PropTypes.object.isRequired,
	addRdv: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	getRdvsFalse: PropTypes.func.isRequired,
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
	getRdvsFalse,
})(ConsultationTable);
