import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<section className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1 className='x-large'>HEXAMED</h1>
					<p className='lead'>HEXAMED outils de gestion de cabinet !</p>
					<div className='buttons'>
						<Link to='login' className='btn btn-primary'>
							Login Docteur
						</Link>
						<Link to='login_assistant' className='btn btn-light'>
							Login Assistante
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Landing;
