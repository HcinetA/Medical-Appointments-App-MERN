import React, { Fragment, useState, useEffect } from 'react';
import {
	Form,
	TextArea,
	Button,
	Segment,
	Loader,
	Icon,
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPatient, getPatients } from '../../actions/patient';
import { modifRdv, getRdv } from '../../actions/rdv';
import { getDoctors } from '../../actions/doctor';

const ModifRdv = ({
	getDoctors,
	doctor: { doctors },
	getPatients,
	patient: { patients },

	rdv: { rdv, loading },
	modifRdv,
	getRdv,
	match,
	history,
}) => {
	const [formData, setFormData] = useState({
		patient: '',
		doctor: '',
		date: '',
		notes: '',
		status: 'false',
	});

	useEffect(() => {
		getDoctors();
	}, [getDoctors]);
	useEffect(() => {
		getPatients();
	}, [getPatients]);

	useEffect(() => {
		getRdv(match.params.id);
		setFormData({
			doctor: loading || !rdv.doctor._id ? '' : rdv.doctor._id,
			date: loading || !rdv.date ? '' : rdv.date,
			notes: loading || !rdv.notes ? '' : rdv.notes,
		});
	}, [getRdv, match.params.id, loading, rdv.doctor._id, rdv.date, rdv.notes]);

	const { doctor, date, notes, status } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		modifRdv(rdv._id, { doctor, date, notes, status }, history);
	};

	return loading || rdv === null ? (
		<Loader active />
	) : (
		<Fragment>
			<Link to={'/apps'}>
				<Button icon labelPosition='left'>
					<Icon name='left arrow' />
					Retour à la Liste des Rendez-Vous
				</Button>
			</Link>
			<h1 className='large text-primary'>Mettre à Jour RDV</h1>

			<Segment raised>
				<Form onSubmit={(e) => onSubmit(e)}>
					<Form.Group widths='equal'>
						<Form.Field
							label='Select Doctor'
							control='select'
							name='doctor'
							required
							onChange={(e) => onChange(e)}
						>
							<option></option>
							{doctors.map((doctor) => (
								<option value={doctor._id}>DR.{doctor.firstName}</option>
							))}
						</Form.Field>
					</Form.Group>

					<Form.Group widths='equal'>
						<Form.Input
							label=' Select Date & Time'
							type='datetime-local'
							name='date'
							value={date}
							required
							onChange={(e) => onChange(e)}
						/>
					</Form.Group>

					<Form.Field
						id='form-textarea-control-opinion'
						control={TextArea}
						label='Notes'
						name='notes'
						placeholder='Notes'
						value={notes}
						onChange={(e) => onChange(e)}
					/>

					<Button type='submit'>Submit</Button>
				</Form>
			</Segment>
		</Fragment>
	);
};
ModifRdv.propTypes = {
	addPatient: PropTypes.func.isRequired,
	getDoctors: PropTypes.func.isRequired,
	doctor: PropTypes.object.isRequired,
	getPatients: PropTypes.func.isRequired,
	patient: PropTypes.object.isRequired,
	modifRdv: PropTypes.func.isRequired,
	rdv: PropTypes.object.isRequired,
	getRdv: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	doctor: state.doctor,
	rdv: state.rdv,
	patient: state.patient,
});
export default connect(mapStateToProps, {
	addPatient,
	getDoctors,
	getPatients,
	modifRdv,
	getRdv,
})(withRouter(ModifRdv));
