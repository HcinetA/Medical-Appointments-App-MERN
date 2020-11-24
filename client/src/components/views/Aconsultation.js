import React, { Fragment, useState, useEffect } from 'react';
import {
	TextArea,
	Grid,
	Input,
	Segment,
	Form,
	Header,
	Button,
	Comment,
	Label,
	Modal,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

import { addPatient, getPatients, uptPatient } from '../../actions/patient';
import { addRdv, getRdvs, getRdv, uptRdv } from '../../actions/rdv';
import { addPayment } from '../../actions/payment';

import { getDoctors } from '../../actions/doctor';

const Aconsultation = ({
	match,
	getDoctors,
	doctor: { doctors, dloading },
	uptRdv,
	addRdv,
	setAlert,
	uptPatient,
	getRdv,
	rdv: { rdv, loading },
	addPayment,
}) => {
	const [open, setOpen] = React.useState(false);

	useEffect(() => {
		getDoctors();
	}, [getDoctors]);

	useEffect(() => {
		getRdv(match.params.id);
	}, [getRdv, match.params.id]);
	const [formData, setFormData] = useState({
		paid: '',
		note_assistante: '',
	});

	const { paid, note_assistante } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		addPayment({
			paid,
			reste: rdv.honoraire - paid,
			note_assistante,
			patient: rdv.patient._id,
			total: rdv.honoraire,
		});

		console.log(formData);
	};

	const [formData2, setFormData2] = useState({
		doctor: '',

		date: '',

		time: '',

		patient: '',
	});

	const { doctor, date, time, patient } = formData2;
	const onChange2 = (e2) =>
		setFormData2({ ...formData2, [e2.target.name]: e2.target.value });

	const onSubmit2 = (e2) => {
		e2.preventDefault();
		setOpen(false);
		addRdv({ doctor, date, time, patient: rdv.patient._id });
	};
	return loading || rdv === null ? (
		<Fragment>Loading</Fragment>
	) : (
		<Fragment>
			<h1 className='large text-primary'>Payment</h1>
			<Segment basic textAlign='right'>
				<Modal
					onClose={() => setOpen(false)}
					onOpen={() => setOpen(true)}
					open={open}
					trigger={<Button positive icon='plus' content='New Rdv' />}
				>
					<Modal.Header>Next Rdv</Modal.Header>
					<Modal.Content>
						<Form onSubmit={(e2) => onSubmit2(e2)}>
							<Form.Field
								label='Select Doctor'
								control='select'
								name='doctor'
								required
								onChange={(e2) => onChange2(e2)}
							>
								{doctors.map((doctor) => (
									<option value={doctor._id}>DR.{doctor.firstName}</option>
								))}
							</Form.Field>

							<Form.Input
								label=' Select Date'
								type='date'
								name='date'
								value={date}
								required
								onChange={(e2) => onChange2(e2)}
							/>

							<Form.Input
								label=' Select Time'
								type='time'
								name='time'
								value={time}
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
				<Grid columns='equal' stackable>
					<Grid.Row>
						<Grid.Column>
							<Segment>
								{' '}
								<Header as='h3'>Payments</Header>
								<Form onSubmit={(e) => onSubmit(e)}>
									<Form.Group widths='equal'>
										<Form.Field
											control={Input}
											label='Montant Payé'
											placeholder='montant Payé'
											name='paid'
											pattern='[0-9]*'
											required
											value={paid}
											onChange={(e) => onChange(e)}
										/>
									</Form.Group>
									<Form.Field
										id='form-textarea-control-opinion'
										control={TextArea}
										label='Notes Assistante'
										name='note_assistante'
										placeholder='Notes'
										value={note_assistante}
										onChange={(e) => onChange(e)}
									/>

									<Button type='submit'>Submit</Button>
								</Form>
							</Segment>
						</Grid.Column>

						<Grid.Column>
							<Segment>
								<Header as='h3'>Informations</Header>
								<Form>
									<Header as='h5'>Patient Name</Header>
									<Label size='large'>Mr. {rdv.patient.name}</Label>

									<Header as='h5'>Doctor Name</Header>
									<Label size='large'>
										Dr. {rdv.doctor.lastName} {rdv.doctor.firstName}
									</Label>
									<Header as='h5'>Acte</Header>

									<Form.Field
										id='form-textarea-control-opinion'
										control={TextArea}
										readOnly
										placeholder='Acte'
										value={rdv.acte}
									/>

									<Header as='h5'>Notes Docteur </Header>

									<Form.Field
										id='form-textarea-control-opinion'
										control={TextArea}
										readOnly
										placeholder='Notes'
										value={rdv.notes_acte}
									/>
									<Header as='h4'>Honoraire</Header>
									<Label tag size='big'>
										{rdv.honoraire} Dt
									</Label>
								</Form>
							</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		</Fragment>
	);
};

Aconsultation.propTypes = {
	setAlert: PropTypes.func.isRequired,
	getRdv: PropTypes.func.isRequired,
	getDoctors: PropTypes.func.isRequired,
	rdv: PropTypes.object.isRequired,
	doctor: PropTypes.object.isRequired,
	uptRdv: PropTypes.func.isRequired,
	uptPatient: PropTypes.func.isRequired,
	addPayment: PropTypes.func.isRequired,
	addRdv: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	doctor: state.doctor,
	rdv: state.rdv,
	patient: state.patient,
});

export default connect(mapStateToProps, {
	getRdv,
	setAlert,
	uptRdv,
	getDoctors,
	uptPatient,
	addPayment,
	addRdv,
})(Aconsultation);
