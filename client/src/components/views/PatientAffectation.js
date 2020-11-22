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
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPatient, getPatients } from '../../actions/patient';
import { addRdv, getRdvs, getRdv } from '../../actions/rdv';
import { getDoctors } from '../../actions/doctor';
const PatientAffectation = ({
	getRdv,
	rdv: { rdv },
	match,
	getDoctors,
	doctor: { doctors, loading },
}) => {
	useEffect(() => {
		getDoctors();
	}, [getDoctors]);
	useEffect(() => {
		getRdv(match.params.id);
	}, [getRdv]);
	const [formData, setFormData] = useState({
		name: '',
		notes: '',
		maladie: '',
		allergie: '',
	});
	const { name, notes, maladie, allergie } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const [formData2, setFormData2] = useState({
		motif: '',
		diagnostic: '',
		analyses: '',
		notes_consultation: '',
	});
	const { motif, diagnostic, analyses, notes_consultation } = formData2;

	const onChange2 = (e2) =>
		setFormData2({ ...formData2, [e2.target.name]: e2.target.value });

	const onSubmit = (e) => {
		e.preventDefault();

		console.log(formData);
	};

	const onSubmit2 = (e2) => {
		e2.preventDefault();

		console.log(formData2);
	};

	return (
		<Fragment>
			<h1 className='large text-primary'>New rdv</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create an appointment
			</p>
			<Segment raised>
				<Grid columns='equal' stackable>
					<Grid.Row>
						<Grid.Column>
							<Segment>
								{' '}
								<Header as='h3'>Consultation</Header>
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
												value={name}
												onChange={(e) => onChange(e)}
											/>
										</Form.Group>
										<Form.Group widths='equal'>
											<Form.Field
												control={Input}
												label='Travaille'
												placeholder='Travaille'
												name='travaille'
												required
											/>
											<Form.Field
												label='Select City'
												control='select'
												name='city'
												required
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
										/>
										<Header as='h5'>Antécedant Médicaux </Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='antecedent'
											placeholder='Antécedant Médicaux'
										/>

										<Header as='h5'>Habitude</Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='Habitude'
											placeholder='Habitude'
										/>
									</Segment>
								</Form>
								<Form onSubmit={(e2) => onSubmit2(e2)}>
									<Segment color='purple'>
										<Header as='h5'>Motif de Consultation</Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='motif'
											placeholder='Motif de Consultation'
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
								{' '}
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
	getRdv: PropTypes.func.isRequired,
	getDoctors: PropTypes.func.isRequired,
	rdv: PropTypes.object.isRequired,
	doctor: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	rdv: state.rdv,
	doctor: state.doctor,
});

export default connect(mapStateToProps, { getRdv, getDoctors })(
	PatientAffectation
);
