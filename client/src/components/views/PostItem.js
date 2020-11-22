import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const PostItem = ({
	doctor: {
		_id,

		name,
	},
	showActions,
}) => {
	return <div>hsdhksdhkshd</div>;
};

PostItem.propTypes = {
	doctor: PropTypes.object.isRequired,
};

export default connect()(PostItem);
