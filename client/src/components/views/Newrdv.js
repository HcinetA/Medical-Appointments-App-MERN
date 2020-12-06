import React, { Fragment, useState, useEffect } from 'react';
import {
	Form,
	TextArea,
	Button,
	Segment,
	Modal,
	Input,
	Icon,
	Loader,
	Dropdown,
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import frLocale from '@fullcalendar/core/locales/fr';

import interactionPlugin from '@fullcalendar/interaction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPatient, getPatients } from '../../actions/patient';
import { addRdv, getRdvs } from '../../actions/rdv';
import { getDoctors } from '../../actions/doctor';

const Newrdv = ({
	addPatient,
	getDoctors,
	doctor: { doctors, loading },
	getPatients,
	patient: { patients },
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

	var events = [];

	if (rdvs && patients !== null) {
		events = rdvs.map((sc) => ({
			title: sc.patient.name,
			date: sc.date,
			color: sc.doctor.color,
		}));
	}
	// eslint-disable-next-line
	var pap = [];

	if (rdvs && patients !== null) {
		pap = patients.map((paps) => ({
			value: paps._id,
			text: paps.name,
		}));
	}

	const [open, setOpen] = React.useState(false);
	const [open2, setOpen2] = React.useState(false);

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
		addRdv({ patient, doctor, date, notes, status }, history);
		console.log(formData);
	};

	const [formData2, setFormData2] = useState({
		name: '',

		date_of_birth: '',

		phone: '',
	});

	const { name, date_of_birth, phone } = formData2;
	const onChange2 = (e2) =>
		setFormData2({ ...formData2, [e2.target.name]: e2.target.value });
	require('age-calculator');
	let { AgeFromDateString } = require('age-calculator');

	const age = new AgeFromDateString(date_of_birth).age;

	const onSubmit2 = (e2) => {
		e2.preventDefault();
		addPatient(formData2, age);
		setOpen(false);
	};

	return loading || rdvs === null || patients === null ? (
		<Loader active />
	) : (
		<Fragment>
			<Link to={'/apps'}>
				<Button icon labelPosition='left'>
					<Icon name='left arrow' />
					Retour à la Liste des Rendez-Vous
				</Button>
			</Link>
			<h1 className='large text-primary'>Nouveau Rendez-vous</h1>

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
								placeholder='phone'
								name='phone'
								required
								value={phone}
								onChange={(e2) => onChange2(e2)}
							/>

							<Form.Input
								label=' Date de naissance'
								type='date'
								name='date_of_birth'
								value={date_of_birth}
								required
								onChange={(e2) => onChange2(e2)}
							/>
							<Form.Field
								control={Input}
								type='hidden'
								name='age'
								required
								value={age}
								onChange={(e2) => onChange2(e2)}
							/>

							<Button type='submit'>Submit</Button>
						</Form>
					</Modal.Content>
				</Modal>
				<Modal
					open={open2}
					onClose={() => setOpen2(false)}
					onOpen={() => setOpen2(true)}
					trigger={
						<Button
							color='teal'
							icon='calendar alternate outline'
							content='Check Calendar'
						/>
					}
				>
					<Modal.Header>Profile Picture</Modal.Header>
					<Modal.Content scrolling size='large'>
						<FullCalendar
							plugins={[
								dayGridPlugin,
								timeGridPlugin,
								interactionPlugin,
								listPlugin,
							]}
							headerToolbar={{
								left: 'prev,next today',
								locale: 'fr',
								themeSystem: 'Lux',
								center: 'title',
								right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
							}}
							initialView='dayGridMonth'
							nowIndicator={true}
							selectable={true}
							dayMaxEvents={true}
							events={events}
							height='720px'
							themeSystem='lux'
							locale={frLocale}
						/>
					</Modal.Content>
					<Modal.Actions>
						<Button onClick={() => setOpen2(false)} primary>
							Proceed <Icon name='chevron right' />
						</Button>
					</Modal.Actions>
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
							<option></option>
							{patients.map((patient) => (
								<option key={patient._id} value={patient._id}>
									{patient.name}
								</option>
							))}
						</Form.Field>

						{/* <Form.Field>
							<Dropdown
								id='patient'
								label='Select Patient'
								control='select'
								name='patient'
								search
								selection
								placeholder='Choose a Patient'
								options={
									(pap = patients.map((paps) => ({
										value: paps._id,
										text: paps.name,
									})))
								}
								onChange={(e) => onChange(e)}
							/>
						</Form.Field> */}

						<Form.Field
							label='Select Doctor'
							control='select'
							name='doctor'
							required
							search
							selection
							onChange={(e) => onChange(e)}
						>
							<option></option>
							{doctors.map((doctor) => (
								<option key={doctor._id} value={doctor._id}>
									DR.{doctor.firstName}
								</option>
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
Newrdv.propTypes = {
	addPatient: PropTypes.func.isRequired,
	getDoctors: PropTypes.func.isRequired,
	doctor: PropTypes.object.isRequired,
	getPatients: PropTypes.func.isRequired,
	patient: PropTypes.object.isRequired,
	addRdv: PropTypes.func.isRequired,
	getRdvs: PropTypes.func.isRequired,
	rdv: PropTypes.object.isRequired,
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
})(withRouter(Newrdv));
