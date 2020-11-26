import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Menu, Button } from 'semantic-ui-react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
export const Nav = ({ auth: { isAuthenticated, role_secure }, logout }) => {
	const authLinks = (
		<Menu stackable inverted>
			<Link to='/assistantedashboard'>
				<Menu.Item>
					<img alt='' src='https://i.imgur.com/ZUJQckW.png' />
				</Menu.Item>{' '}
			</Link>
			<Menu.Item name='features' link={true}>
				<Link to='/assistantedashboard'>Le Calendrier</Link>
			</Menu.Item>{' '}
			<Menu.Item name='features' link={true}>
				<Link to='/apps'>Les Rdvs</Link>
			</Menu.Item>{' '}
			<Menu.Item name='features' link={true}>
				<Link to='/payments'>Payments</Link>
			</Menu.Item>{' '}
			<Menu.Item name='features' link={true}>
				<Link to='/patients'>Patients</Link>
			</Menu.Item>
			<Menu.Item name='features' link={true} color='green'>
				{' '}
				<Link to='/newrdv'>Nouveau RDV</Link>
			</Menu.Item>
			<Menu.Menu position='right'>
				<Menu.Item>
					<Button onClick={logout} href='#!' color='red'>
						logout
					</Button>
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
	const docLinks = (
		<Menu stackable inverted>
			<Link to='/doctordashboard'>
				<Menu.Item>
					<img alt='' src='https://i.imgur.com/ZUJQckW.png' />
				</Menu.Item>{' '}
			</Link>
			<Menu.Item name='features' link={true}>
				<Link to='/doctordashboard'>Le Calendrier</Link>
			</Menu.Item>{' '}
			<Menu.Item name='features' link={true}>
				<Link to='/consultations'>Les Rdvs</Link>
			</Menu.Item>{' '}
			<Menu.Item name='features' link={true}>
				<Link to='/paymentstd'>Payments</Link>
			</Menu.Item>{' '}
			<Menu.Item name='features' link={true}>
				<Link to='/dpatients'>Patients</Link>
			</Menu.Item>
			<Menu.Menu position='right' link={true}>
				<Menu.Item>
					<Button onClick={logout} href='#!' color='red'>
						logout
					</Button>
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
	const doc2Links = (
		<Menu stackable inverted>
			<Link to='/cdoctordashboard'>
				<Menu.Item>
					<img alt='' src='https://i.imgur.com/ZUJQckW.png' />
				</Menu.Item>{' '}
			</Link>
			<Menu.Item name='features' link={true}>
				<Link to='/cdoctordashboard'>Le Calendrier</Link>
			</Menu.Item>{' '}
			<Menu.Item name='features' link={true}>
				<Link to='/appointments'>Les Rdvs</Link>
			</Menu.Item>{' '}
			<Menu.Item name='features' link={true}>
				<Link to='/paymentstd'>Payments</Link>
			</Menu.Item>{' '}
			<Menu.Item name='features' link={true}>
				<Link to='/dcpatients'>Patients</Link>
			</Menu.Item>
			<Menu.Menu position='right' link={true}>
				<Menu.Item>
					<Button onClick={logout} href='#!' color='red'>
						logout
					</Button>
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
	const guestLinks = (
		<Menu stackable inverted>
			<Link to='/'>
				<Menu.Item>
					<img alt='' src='https://i.imgur.com/ZUJQckW.png' />
				</Menu.Item>{' '}
			</Link>
			<Menu.Menu position='right'>
				<Menu.Item>
					<Link to='login'>
						<Button color='green'>Sign In</Button>
					</Link>
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
	return (
		<Fragment>
			{' '}
			{isAuthenticated && role_secure === 'assistante'
				? authLinks
				: isAuthenticated && role_secure === 'doctor'
				? docLinks
				: isAuthenticated && role_secure === 'doctor2'
				? doc2Links
				: guestLinks}
		</Fragment>
	);
};

Nav.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Nav);
