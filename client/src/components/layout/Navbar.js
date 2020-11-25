import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Menu } from 'semantic-ui-react';
import { removeElement } from '@fullcalendar/react';
const Navbar = ({
	auth: { isAuthenticated, loading, user, role_secure },
	logout,
}) => {
	const authLinks = (
		<ul>
			<li>
				<Link to='/apps'>Les Rdvs</Link>
			</li>
			<li>
				<Link to='/payments'>Payments</Link>
			</li>
			<li>
				<Link to='/patients'>Patients</Link>
			</li>
			<li>
				<Link to='/newrdv'>Nouveua rdv</Link>
			</li>
			<li>
				<a onClick={logout} href='#!'>
					<i className='fas fa-sign-out-alt'></i>
					<span className='hide-sm'> Logout</span>
				</a>{' '}
			</li>
		</ul>
	);
	const guestLinks = (
		<ul>
			<li>
				<Link to='register'>Register </Link>
			</li>
		</ul>
	);

	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-tooth'></i> HexaMed
				</Link>
			</h1>

			{!loading && (
				<Fragment>
					{isAuthenticated && role_secure === 'assistante'
						? authLinks
						: guestLinks}
				</Fragment>
			)}
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
