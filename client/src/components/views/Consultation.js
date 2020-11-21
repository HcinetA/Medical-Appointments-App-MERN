import React, { Fragment, useState } from 'react';
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

const Consultation = () => {
	const [formData, setFormData] = useState({
		name: 'Amin',
		doctor: 'John Doe',
		acte: '',
		diagnostic: 'Traitement endo',
		notes: '',
		maladie: 'None',
		allergie: 'None',
		cout: '',
	});
	const {
		name,
		notes,
		diagnostic,
		maladie,
		allergie,
		doctor,
		acte,
		cout,
	} = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();

		console.log(formData);
	};

	return (
		<Fragment>
			<Button icon labelPosition='left'>
				<Icon name='left arrow' />
				Back to Appointment list
			</Button>
			<h1 className='large text-primary'>New rdv</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create an appointment
			</p>
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
										readOnly
										value={doctor}
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
										name='notes'
										placeholder='Notes'
										value={notes}
										onChange={(e) => onChange(e)}
									/>
									<Form.Field
										control={Input}
										label='Honoraire'
										placeholder='Honoraire'
										name='cout'
										required
										value={cout}
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
												readOnly
											/>
											<Form.Field
												label='Select City'
												control='select'
												name='city'
												required
												readOnly
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
											readOnly
										/>
										<Header as='h5'>Antécedant Médicaux </Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='antecedent'
											placeholder='Antécedant Médicaux'
											readOnly
										/>

										<Header as='h5'>Habitude</Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='Habitude'
											placeholder='Habitude'
											readOnly
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
										/>

										<Header as='h5'>Diagnostic</Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='diagnostic'
											placeholder='Diagnostic'
											value={diagnostic}
											onChange={(e) => onChange(e)}
											readOnly
										/>
										<Header as='h5'>Analyses</Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='Analyses'
											placeholder='Analyses'
											readOnly
										/>

										<Header as='h5'>Notes</Header>

										<Form.Field
											id='form-textarea-control-opinion'
											control={TextArea}
											name='notes'
											placeholder='Notes'
											value={notes}
											onChange={(e) => onChange(e)}
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

export default Consultation;
