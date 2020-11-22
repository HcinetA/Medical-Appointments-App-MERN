import React, { Fragment, useState, useEffect } from 'react';
import {
	Form,
	TextArea,
	Button,
	Segment,
	Modal,
	Input,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPatient, getPatients } from '../../actions/patient';
import { getDoctors } from '../../actions/doctor';
const Newrdv = ({
	getDoctors,
	doctor: { doctors, loading },
	getPatients,
	patient: { patients },
	addPatient,
}) => {
	useEffect(() => {
		getDoctors();
	}, [getDoctors]);
	useEffect(() => {
		getPatients();
	}, [getPatients]);
	const [open, setOpen] = React.useState(false);

	const [formData, setFormData] = useState({
		patient: '',
		doctor: '',
		date: '',
		time: '',
		notes: '',
	});

	const { patient, doctor, date, time, notes } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();
		setOpen(false);
		console.log(formData);
	};

	const [formData2, setFormData2] = useState({
		name: '',

		date_naissance: '',

		tel: '',
	});
	const { name, date_naissance, tel } = formData2;
	const onChange2 = (e2) =>
		setFormData2({ ...formData2, [e2.target.name]: e2.target.value });
	const onSubmit2 = (e2) => {
		e2.preventDefault();
		setOpen(false);
		addPatient({ name, date_naissance, tel });
		console.log(formData2);
	};
	return (
		<Fragment>
			<h1 className='large text-primary'>New rdv</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create an appointment
			</p>
			<Segment basic textAlign='right'>
				<Modal
					onClose={() => setOpen(false)}
					onOpen={() => setOpen(true)}
					open={open}
					trigger={<Button positive icon='plus' content='New Patient' />}
				>
					<Modal.Header>Create Patient</Modal.Header>
					<Modal.Content>
						<Form onSubmit={(e2) => onSubmit2(e2)}>
							<Form.Field
								control={Input}
								label='Patient Name'
								placeholder='Name'
								name='name'
								required
								value={name}
								onChange={(e2) => onChange2(e2)}
							/>
							<Form.Field
								control={Input}
								label='Phone Number'
								placeholder='Tel'
								name='tel'
								required
								value={tel}
								onChange={(e2) => onChange2(e2)}
							/>
							<Form.Input
								label=' Date de naissance'
								type='date'
								name='date_naissance'
								value={date_naissance}
								required
								onChange={(e2) => onChange2(e2)}
							/>
							<Button positive type='submit'>
								Submit{' '}
							</Button>
						</Form>
					</Modal.Content>
				</Modal>
			</Segment>
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
							{doctors.map((doctor) => (
								<option value={doctor._id}>DR.{doctor.firstName}</option>
							))}
						</Form.Field>
					</Form.Group>

					<Form.Group widths='equal'>
						<Form.Input
							label=' Select Date'
							type='date'
							name='date'
							value={date}
							required
							onChange={(e) => onChange(e)}
						/>

						<Form.Input
							label=' Select Time'
							type='time'
							name='time'
							value={time}
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
Newrdv.propTypes = {
	addPatient: PropTypes.func.isRequired,
	getDoctors: PropTypes.func.isRequired,
	doctor: PropTypes.object.isRequired,
	getPatients: PropTypes.func.isRequired,
	patient: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	doctor: state.doctor,
	patient: state.patient,
});
export default connect(mapStateToProps, {
	addPatient,
	getDoctors,
	getPatients,
})(Newrdv);
