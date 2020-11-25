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
	Modal,
	Loader,
	Icon,
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

import { uptPatient } from '../../actions/patient';
import { getRdv, uptRdv2 } from '../../actions/rdv';
import { getDoctors } from '../../actions/doctor';

const PatientAffectation = ({
	match,
	getDoctors,
	doctor: { doctors, dloading },
	uptRdv2,

	uptPatient,
	getRdv,
	rdv: { rdv, loading },
	history,
}) => {
	const [formData2, setFormData2] = useState({
		motif: '',
		diagnostic: '',
		analyses: '',
		notes_consultation: '',
		doctor: '',
	});
	const [open, setOpen] = React.useState(false);

	useEffect(() => {
		getDoctors();
	}, [getDoctors]);

	useEffect(() => {
		getRdv(match.params.id);
		setFormData2({
			motif: loading || !rdv.motif ? '' : rdv.motif,
			diagnostic: loading || !rdv.diagnostic ? '' : rdv.diagnostic,
			analyses: loading || !rdv.analyses ? '' : rdv.analyses,
			doctor: loading || !rdv.doctor._id ? '' : rdv.doctor._id,
			notes_consultation:
				loading || !rdv.notes_consultation ? '' : rdv.notes_consultation,
		});
	}, [
		getRdv,
		match.params.id,
		loading,
		rdv.motif,
		rdv.diagnostic,
		rdv.analyses,
		rdv.doctor._id,
		rdv.notes_consultation,
	]);

	const { motif, diagnostic, analyses, notes_consultation, doctor } = formData2;

	const onChange2 = (e2) =>
		setFormData2({ ...formData2, [e2.target.name]: e2.target.value });
	const [formData, setFormData] = useState({
		maladie: '',
		allergie: '',
		job: '',
		city: '',
		medication: '',
		antecedent: '',
		habitude: '',
	});
	const {
		maladie,
		allergie,
		job,
		city,
		medication,
		antecedent,
		habitude,
	} = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		setOpen(false);

		uptPatient(rdv.patient._id, {
			maladie,
			allergie,
			job,
			city,
			medication,
			antecedent,
			habitude,
		});
	};

	const onSubmit2 = (e2) => {
		e2.preventDefault();

		uptRdv2(
			rdv._id,
			{
				motif,
				diagnostic,
				analyses,
				notes_consultation,
				doctor,
			},
			history
		);
	};

	return loading || rdv === null ? (
		<Loader active />
	) : (
		<Fragment>
			<Link to={'/appointments'}>
				<Button icon labelPosition='left'>
					<Icon name='left arrow' />
					Back to Appointment list
				</Button>
			</Link>
			<h1 className='large text-primary'>Consultation Externe</h1>

			<Segment raised>
				<Grid columns='equal' stackable>
					<Grid.Row>
						<Grid.Column>
							<Segment>
								{' '}
								<Header as='h3'>Consultation</Header>
								<Form onSubmit={(e2) => onSubmit2(e2)}>
									<Segment color='purple'>
										<Header as='h5'>Motif de Consultation</Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='motif'
											placeholder='motif'
											value={motif}
											onChange={(e2) => onChange2(e2)}
										/>

										<Header as='h5'>Diagnostic</Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='diagnostic'
											placeholder='Diagnostic'
											value={diagnostic}
											onChange={(e2) => onChange2(e2)}
										/>
										<Header as='h5'>Analyses</Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='analyses'
											placeholder='Analyses'
											value={analyses}
											onChange={(e2) => onChange2(e2)}
										/>
										<Form.Field
											label='Select Doctor'
											control='select'
											name='doctor'
											required
											onChange={(e2) => onChange2(e2)}
										>
											{doctors.map((doctor) => (
												<option value={doctor._id}>
													DR.{doctor.firstName}
												</option>
											))}
										</Form.Field>
										<Header as='h5'>Notes</Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='notes_consultation'
											placeholder='Notes'
											value={notes_consultation}
											onChange={(e2) => onChange2(e2)}
										/>
									</Segment>

									<Button type='submit'>Submit</Button>
								</Form>
							</Segment>
						</Grid.Column>
						<Grid.Column>
							<Segment color='brown'>
								<Modal
									onClose={() => setOpen(false)}
									onOpen={() => setOpen(true)}
									open={open}
									trigger={
										<Button positive icon='plus' content='Info genral' />
									}
								>
									<Modal.Header>Information Génerale</Modal.Header>
									<Modal.Content>
										<Form onSubmit={(e) => onSubmit(e)}>
											<Segment color='teal'>
												<Form.Group widths='equal'>
													<Form.Field
														control={Input}
														label='Patient Name'
														placeholder='Name'
														name='name'
														required
														readOnly
														value='name'
														onChange={(e) => onChange(e)}
													/>
												</Form.Group>
												<Form.Group widths='equal'>
													<Form.Field
														control={Input}
														label='Travaille'
														placeholder='Travaille'
														name='job'
														required
														value={job}
														onChange={(e) => onChange(e)}
													/>
													<Form.Field
														label='Select City'
														control='select'
														name='city'
														required
														value={city}
														onChange={(e) => onChange(e)}
													>
														<option value='Monastir'>Monastir</option>
														<option value='Sousse'>Sousse</option>
													</Form.Field>
												</Form.Group>
											</Segment>
											<Segment color='blue'>
												<Header as='h5'>Maladie </Header>

												<Form.Field
													id='form-textarea-control-opinion'
													control={TextArea}
													name='maladie'
													placeholder='Maladie'
													value={maladie}
													onChange={(e) => onChange(e)}
												/>
												<Header as='h5'>Allergie</Header>

												<Form.Group widths='equal'>
													<Form.Field
														id='form-textarea-control-opinion'
														control={TextArea}
														name='allergie'
														placeholder='Allergie'
														value={allergie}
														onChange={(e) => onChange(e)}
													/>
												</Form.Group>
												<Header as='h5'>Médication en cours </Header>

												<Form.Field
													id='form-textarea-control-opinion'
													control={TextArea}
													name='medication'
													placeholder='Medication en cours'
													value={medication}
													onChange={(e) => onChange(e)}
												/>
												<Header as='h5'>Antécedant Médicaux </Header>

												<Form.Field
													id='form-textarea-control-opinion'
													control={TextArea}
													name='antecedent'
													placeholder='Antécedant Médicaux'
													value={antecedent}
													onChange={(e) => onChange(e)}
												/>

												<Header as='h5'>Habitude</Header>

												<Form.Field
													id='form-textarea-control-opinion'
													control={TextArea}
													name='habitude'
													placeholder='Habitude'
													value={habitude}
													onChange={(e) => onChange(e)}
												/>
											</Segment>
											<Button positive type='submit'>
												Submit{' '}
											</Button>
										</Form>
									</Modal.Content>
								</Modal>{' '}
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

PatientAffectation.propTypes = {
	setAlert: PropTypes.func.isRequired,

	getDoctors: PropTypes.func.isRequired,
	doctor: PropTypes.object.isRequired,
	uptRdv2: PropTypes.func.isRequired,
	uptPatient: PropTypes.func.isRequired,
	getRdv: PropTypes.func.isRequired,
	rdv: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	doctor: state.doctor,
	rdv: state.rdv,
});

export default connect(mapStateToProps, {
	setAlert,
	uptRdv2,
	getDoctors,
	uptPatient,
	getRdv,
})(withRouter(PatientAffectation));
