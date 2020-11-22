import React, { Fragment, useState } from 'react';
import {
	Form,
	TextArea,
	Button,
	Segment,
	Header,
	Image,
	Modal,
	Input,
} from 'semantic-ui-react';

const Newrdv = () => {
	const [open, setOpen] = React.useState(false);

	const [formData, setFormData] = useState({
		patient: '',
		doctor: '',
		date: '',
		time: '',
		notes: '',
		name: '',
		tel: '',
	});
	const { patient, doctor, date, time, notes, name, tel } = formData;
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
			<Segment basic textAlign='right'>
				<Modal
					onClose={() => setOpen(false)}
					onOpen={() => setOpen(true)}
					open={open}
					trigger={<Button>Show Modal</Button>}
				>
					<Modal.Header>Create Patient</Modal.Header>
					<Modal.Content>
						<Form onSubmit={(e) => onSubmit(e)}>
							<Form.Field
								control={Input}
								label='Patient Name'
								placeholder='Name'
								name='name'
								required
								value={name}
								onChange={(e) => onChange(e)}
							/>
							<Form.Field
								control={Input}
								label='Phone Number'
								placeholder='Tel'
								name='tel'
								required
								value={tel}
								onChange={(e) => onChange(e)}
							/>
							<Form.Input
								label=' Date de naissance'
								type='date'
								name='date'
								value={date}
								required
								onChange={(e) => onChange(e)}
							/>
							<Button positive type='submit' onClick={() => setOpen(false)}>
								Submit{' '}
							</Button>
						</Form>
					</Modal.Content>
					<Modal.Actions>
						<Button color='black' onClick={() => setOpen(false)}>
							Nope
						</Button>
						<Button
							content="Yep, that's me"
							labelPosition='right'
							icon='checkmark'
							onClick={() => setOpen(false)}
							positive
						/>
					</Modal.Actions>
				</Modal>
				<Button positive icon='plus' content='New Patient' />
			</Segment>
			<Segment raised>
				<Form onSubmit={(e) => onSubmit(e)}>
					<Form.Group widths='equal'>
						<Form.Field
							label='Select Patient'
							control='select'
							name='patient'
							value={patient}
							required
							onChange={(e) => onChange(e)}
						>
							<option value='amin'>Amin</option>
							<option value='john'>john</option>
						</Form.Field>

						<Form.Field
							label='Select Doctor'
							control='select'
							name='doctor'
							value={doctor}
							required
							onChange={(e) => onChange(e)}
						>
							<option value='Doc1'>Doc1</option>
							<option value='doc2'>Doc2</option>
						</Form.Field>
					</Form.Group>

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

export default Newrdv;
