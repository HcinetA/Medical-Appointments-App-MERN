import React, { Fragment, useEffect, useState } from 'react';
import { Table, Button, Input, Segment, Loader, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	addPatient,
	getPatients,
	deletePatient,
	getPatientByPhone,
} from '../../actions/patient';
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
	deletePatient,
	getPatientByPhone,
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
	const [formData, setFormData] = useState({
		phone: '',
	});
	const { phone } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();
		getPatientByPhone(phone);
	};
	return loading || rdvs === null ? (
		<Loader active />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Patients</h1>

			<Segment basic textAlign='right'>
				<Form onSubmit={(e) => onSubmit(e)}>
					<Input
						icon='search'
						iconPosition='left'
						name='phone'
						placeholder='Patient Phone'
						value={phone}
						onChange={(e) => onChange(e)}
					/>
					<Button content='Search' />
				</Form>
			</Segment>
			<Table striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell></Table.HeaderCell>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<Table.HeaderCell>Phone </Table.HeaderCell>
						<Table.HeaderCell>Age</Table.HeaderCell>
						<Table.HeaderCell>City</Table.HeaderCell>
						<Table.HeaderCell>Options</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{patients.map((patient) => (
						<Table.Row>
							<Table.Cell></Table.Cell>
							<Table.Cell>{patient.name}</Table.Cell>
							<Table.Cell>{patient.phone}</Table.Cell>
							<Table.Cell>{patient.age} Ans</Table.Cell>
							<Table.Cell>{patient.city}</Table.Cell>

							<Table.Cell>
								<Link to={`/patient/${patient._id}`}>
									<Button primary> Manage </Button>{' '}
								</Link>{' '}
							</Table.Cell>
						</Table.Row>
					))}{' '}
				</Table.Body>
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
	deletePatient: PropTypes.func.isRequired,
	getPatientByPhone: PropTypes.func.isRequired,
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
	deletePatient,
	getPatientByPhone,
})(Patients);
