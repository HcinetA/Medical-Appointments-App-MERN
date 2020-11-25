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
	Image,
	Message,
	Loader,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { Link, withRouter } from 'react-router-dom';

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
	history,
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
		paid2: '',
		note_assistante: '',
	});

	const { paid2, note_assistante } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();

		uptPayment(
			payment._id,
			{
				paid: +paid2 + +payment.paid,
				reste: payment.reste - paid2,
				note_assistante,
				patient: payment.patient._id,
				total: payment.total,
			},
			history
		);

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
		<Loader active />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Make Payment</h1>

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
											name='paid2'
											pattern='[0-9]*'
											required
											value={paid2}
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
								<Grid columns={2}>
									<Grid.Row>
										<Grid.Column>
											<Segment padded>
												<Label attached='top'>Acte</Label>
												<Message>
													<p>
														{' '}
														<Header as='h4'> {payment.acte}</Header>
													</p>
												</Message>
											</Segment>
										</Grid.Column>

										<Grid.Column>
											<Segment padded>
												<Label attached='top'>Notes</Label>

												<Message>
													<p>
														<Header as='h4'> {payment.note_assistante}</Header>
													</p>
												</Message>
											</Segment>
										</Grid.Column>
									</Grid.Row>
								</Grid>
								<Grid columns={3}>
									<Grid.Row>
										<Grid.Column>
											<Segment padded>
												<Label attached='top'>Total</Label>
												<Message>
													<p>
														<Header as='h4'> {payment.total} Dt</Header>
													</p>
												</Message>
											</Segment>
										</Grid.Column>

										<Grid.Column>
											<Segment padded>
												<Label attached='top'>Paid</Label>

												<Message>
													<p>
														<Header as='h4'> {payment.paid} Dt</Header>
													</p>
												</Message>
											</Segment>
										</Grid.Column>
										<Grid.Column>
											<Segment padded>
												<Label attached='top'>Reste</Label>

												<Message>
													<p>
														<Header as='h4'> {payment.reste} Dt</Header>
													</p>
												</Message>
											</Segment>
										</Grid.Column>
									</Grid.Row>
								</Grid>
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
})(withRouter(MakePayment));
