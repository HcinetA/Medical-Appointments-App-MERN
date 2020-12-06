import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Form, Input, Loader, Button } from 'semantic-ui-react';
import { getPatient, uptPatient } from '../../actions/patient';

const UptPatient = ({
	getPatient,
	patient: { patient, loading },
	uptPatient,
	match,
}) => {
	const [formData2, setFormData2] = useState({
		name: '',

		date_of_birth: '',

		phone: '',
	});
	useEffect(() => {
		getPatient(match.params.id);
		var moment = require('moment');
		setFormData2({
			name: patient === null || !patient.name ? '' : patient.name,
			date_of_birth:
				patient === null || !patient.date_of_birth
					? ''
					: moment(patient.date_of_birth).format('YYYY-MM-DD'),

			phone: patient === null || !patient.phone ? '' : patient.phone,
		});
	}, [getPatient, match.params.id, patient === null]);

	const { name, date_of_birth, phone } = formData2;
	const onChange2 = (e2) =>
		setFormData2({ ...formData2, [e2.target.name]: e2.target.value });
	require('age-calculator');
	let { AgeFromDateString } = require('age-calculator');

	const age = new AgeFromDateString(date_of_birth).age;

	const onSubmit2 = (e2) => {
		e2.preventDefault();
		uptPatient(patient._id, formData2);
	};

	return loading || patient === null ? (
		<Loader active />
	) : (
		<Fragment>
			<Segment>
				<Form onSubmit={(e2) => onSubmit2(e2)}>
					<Form.Field
						control={Input}
						label='Patient Name'
						placeholder='Name'
						name='name'
						required
						value={name}
						onChange={(e2) => onChange2(e2)}
					/>
					<Form.Field
						control={Input}
						label='Phone Number'
						placeholder='phone'
						name='phone'
						required
						value={phone}
						onChange={(e2) => onChange2(e2)}
					/>

					<Form.Input
						label=' Date de naissance'
						type='date'
						name='date_of_birth'
						value={date_of_birth}
						required
						onChange={(e2) => onChange2(e2)}
					/>
					<Form.Field
						control={Input}
						type='hidden'
						name='age'
						required
						value={age}
						onChange={(e2) => onChange2(e2)}
					/>

					<Button type='submit'>Submit</Button>
				</Form>
			</Segment>
		</Fragment>
	);
};

UptPatient.propTypes = {
	getPatient: PropTypes.func.isRequired,
	uptPatient: PropTypes.func.isRequired,
	patient: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	patient: state.patient,
});

export default connect(mapStateToProps, { getPatient, uptPatient })(UptPatient);
