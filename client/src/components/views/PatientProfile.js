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
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPatient, getPatients, getPatient } from '../../actions/patient';
import { addRdv, getRdvs } from '../../actions/rdv';
import { getDoctors } from '../../actions/doctor';

const PatientProfile = ({
	getPatient,
	patient: { patient, loading },
	match,
}) => {
	useEffect(() => {
		getPatient(match.params.id);
	}, [getPatient, match.params.id]);
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
							<Table.Row>
								<Table.Cell>1</Table.Cell>

								<Table.Cell>15/10/2020</Table.Cell>
								<Table.Cell>John Doe</Table.Cell>
								<Table.Cell>
									{' '}
									<Button circular icon='x' disabled />
								</Table.Cell>
								<Table.Cell>
									<Button primary>manage</Button>
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
				</Tab.Pane>
			),
		},
		{
			menuItem: { key: 'History', icon: 'history', content: 'History' },
			render: () => (
				<Tab.Pane>
					<Comment.Group>
						<Comment>
							<Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
							<Comment.Content>
								<Comment.Author as='a'>Amin</Comment.Author>
								<Comment.Metadata>
									<div>15/10/2020</div>
								</Comment.Metadata>
								<Comment.Text>Coiffage</Comment.Text>
							</Comment.Content>
						</Comment>
					</Comment.Group>
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
								<Table.HeaderCell>#</Table.HeaderCell>
								<Table.HeaderCell>Code</Table.HeaderCell>

								<Table.HeaderCell>Amount</Table.HeaderCell>
								<Table.HeaderCell>Date</Table.HeaderCell>
								<Table.HeaderCell>Status</Table.HeaderCell>
								<Table.HeaderCell>Options</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							<Table.Row>
								<Table.Cell>1</Table.Cell>
								<Table.Cell>1X58DFS</Table.Cell>

								<Table.Cell>120 DT</Table.Cell>
								<Table.Cell>15/10/2020</Table.Cell>

								<Table.Cell>
									<Button circular icon='x' disabled />
								</Table.Cell>
								<Table.Cell>
									<Button primary>manage</Button>
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
				</Tab.Pane>
			),
		},
	];

	return loading || patient === null ? (
		<Fragment>Loading</Fragment>
	) : (
		<Fragment>
			<Button icon labelPosition='left'>
				<Icon name='left arrow' />
				Back to patients list
			</Button>
			<h1 className='large text-primary'>Patient Profile</h1>

			<Segment raised>
				<Grid>
					<Grid.Row>
						<Grid.Column width={4}>
							<Card>
								<Image
									src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
									wrapped
									ui={false}
								/>
								<Card.Content>
									<Card.Header>Amin Hcinet</Card.Header>
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

PatientProfile.propTypes = {
	getPatient: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	patient: state.patient,
});
export default connect(mapStateToProps, {
	getPatient,
})(PatientProfile);
