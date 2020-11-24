import React, { Fragment, useEffect } from 'react';
import { Table, Button, Menu, Icon, Input, Segment } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPayments } from '../../actions/payment';

const PaymentsTable = ({ getPayments, payment: { payments, loading } }) => {
	useEffect(() => {
		getPayments();
	}, [getPayments]);
	return loading || payments === null ? (
		<Fragment>Loading</Fragment>
	) : (
		<Fragment>
			<h1 className='large text-primary'>Payments</h1>

			<Segment basic textAlign='right'>
				<Input
					action={{ color: 'blue', content: 'Search' }}
					icon='search'
					iconPosition='left'
					placeholder='Patient Name'
				/>
			</Segment>
			<Table striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Patient </Table.HeaderCell>
						<Table.HeaderCell>Amount</Table.HeaderCell>
						<Table.HeaderCell>Payé</Table.HeaderCell>
						<Table.HeaderCell>Reste</Table.HeaderCell>
						<Table.HeaderCell>Date</Table.HeaderCell>
						<Table.HeaderCell>Status</Table.HeaderCell>
						<Table.HeaderCell>Options</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{payments.map((payment) => (
						<Table.Row>
							<Table.Cell>{payment.patient.name}</Table.Cell>
							<Table.Cell>{payment.total} DT</Table.Cell>
							<Table.Cell>{payment.paid} DT</Table.Cell>
							<Table.Cell>{payment.reste} DT</Table.Cell>
							<Table.Cell>
								<Moment format='YYYY/MM/DD'>{payment.updatedAt}</Moment>
							</Table.Cell>

							<Table.Cell>
								<Button circular icon='x' disabled />
							</Table.Cell>
							<Table.Cell>
								<Button primary>manage</Button>
							</Table.Cell>
						</Table.Row>
					))}{' '}
				</Table.Body>
				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell colSpan='12'>
							<Menu floated='right' pagination>
								<Menu.Item as='a' icon>
									<Icon name='chevron left' />
								</Menu.Item>
								<Menu.Item as='a'>1</Menu.Item>
								<Menu.Item as='a'>2</Menu.Item>
								<Menu.Item as='a'>3</Menu.Item>
								<Menu.Item as='a'>4</Menu.Item>
								<Menu.Item as='a' icon>
									<Icon name='chevron right' />
								</Menu.Item>
							</Menu>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
		</Fragment>
	);
};

PaymentsTable.propTypes = {
	getPayments: PropTypes.func.isRequired,
	payment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	payment: state.payment,
});
export default connect(mapStateToProps, {
	getPayments,
})(PaymentsTable);
