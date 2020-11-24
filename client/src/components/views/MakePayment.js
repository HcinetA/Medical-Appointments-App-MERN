import React, { Fragment, useState, useEffect } from 'react';
import {
	TextArea,
	Grid,
	Input,
	Segment,
	Form,
	Header,
	Button,
	Comment,
	Label,
	Modal,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

import { addPatient, getPatients, uptPatient } from '../../actions/patient';
import { addRdv, getRdvs, getRdv, uptRdv } from '../../actions/rdv';
import { addPayment, uptPayment, getPayment } from '../../actions/payment';

import { getDoctors } from '../../actions/doctor';

const MakePayment = ({
	match,
	getDoctors,
	doctor: { doctors, dloading },

	addRdv,
	setAlert,
	getRdv,
	rdv: { rdv },
	addPayment,
	getPayment,
	payment: { payment, loading },
	uptPayment,
}) => {
	const [open, setOpen] = React.useState(false);

	useEffect(() => {
		getDoctors();
	}, [getDoctors]);

	useEffect(() => {
		getRdv(match.params.id);
	}, [getRdv, match.params.id]);
	useEffect(() => {
		getPayment(match.params.id);
	}, [getPayment, match.params.id]);
	const [formData, setFormData] = useState({
		paid: '',
		note_assistante: '',
	});

	const { paid, note_assistante } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		addPayment({
			paid,
			reste: rdv.honoraire - paid,
			note_assistante,
			patient: rdv.patient._id,
			total: rdv.honoraire,
		});

		console.log(formData);
	};

	const [formData2, setFormData2] = useState({
		doctor: '',

		date: '',

		time: '',

		patient: '',
	});

	const { doctor, date, time, patient } = formData2;
	const onChange2 = (e2) =>
		setFormData2({ ...formData2, [e2.target.name]: e2.target.value });

	const onSubmit2 = (e2) => {
		e2.preventDefault();
		setOpen(false);
		addRdv({ doctor, date, time, patient: rdv.patient._id });
	};
	return loading || payment === null ? (
		<Fragment>Loading</Fragment>
	) : (
		<Fragment>
			<h1 className='large text-primary'>Payment</h1>

			<Segment raised>
				<Grid columns='equal' stackable>
					<Grid.Row>
						<Grid.Column>
							<Segment>
								{' '}
								<Header as='h3'>Payments</Header>
								<Form onSubmit={(e) => onSubmit(e)}>
									<Form.Group widths='equal'>
										<Form.Field
											control={Input}
											label='Montant Payé'
											placeholder='montant Payé'
											name='paid'
											pattern='[0-9]*'
											required
											value={paid}
											onChange={(e) => onChange(e)}
										/>
									</Form.Group>
									<Form.Field
										id='form-textarea-control-opinion'
										control={TextArea}
										label='Notes Assistante'
										name='note_assistante'
										placeholder='Notes'
										value={note_assistante}
										onChange={(e) => onChange(e)}
									/>

									<Button type='submit'>Submit</Button>
								</Form>
							</Segment>
						</Grid.Column>

						<Grid.Column>
							<Segment>
								<Header as='h4'>Total {payment.total}</Header>
								<Header as='h4'>Paid {payment.paid}</Header>
								<Header as='h4'> Rest {payment.reste}</Header>
								<Header as='h4'>Notes {payment.note_assistante}</Header>
								<Header as='h4'>Acte {payment.note_assistante}</Header>
							</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		</Fragment>
	);
};

MakePayment.propTypes = {
	setAlert: PropTypes.func.isRequired,
	getRdv: PropTypes.func.isRequired,
	getDoctors: PropTypes.func.isRequired,
	rdv: PropTypes.object.isRequired,
	doctor: PropTypes.object.isRequired,
	uptRdv: PropTypes.func.isRequired,
	uptPatient: PropTypes.func.isRequired,
	addPayment: PropTypes.func.isRequired,
	addRdv: PropTypes.func.isRequired,
	getPayment: PropTypes.func.isRequired,
	payment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	doctor: state.doctor,
	rdv: state.rdv,
	patient: state.patient,
	payment: state.payment,
});

export default connect(mapStateToProps, {
	getRdv,
	setAlert,
	uptRdv,
	getDoctors,
	uptPatient,
	addPayment,
	addRdv,
	uptPayment,
	getPayment,
})(MakePayment);
