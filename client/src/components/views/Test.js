import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';

import { getDoctors } from '../../actions/doctor';

const Test = ({ getDoctors, doctor: { doctors, loading } }) => {
	useEffect(() => {
		getDoctors();
	}, [getDoctors]);
	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Posts</h1>
			<p className='lead'>
				<i className='fas fa-user'> Bienvenue</i>
			</p>

			<div className='posts'>
				{doctors.map((doctor) => (
					<PostItem key={doctor.id} doctor={doctor} />
				))}
			</div>
		</Fragment>
	);
};

Test.propTypes = {
	getPosts: PropTypes.func.isRequired,
	doctor: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	doctor: state.doctor,
});

export default connect(mapStateToProps, { getDoctors })(Test);
