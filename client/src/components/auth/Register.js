import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox, Segment } from 'semantic-ui-react';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { Link, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated, role_secure }) => {
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		gender: '',
		password: '',
		password2: '',
		role: '',
		color: '',
	});
	const {
		first_name,
		last_name,
		gender,
		email,
		password,
		password2,
		role,
		color,
	} = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert('password do not match', 'danger');
		} else {
			register({ first_name, last_name, gender, email, password, role, color });
		}
	};
	// REDIRECT
	if (isAuthenticated && role_secure === 'doctor2') {
		return <Redirect to='/cdoctordashboard' />;
	} else if (isAuthenticated && role_secure === 'doctor') {
		return <Redirect to='/doctordashboard' />;
	} else if (isAuthenticated && role_secure === 'assistante') {
		return <Redirect to='/assistantedashboard' />;
	}
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
							name='first_name'
							required
							value={first_name}
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
					</Form.Group>
					<Form.Group widths='equal'>
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

						<Form.Field
							label='Role'
							control='select'
							name='role'
							value={role}
							required
							onChange={(e) => onChange(e)}
						>
							<option value='doctor'>Doctor</option>
							<option value='doctor2'>Doctor consultation</option>
							<option value='assistante'>Assistante</option>
						</Form.Field>
						<Form.Field
							label='Code Couleur'
							control='select'
							name='color'
							value={color}
							required
							onChange={(e) => onChange(e)}
						>
							<option value='#18dcff'>Bleu</option>
							<option value='#4b4b4b'>Gris</option>
							<option value='#ff4d4d'>Rouge</option>
							<option value='#fff200'>Jaune</option>
							<option value='#cd84f1'>Violet</option>
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
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	role_secure: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	role_secure: state.auth.role_secure,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
