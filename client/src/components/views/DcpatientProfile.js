import React, { Fragment, useEffect } from 'react';
import {
	Grid,
	Card,
	Icon,
	Image,
	Tab,
	Segment,
	Table,
	Button,
	Comment,
	Header,
	Form,
	Loader,
} from 'semantic-ui-react';
import Moment from 'react-moment';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPatient } from '../../actions/patient';
import { getAptPatient } from '../../actions/rdv';
import { getInvPatient } from '../../actions/payment';

const DcpatientProfile = ({
	getPatient,
	patient: { patient, loading },
	match,
	getAptPatient,

	rdv: { rdvs },
	getInvPatient,
	payment: { payments },
}) => {
	useEffect(() => {
		getPatient(match.params.id);
	}, [getPatient, match.params.id]);
	useEffect(() => {
		getAptPatient(match.params.id);
	}, [getAptPatient, match.params.id]);
	useEffect(() => {
		getInvPatient(match.params.id);
	}, [getInvPatient, match.params.id]);
	const panes = [
		{
			menuItem: { key: 'medical_info', icon: 'info', content: 'Medical Info' },
			render: () => (
				<Tab.Pane>
					<Form>
						<Header as='h5'>Maladie </Header>

						<p>{patient.maladie}</p>

						<Header as='h5'>Allergie</Header>

						<p>{patient.allergie}</p>

						<Header as='h5'>Médication en cours</Header>

						<p>{patient.medication}</p>

						<Header as='h5'>Antécedant Médicaux</Header>

						<p>{patient.antecedent}</p>

						<Header as='h5'>Habitude</Header>

						<p>{patient.habitude}</p>
					</Form>
				</Tab.Pane>
			),
		},
		{
			menuItem: {
				key: 'Appointments',
				icon: 'calendar alternate',
				content: 'Appointments',
			},
			render: () => (
				<Tab.Pane>
					{' '}
					<Table striped>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>#</Table.HeaderCell>

								<Table.HeaderCell>Date </Table.HeaderCell>
								<Table.HeaderCell>Doctor</Table.HeaderCell>
								<Table.HeaderCell>Status</Table.HeaderCell>
								<Table.HeaderCell>Options</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{rdvs.map((rdv) => (
								<Table.Row>
									<Table.Cell>1</Table.Cell>

									<Table.Cell>
										{' '}
										<Moment subtract={{ hours: 1 }} format='YYYY/MM/DD | hh:mm'>
											{rdv.date}
										</Moment>{' '}
									</Table.Cell>
									<Table.Cell>
										Dr. {rdv.doctor.firstName} {rdv.doctor.lastName}
									</Table.Cell>
									<Table.Cell>
										{' '}
										{rdv.status ? (
											<Button positive circular icon='check' disabled />
										) : (
											<Button negative circular icon='x' disabled />
										)}
									</Table.Cell>
									<Table.Cell>
										<Link to={`/appointment/${rdv._id}`}>
											<Button basic color='blue'>
												Manage
											</Button>
										</Link>
									</Table.Cell>
								</Table.Row>
							))}{' '}
						</Table.Body>
					</Table>
				</Tab.Pane>
			),
		},
		{
			menuItem: { key: 'History', icon: 'history', content: 'History' },
			render: () => (
				<Tab.Pane>
					{rdvs.map((rdv) => (
						<Comment.Group>
							<Comment>
								<Comment.Avatar src={rdv.doctor.avatar} />
								<Comment.Content>
									<Comment.Author as='a'>
										{' '}
										Dr. {rdv.doctor.firstName} {rdv.doctor.lastName}
									</Comment.Author>
									<Comment.Metadata>
										<div>
											<Moment format='YYYY/MM/DD'>{rdv.updatedAt}</Moment>
										</div>
									</Comment.Metadata>
									<Comment.Text>{rdv.acte}</Comment.Text>
								</Comment.Content>
							</Comment>
						</Comment.Group>
					))}{' '}
				</Tab.Pane>
			),
		},
		{
			menuItem: { key: 'Payments', icon: 'dollar sign', content: 'Payments' },
			render: () => (
				<Tab.Pane>
					<Table striped>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Acte</Table.HeaderCell>
								<Table.HeaderCell>Amount</Table.HeaderCell>
								<Table.HeaderCell>Payé</Table.HeaderCell>
								<Table.HeaderCell>Reste</Table.HeaderCell>
								<Table.HeaderCell>Date</Table.HeaderCell>

								<Table.HeaderCell>Status</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{payments.map((payment) => (
								<Table.Row>
									<Table.Cell>{payment.acte} </Table.Cell>
									<Table.Cell>{payment.total} DT</Table.Cell>
									<Table.Cell>{payment.paid} DT</Table.Cell>
									<Table.Cell>{payment.reste} DT</Table.Cell>
									<Table.Cell>
										<Moment format='YYYY/MM/DD'>{payment.updatedAt}</Moment>
									</Table.Cell>

									<Table.Cell>
										{' '}
										{payment.reste === 0 ? (
											<Button positive circular icon='check' disabled />
										) : (
											<Button negative circular icon='x' disabled />
										)}
									</Table.Cell>
								</Table.Row>
							))}{' '}
						</Table.Body>
					</Table>
				</Tab.Pane>
			),
		},
	];

	return loading || patient === null ? (
		<Loader active />
	) : (
		<Fragment>
			<Link to={`/dcpatients`}>
				<Button icon labelPosition='left'>
					<Icon name='left arrow' />
					Back to patients list
				</Button>
			</Link>{' '}
			<h1 className='large text-primary'>Patient Profile</h1>
			<Segment raised>
				<Grid>
					<Grid.Row>
						<Grid.Column width={4}>
							<Card>
								<Image
									src='//www.gravatar.com/avatar/2636396c063b17c79ae89095730fc50d?s=200&r=pg&d=mm'
									wrapped
									ui={false}
								/>
								<Card.Content>
									<Card.Header>{patient.name}</Card.Header>
								</Card.Content>
								<Card.Content extra>
									<Header as='h5'>Phone </Header>
									{patient.phone}
									<Header as='h5'>Age </Header>
									<p>27 Ans</p>
									<Header as='h5'>Travaille </Header>
									<p>{patient.job}</p>
									<Header as='h5'>Ville </Header>
									<p>{patient.city}</p>
								</Card.Content>
							</Card>
						</Grid.Column>
						<Grid.Column width={12}>
							<Tab panes={panes} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		</Fragment>
	);
};

DcpatientProfile.propTypes = {
	getPatient: PropTypes.func.isRequired,
	getAptPatient: PropTypes.func.isRequired,
	getInvPatient: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	patient: state.patient,
	rdv: state.rdv,
	payment: state.payment,
});
export default connect(mapStateToProps, {
	getPatient,
	getAptPatient,
	getInvPatient,
})(DcpatientProfile);
