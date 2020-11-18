import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-tooth'></i> HexaMed
				</Link>
			</h1>
			<ul>
				<li>
					<Link to='register'>Register Doctor</Link>
				</li>
				<li>
					<Link to='register_assistant'>Register Assistant</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
