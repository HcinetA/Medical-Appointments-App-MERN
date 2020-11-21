import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
	Button,
	Form,
	Grid,
	Header,
	Message,
	Segment,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
const Login = ({ login, isAuthenticated, role_secure }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const { email, password } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};
	// REDIRECT
	if (isAuthenticated && role_secure === 'doctor2') {
		return <Redirect to='/newrdv' />;
	} else if (isAuthenticated && role_secure === 'doctor') {
		return <Redirect to='/newrdv' />;
	} else if (isAuthenticated && role_secure === 'assistante') {
		return <Redirect to='/newrdv' />;
	}
	return (
		<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' color='teal' textAlign='center'>
					Log-in to your account
				</Header>
				<Form size='large' onSubmit={(e) => onSubmit(e)}>
					<Segment stacked>
						<Form.Input
							fluid
							icon='user'
							iconPosition='left'
							placeholder='E-mail address'
							name='email'
							value={email}
							onChange={(e) => onChange(e)}
						/>
						<Form.Input
							fluid
							icon='lock'
							iconPosition='left'
							placeholder='Password'
							type='password'
							name='password'
							value={password}
							onChange={(e) => onChange(e)}
						/>

						<Button color='teal' fluid size='large'>
							Login
						</Button>
					</Segment>
				</Form>
				<Message>
					New to us? <a href='#'>Sign Up</a>
				</Message>
			</Grid.Column>
		</Grid>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	role_secure: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	role_secure: state.auth.role_secure,
});
export default connect(mapStateToProps, { login })(Login);
