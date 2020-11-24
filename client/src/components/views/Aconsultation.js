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
	setAlert,
	uptPatient,
	getRdv,
	rdv: { rdv, loading },
	addPayment,
}) => {
	useEffect(() => {
		getDoctors();
	}, [getDoctors]);

	useEffect(() => {
		getRdv(match.params.id);
	}, [getRdv, match.params.id]);
	const [formData, setFormData] = useState({
		paid: '',
		note_assistante: '',

		reste: '',
	});

	const { paid, reste, note_assistante } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		addPayment({ paid, reste, note_assistante, patient: rdv.patient._id });

		console.log(formData);
	};

	return loading || rdv === null ? (
		<Fragment>Loading</Fragment>
	) : (
		<Fragment>
			<h1 className='large text-primary'>Payment</h1>

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
										<Form.Field
											control={Input}
											label='Reste'
											placeholder='Reste'
											name='reste'
											readOnly
											value={reste}
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

							<Segment>
								<Header as='h3'>Patient History</Header>
								<Comment.Group>
									<Comment>
										<Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
										<Comment.Content>
											<Comment.Author as='a'>Amin</Comment.Author>
											<Comment.Metadata>
												<div>15/10/2020</div>
											</Comment.Metadata>
											<Comment.Text>Coiffage</Comment.Text>
										</Comment.Content>
									</Comment>
									<Comment>
										<Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
										<Comment.Content>
											<Comment.Author as='a'>Matt</Comment.Author>
											<Comment.Metadata>
												<div>15/10/2020</div>
											</Comment.Metadata>
											<Comment.Text>implant</Comment.Text>
										</Comment.Content>
									</Comment>
									<Comment>
										<Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
										<Comment.Content>
											<Comment.Author as='a'>Matt</Comment.Author>
											<Comment.Metadata>
												<div>15/10/2020</div>
											</Comment.Metadata>
											<Comment.Text>Treatment endo.</Comment.Text>
										</Comment.Content>
									</Comment>
								</Comment.Group>
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
})(Aconsultation);
