import React, { Fragment, useEffect } from 'react';
import { Table, Button, Menu, Icon, Input, Segment } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPatient, getPatients } from '../../actions/patient';
import { addRdv, getRdvs } from '../../actions/rdv';
import { getDoctors } from '../../actions/doctor';
const Patients = ({
	getDoctors,
	doctor: { doctors },
	getPatients,
	patient: { patients },
	addPatient,
	getRdvs,
	rdv: { rdvs, loading },
	addRdv,
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
	return loading || rdvs === null ? (
		<Fragment>Loading</Fragment>
	) : (
		<Fragment>
			<h1 className='large text-primary'>Perscriptions</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Liste
			</p>
			<Segment basic textAlign='right'>
				<Input
					action={{ color: 'blue', content: 'Search' }}
					icon='search'
					iconPosition='left'
					placeholder='Patient Name'
				/>
			</Segment>
			<Table striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>#</Table.HeaderCell>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<Table.HeaderCell>Phone </Table.HeaderCell>
						<Table.HeaderCell>Age</Table.HeaderCell>
						<Table.HeaderCell>Nex rdv</Table.HeaderCell>
						<Table.HeaderCell>Options</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{patients.map((patient) => (
						<Table.Row>
							<Table.Cell>1</Table.Cell>
							<Table.Cell>{patient.name}</Table.Cell>
							<Table.Cell>{patient.phone}</Table.Cell>
							<Table.Cell>27</Table.Cell>
							<Table.Cell>15/10/2020</Table.Cell>

							<Table.Cell>
								<Link to={`/patient/${patient._id}`}>
									<Button primary> Manage </Button>{' '}
								</Link>{' '}
							</Table.Cell>
						</Table.Row>
					))}{' '}
				</Table.Body>
				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell colSpan='12'>
							<Menu floated='right' pagination>
								<Menu.Item as='a' icon>
									<Icon name='chevron left' />
								</Menu.Item>
								<Menu.Item as='a'>1</Menu.Item>
								<Menu.Item as='a'>2</Menu.Item>
								<Menu.Item as='a'>3</Menu.Item>
								<Menu.Item as='a'>4</Menu.Item>
								<Menu.Item as='a' icon>
									<Icon name='chevron right' />
								</Menu.Item>
							</Menu>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
		</Fragment>
	);
};

Patients.propTypes = {
	addPatient: PropTypes.func.isRequired,
	getDoctors: PropTypes.func.isRequired,
	doctor: PropTypes.object.isRequired,
	getPatients: PropTypes.func.isRequired,
	patient: PropTypes.object.isRequired,
	getRdvs: PropTypes.func.isRequired,
	rdv: PropTypes.object.isRequired,
	addRdv: PropTypes.func.isRequired,
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
})(Patients);
