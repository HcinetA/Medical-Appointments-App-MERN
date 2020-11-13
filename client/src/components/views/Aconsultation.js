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

const Aconsultation = () => {
	const [formData, setFormData] = useState({
		name: 'Amin',
		doctor: 'John Doe',
		acte: ' Traitement endo',
		diagnostic: 'Traitement endo',
		notes: '',
		maladie: 'None',
		allergie: 'None',
		cout: '100',
		paid: '',
		date: '',
		time: '',
		reste: '',
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
		paid,
		date,
		time,
		reste,
	} = formData;
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
								<Header as='h3'>Payments</Header>
								<Form onSubmit={(e) => onSubmit(e)}>
									<Form.Group widths='equal'>
										<Form.Field
											control={Input}
											label='Montant Payé'
											placeholder='montant Payé'
											name='paid'
											required
											value={paid}
											onChange={(e) => onChange(e)}
										/>
										<Form.Field
											control={Input}
											label='Reste'
											placeholder='Reste'
											name='reste'
											value={reste}
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
									<Segment>
										<Header as='h3'>Next Rdv</Header>

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
									</Segment>
									<Button type='submit'>Submit</Button>
								</Form>
							</Segment>
						</Grid.Column>

						<Grid.Column>
							<Segment>
								<Header as='h3'>Doctor Notes</Header>
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
									<Header as='h5'>Acte</Header>

									<Form.Field
										id='form-textarea-control-opinion'
										control={TextArea}
										readOnly
										name='acte'
										placeholder='Acte'
										value={acte}
									/>

									<Header as='h5'>Notes </Header>

									<Form.Field
										id='form-textarea-control-opinion'
										control={TextArea}
										readOnly
										name='notes'
										placeholder='Notes'
										value={notes}
										onChange={(e) => onChange(e)}
									/>

									<Header as='h5'>Cout</Header>

									<Form.Field
										control={Input}
										placeholder='Cout'
										name='cout'
										required
										readOnly
										value={cout}
										onChange={(e) => onChange(e)}
									/>
								</Form>
							</Segment>
							<Segment>
								<Header as='h3'>General data</Header>
								<Form>
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

export default Aconsultation;
