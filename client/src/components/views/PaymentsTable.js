import React, { Fragment, useState } from 'react';
import { Table, Button, Menu, Icon, Input, Segment } from 'semantic-ui-react';

const PaymentsTable = () => {
	return (
		<Fragment>
			<h1 className='large text-primary'>Perscriptions</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Liste
			</p>
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
						<Table.HeaderCell>#</Table.HeaderCell>
						<Table.HeaderCell>Code</Table.HeaderCell>
						<Table.HeaderCell>Patient </Table.HeaderCell>
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
						<Table.Cell>John Doe</Table.Cell>
						<Table.Cell>120 DT</Table.Cell>
						<Table.Cell>15/10/2020</Table.Cell>

						<Table.Cell>
							<Button circular icon='x' disabled />
						</Table.Cell>
						<Table.Cell>
							<Button primary>manage</Button>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>1</Table.Cell>
						<Table.Cell>1X58DFS</Table.Cell>
						<Table.Cell>John Doe</Table.Cell>
						<Table.Cell>120 DT</Table.Cell>
						<Table.Cell>15/10/2020</Table.Cell>

						<Table.Cell>
							<Button circular icon='x' disabled />
						</Table.Cell>
						<Table.Cell>
							<Button primary>manage</Button>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>1</Table.Cell>
						<Table.Cell>1X58DFS</Table.Cell>
						<Table.Cell>John Doe</Table.Cell>
						<Table.Cell>120 DT</Table.Cell>
						<Table.Cell>15/10/2020</Table.Cell>

						<Table.Cell>
							<Button circular icon='x' disabled />
						</Table.Cell>
						<Table.Cell>
							<Button primary>manage</Button>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>1</Table.Cell>
						<Table.Cell>1X58DFS</Table.Cell>
						<Table.Cell>John Doe</Table.Cell>
						<Table.Cell>120 DT</Table.Cell>
						<Table.Cell>15/10/2020</Table.Cell>

						<Table.Cell>
							<Button circular icon='check' disabled />
						</Table.Cell>
						<Table.Cell>
							<Button primary>manage</Button>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>1</Table.Cell>
						<Table.Cell>1X58DFS</Table.Cell>
						<Table.Cell>John Doe</Table.Cell>
						<Table.Cell>120 DT</Table.Cell>
						<Table.Cell>15/10/2020</Table.Cell>

						<Table.Cell>
							<Button circular icon='x' disabled />
						</Table.Cell>
						<Table.Cell>
							<Button primary>manage</Button>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>1</Table.Cell>
						<Table.Cell>1X58DFS</Table.Cell>
						<Table.Cell>John Doe</Table.Cell>
						<Table.Cell>120 DT</Table.Cell>
						<Table.Cell>15/10/2020</Table.Cell>

						<Table.Cell>
							<Button circular icon='x' disabled />
						</Table.Cell>
						<Table.Cell>
							<Button primary>manage</Button>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>1</Table.Cell>
						<Table.Cell>1X58DFS</Table.Cell>
						<Table.Cell>John Doe</Table.Cell>
						<Table.Cell>120 DT</Table.Cell>
						<Table.Cell>15/10/2020</Table.Cell>

						<Table.Cell>
							<Button circular icon='check' disabled />
						</Table.Cell>
						<Table.Cell>
							<Button primary>manage</Button>
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>1</Table.Cell>
						<Table.Cell>1X58DFS</Table.Cell>
						<Table.Cell>John Doe</Table.Cell>
						<Table.Cell>120 DT</Table.Cell>
						<Table.Cell>15/10/2020</Table.Cell>

						<Table.Cell>
							<Button circular icon='check' disabled />
						</Table.Cell>
						<Table.Cell>
							<Button primary>manage</Button>
						</Table.Cell>
					</Table.Row>
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

export default PaymentsTable;
