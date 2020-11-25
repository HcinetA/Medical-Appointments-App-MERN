import React, { Fragment, useState, useEffect } from 'react';
import {
	Form,
	TextArea,
	Button,
	Segment,
	Modal,
	Input,
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPatient, getPatients } from '../../actions/patient';
import { addRdv, getRdvs } from '../../actions/rdv';
import { getDoctors } from '../../actions/doctor';

const ModifRdv = ({
	getDoctors,
	doctor: { doctors, loading },
	getPatients,
	patient: { patients },
	addPatient,
	getRdvs,
	rdv: { rdvs },
	addRdv,
	history,
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
	const [open, setOpen] = React.useState(false);

	const [formData, setFormData] = useState({
		patient: '',
		doctor: '',
		date: '',
		notes: '',
		status: 'false',
	});

	const { patient, doctor, date, notes, status } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		addRdv({ patient, doctor, date, notes, status }, history);
	};

	return (
		<Fragment>
			<h1 className='large text-primary'>New rdv</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create an appointment
			</p>

			<Segment raised>
				<Form onSubmit={(e) => onSubmit(e)}>
					<Form.Group widths='equal'>
						<Form.Field
							label='Select Patient'
							control='select'
							name='patient'
							required
							onChange={(e) => onChange(e)}
						>
							<option></option>
							{patients.map((patient) => (
								<option value={patient._id}>{patient.name}</option>
							))}
						</Form.Field>

						<Form.Field
							label='Select Doctor'
							control='select'
							name='doctor'
							required
							onChange={(e) => onChange(e)}
						>
							<option></option>
							{doctors.map((doctor) => (
								<option value={doctor._id}>DR.{doctor.firstName}</option>
							))}
						</Form.Field>
					</Form.Group>

					<Form.Group widths='equal'>
						<Form.Input
							label=' Select Date & Time'
							type='datetime-local'
							name='date'
							value={date}
							required
							onChange={(e) => onChange(e)}
						/>
					</Form.Group>

					<Form.Field
						id='form-textarea-control-opinion'
						control={TextArea}
						label='Notes'
						name='notes'
						placeholder='Notes'
						value={notes}
						onChange={(e) => onChange(e)}
					/>

					<Button type='submit'>Submit</Button>
				</Form>
			</Segment>
		</Fragment>
	);
};
ModifRdv.propTypes = {
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
})(withRouter(ModifRdv));
