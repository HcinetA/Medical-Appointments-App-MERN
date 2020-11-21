import React, { Fragment } from 'react';
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

const panes = [
	{
		menuItem: { key: 'medical_info', icon: 'info', content: 'Medical Info' },
		render: () => (
			<Tab.Pane>
				<Form>
					<Header as='h5'>Age </Header>

					<p>27 Ans</p>
					<Header as='h5'>Maladie </Header>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quam
						arcu, suscipit in viverra vitae, porta a tortor. Interdum et
						malesuada fames ac ante ipsum primis in faucibus. Nullam non urna
						euismod lacus consectetur sagittis. Integer maximus, eros eget
						laoreet fringilla,
					</p>

					<Header as='h5'>Allergie</Header>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quam
						arcu, suscipit in viverra vitae, porta a tortor. Interdum et
						malesuada fames ac ante ipsum primis in faucibus. Nullam non urna
						euismod lacus consectetur sagittis. Integer maximus, eros eget
						laoreet fringilla,
					</p>
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
						</Table.Row>{' '}
						<Table.Row>
							<Table.Cell>1</Table.Cell>

							<Table.Cell>15/10/2020</Table.Cell>
							<Table.Cell>John Doe</Table.Cell>
							<Table.Cell>
								{' '}
								<Button circular icon='check' disabled />
							</Table.Cell>
							<Table.Cell>
								<Button primary>manage</Button>
							</Table.Cell>
						</Table.Row>{' '}
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
					<Comment>
						<Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
						<Comment.Content>
							<Comment.Author as='a'>Matt</Comment.Author>
							<Comment.Metadata>
								<div>15/10/2020</div>
							</Comment.Metadata>
							<Comment.Text>implant</Comment.Text>
						</Comment.Content>
					</Comment>
					<Comment>
						<Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
						<Comment.Content>
							<Comment.Author as='a'>Matt</Comment.Author>
							<Comment.Metadata>
								<div>15/10/2020</div>
							</Comment.Metadata>
							<Comment.Text>Treatment endo.</Comment.Text>
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

const PatientProfile = () => (
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
								<Icon name='phone' />
								94 141 684
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

export default PatientProfile;
