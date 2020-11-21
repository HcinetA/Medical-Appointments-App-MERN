import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox, Segment } from 'semantic-ui-react';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const Register = ({ setAlert }) => {
	const [formData, setFormData] = useState({
		name: '',
		last_name: '',
		email: '',
		gender: '',
		password: '',
		password2: '',
	});
	const { name, last_name, gender, email, password, password2 } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert('password do not match', 'danger');
		} else console.log(formData);
	};
	return (
		<Fragment>
			<h1 className='large text-primary'>Sign Up</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create Your Account
			</p>
			<Segment stacked>
				<Form onSubmit={(e) => onSubmit(e)}>
					<Form.Group widths='equal'>
						<Form.Field
							id='form-input-control-first-name'
							control={Input}
							label='First name'
							placeholder='First name'
							name='name'
							required
							value={name}
							onChange={(e) => onChange(e)}
						/>
						<Form.Field
							id='form-input-control-last-name'
							control={Input}
							required
							label='Last name'
							placeholder='Last name'
							name='last_name'
							value={last_name}
							onChange={(e) => onChange(e)}
						/>
						<Form.Field
							label='Gender'
							control='select'
							name='gender'
							value={gender}
							required
							onChange={(e) => onChange(e)}
						>
							<option value='male'>Male</option>
							<option value='female'>Female</option>
						</Form.Field>
					</Form.Group>
					<Form.Input
						label='Email'
						type='email'
						placeholder='joe@schmoe.com'
						name='email'
						value={email}
						required
						onChange={(e) => onChange(e)}
					/>
					<Form.Group widths='equal'>
						<Form.Input
							label='Enter Password'
							type='password'
							name='password'
							value={password}
							required
							onChange={(e) => onChange(e)}
						/>
						<Form.Input
							label='Enter Password'
							type='password'
							name='password2'
							value={password2}
							required
							onChange={(e) => onChange(e)}
						/>
					</Form.Group>
					<Form.Field>
						<Checkbox label='I agree to the Terms and Conditions' />
					</Form.Field>
					<Button type='submit'>Submit</Button>
					<p className='my-1'>
						Don't have an account? <a href='register.html'>Sign in</a>
					</p>
				</Form>
			</Segment>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
};
export default connect(null, { setAlert })(Register);
