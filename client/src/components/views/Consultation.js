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
							<Segment>
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
							<Segment>
								<Header as='h3'>General data</Header>
								<Form>
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

									<Header as='h5'>Maladie </Header>

									<Form.Field
										id='form-textarea-control-opinion'
										control={TextArea}
										readOnly
										name='maladie'
										placeholder='Maladie'
										value={maladie}
										onChange={(e) => onChange(e)}
									/>

									<Header as='h5'>Allergie</Header>

									<Form.Field
										id='form-textarea-control-opinion'
										control={TextArea}
										readOnly
										name='allergie'
										placeholder='Allergie'
										value={allergie}
										onChange={(e) => onChange(e)}
									/>
									<Header as='h5'>Diagnostic</Header>

									<Form.Field
										id='form-textarea-control-opinion'
										control={TextArea}
										readOnly
										name='diagnostic'
										placeholder='Diagnostic'
										value={diagnostic}
									/>
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
