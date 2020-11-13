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
} from 'semantic-ui-react';

const PatientAffectation = () => {
	const [formData, setFormData] = useState({
		name: 'Amin',

		doctor: '',

		diagnostic: '',
		notes: '',
		maladie: '',
		allergie: '',
	});
	const { name, doctor, notes, diagnostic, maladie, allergie } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();

		console.log(formData);
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

									<Header as='h5'>Diagnostic</Header>

									<Form.Field
										id='form-textarea-control-opinion'
										control={TextArea}
										name='diagnostic'
										placeholder='Diagnostic'
										value={diagnostic}
										onChange={(e) => onChange(e)}
									/>
									<Header as='h5'>Choose a doctor...</Header>

									<Input
										fluid
										list='doctors'
										multiple
										placeholder='Choose a doctor...'
										name='doctor'
										value={doctor}
										onChange={(e) => onChange(e)}
									/>
									<datalist id='doctors'>
										<option value='Doctor 1'>Doctor 1</option>
										<option value='Doctor 2'>Doctor 2</option>
										<option value='Doctor 3'>Doctor 3</option>
									</datalist>

									<Header as='h5'>Notes</Header>

									<Form.Field
										id='form-textarea-control-opinion'
										control={TextArea}
										name='notes'
										placeholder='Notes'
										value={notes}
										onChange={(e) => onChange(e)}
									/>
									<Button type='submit'>Submit</Button>
								</Form>
							</Segment>
						</Grid.Column>
						<Grid.Column>
							<Segment>
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

export default PatientAffectation;
