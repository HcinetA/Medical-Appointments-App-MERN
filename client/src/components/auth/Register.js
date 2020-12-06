import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {
	Form,
	Input,
	Button,
	Segment,
	Tab,
	Label,
	Menu,
} from 'semantic-ui-react';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated, role_secure }) => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		gender: '',
		password: '',
		password2: '',
		role: '',
		color: '',
		specialite: '',
	});
	const {
		firstName,
		lastName,
		gender,
		email,
		password,
		password2,
		role,
		color,
		specialite,
	} = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert('password do not match', 'danger');
		} else {
			register(formData);
		}
	};
	// REDIRECT
	if (isAuthenticated && role_secure === 'doctor2') {
		return <Redirect to='/cdoctordashboard' />;
	} else if (isAuthenticated && role_secure === 'doctor') {
		return <Redirect to='/doctordashboard' />;
	} else if (isAuthenticated && role_secure === '') {
		return <Redirect to='/assistantedashboard' />;
	}
	const panes = [
		{
			menuItem: {
				key: 'doctors',
				icon: 'user doctor',
				content: 'Créer un Compte Médecin',
			},
			render: () => (
				<Tab.Pane>
					<h1 className='large text-primary'>S'inscrire</h1>

					<Segment stacked>
						<Form onSubmit={(e) => onSubmit(e)}>
							<Form.Group widths='equal'>
								<Form.Field
									id='form-input-control-first-name'
									control={Input}
									label='Nom'
									placeholder='Nom'
									name='firstName'
									required
									value={firstName}
									onChange={(e) => onChange(e)}
								/>
								<Form.Field
									id='form-input-control-last-name'
									control={Input}
									required
									label='Prenom'
									placeholder='Prenom'
									name='lastName'
									value={lastName}
									onChange={(e) => onChange(e)}
								/>
							</Form.Group>
							<Form.Group widths='equal'>
								<Form.Field
									label='Genre'
									control='select'
									name='gender'
									value={gender}
									required
									onChange={(e) => onChange(e)}
								>
									<option></option>
									<option value='male'>Male</option>
									<option value='female'>Female</option>
								</Form.Field>

								<Form.Field
									label='Fonction'
									control='select'
									name='role'
									value={role}
									required
									onChange={(e) => onChange(e)}
								>
									<option></option>
									<option value='doctor'> Médecin Dentiste</option>
									<option value='doctor'>Médecin</option>
								</Form.Field>
								<Form.Field
									label='Code Couleur'
									control='select'
									name='color'
									value={color}
									required
									onChange={(e) => onChange(e)}
								>
									<option></option>
									<option value='#18dcff'>Bleu</option>
									<option value='#4b4b4b'>Gris</option>
									<option value='#ff4d4d'>Rouge</option>
									<option value='#fff200'>Jaune</option>
									<option value='#cd84f1'>Violet</option>
								</Form.Field>
							</Form.Group>
							<Form.Field
								control={Input}
								label='Spécialité'
								placeholder='Spécialité'
								name='specialite'
								required
								value={specialite}
								onChange={(e) => onChange(e)}
							/>
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
									label='Mot de Passe'
									type='password'
									name='password'
									value={password}
									required
									onChange={(e) => onChange(e)}
								/>
								<Form.Input
									label='Vérifier Mot de Passe'
									type='password'
									name='password2'
									value={password2}
									required
									onChange={(e) => onChange(e)}
								/>
							</Form.Group>

							<Button type='submit'>Valider</Button>
						</Form>
					</Segment>
				</Tab.Pane>
			),
		},
		{
			menuItem: {
				key: 'assistante',
				icon: 'user ',
				content: 'Créer un Compte Assistant(e)',
			},
			render: () => (
				<Tab.Pane>
					<h1 className='large text-primary'>S'inscrire</h1>

					<Segment stacked>
						<Form onSubmit={(e) => onSubmit(e)}>
							<Form.Group widths='equal'>
								<Form.Field
									id='form-input-control-first-name'
									control={Input}
									label='Nom'
									placeholder='Nom'
									name='firstName'
									required
									value={firstName}
									onChange={(e) => onChange(e)}
								/>
								<Form.Field
									id='form-input-control-last-name'
									control={Input}
									required
									label='Prénom'
									placeholder='Prénom'
									name='lastName'
									value={lastName}
									onChange={(e) => onChange(e)}
								/>
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
									label='Mot de Passe'
									type='password'
									name='password'
									value={password}
									required
									onChange={(e) => onChange(e)}
								/>
								<Form.Input
									label='Vérifier Mot de Passe'
									type='password'
									name='password2'
									value={password2}
									required
									onChange={(e) => onChange(e)}
								/>
							</Form.Group>

							<Button type='submit'>Valider</Button>
						</Form>
					</Segment>
				</Tab.Pane>
			),
		},
	];
	return (
		<Fragment>
			<Tab panes={panes} />
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
