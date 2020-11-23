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
	Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

import { addPatient, getPatients, uptPatient } from '../../actions/patient';
import { addRdv, getRdvs, getRdv, uptRdv } from '../../actions/rdv';
import { getDoctors } from '../../actions/doctor';

const initialState = {
	notes_acte: '',
	doctor: '',
	honoraire: '',
	acte: '',
	status: true,
};

const Consultation = ({
	match,
	getDoctors,
	doctor: { doctors, dloading },
	uptRdv,
	setAlert,
	uptPatient,
	getRdv,
	rdv: { rdv, loading },
}) => {
	useEffect(() => {
		getDoctors();
	}, [getDoctors]);

	useEffect(() => {
		if (rdv === null) {
			getRdv(match.params.id);
		}
		if (!loading && rdv === null) {
			const rdvData = { ...initialState };
			setFormData(rdvData);
		} else {
			const rdvData = { ...rdv };
			setFormData(rdvData);
		}
	}, [getRdv, match.params.id, loading]);
	const [formData, setFormData] = useState({
		doctor: '',
		acte: '',

		notes_acte: '',

		honoraire: '',
		status: true,
	});
	const {
		notes_acte,

		doctor,
		acte,
		honoraire,
		status,
	} = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();
		uptRdv(rdv._id, {
			notes_acte,
			acte,

			honoraire,
			doctor,
			status,
		});
		console.log(formData);
	};

	return loading || rdv === null ? (
		<Fragment>Loading</Fragment>
	) : (
		<Fragment>
			<Button icon labelPosition='left'>
				<Icon name='left arrow' />
				Back to Appointment list
			</Button>
			<h1 className='large text-primary'>Consultation</h1>

			<Segment raised>
				<Grid columns='equal' stackable>
					<Grid.Row>
						<Grid.Column>
							<Segment color='red'>
								{' '}
								<Header as='h3'>Consultation</Header>
								<Form onSubmit={(e) => onSubmit(e)}>
									<Form.Field
										control={Input}
										label='Doctor Name'
										placeholder='Doctor'
										name='doctor'
										required
										hidden
										readOnly
										value={rdv.doctor._id}
										onChange={(e) => onChange(e)}
									/>
									<Form.Field
										id='form-textarea-control-opinion'
										control={TextArea}
										label='Acte'
										name='acte'
										placeholder='Acte'
										required
										value={acte}
										onChange={(e) => onChange(e)}
									/>

									<Form.Field
										id='form-textarea-control-opinion'
										control={TextArea}
										label='Notes'
										name='notes_acte'
										placeholder='Notes'
										value={notes_acte}
										onChange={(e) => onChange(e)}
									/>
									<Form.Field
										control={Input}
										label='Honoraire'
										placeholder='Honoraire'
										name='honoraire'
										required
										value={honoraire}
										pattern='[0-9]*'
										onChange={(e) => onChange(e)}
									/>
									<Button type='submit'>Submit</Button>
								</Form>
							</Segment>
						</Grid.Column>

						<Grid.Column>
							<Segment color='yellow'>
								<Header as='h3'>General data</Header>
								<Form>
									<Segment color='teal'>
										<Form.Group widths='equal'>
											<Form.Field
												control={Input}
												label='Patient Name'
												placeholder='Name'
												name='name'
												readOnly
												value={rdv.patient.name}
												onChange={(e) => onChange(e)}
											/>
										</Form.Group>
										<Form.Group widths='equal'>
											<Form.Field
												control={Input}
												label='Travaille'
												placeholder='Travaille'
												name='travaille'
												readOnly
												value={rdv.patient.job}
											/>
											<Form.Field
												control={Input}
												label='Ville'
												placeholder='Ville'
												name='city'
												readOnly
												value={rdv.patient.city}
											/>
										</Form.Group>
									</Segment>
									<Segment color='blue'>
										<Header as='h5'>Maladie </Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											readOnly
											name='maladie'
											placeholder='Maladie'
											value={rdv.patient.maladie}
										/>
										<Header as='h5'>Allergie</Header>

										<Form.Group widths='equal'>
											<Form.Field
												id='form-textarea-control-opinion'
												control={TextArea}
												name='allergie'
												placeholder='Allergie'
												value={rdv.patient.allergie}
											/>
										</Form.Group>
										<Header as='h5'>Médication en cours </Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='medication'
											placeholder='Medication en cours'
											readOnly
											value={rdv.patient.medication}
										/>
										<Header as='h5'>Antécedant Médicaux </Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='antecedent'
											placeholder='Antécedant Médicaux'
											readOnly
											value={rdv.patient.antecedent}
										/>

										<Header as='h5'>Habitude</Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='habitude'
											placeholder='Habitude'
											readOnly
											value={rdv.patient.habitude}
										/>
									</Segment>
									<Segment color='purple'>
										<Header as='h5'>Motif de Consultation</Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='Motif'
											placeholder='Motif de Consultation'
											readOnly
											value={rdv.motif}
										/>

										<Header as='h5'>Diagnostic</Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='diagnostic'
											placeholder='Diagnostic'
											value={rdv.diagnostic}
											readOnly
										/>
										<Header as='h5'>Analyses</Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='analyses'
											placeholder='Analyses'
											value={rdv.analyses}
											readOnly
										/>

										<Header as='h5'>Notes</Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='notes_consultation'
											placeholder='Notes'
											value={rdv.notes_consultation}
											readOnly
										/>
									</Segment>
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

Consultation.propTypes = {
	setAlert: PropTypes.func.isRequired,

	getRdv: PropTypes.func.isRequired,
	getDoctors: PropTypes.func.isRequired,
	rdv: PropTypes.object.isRequired,
	doctor: PropTypes.object.isRequired,
	uptRdv: PropTypes.func.isRequired,
	uptPatient: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	doctor: state.doctor,
	rdv: state.rdv,
});

export default connect(mapStateToProps, {
	getRdv,
	setAlert,
	uptRdv,
	getDoctors,
	uptPatient,
})(Consultation);
