import React, { Fragment, useEffect } from 'react';
import { Table, Button, Segment, Input, Loader } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRdvs } from '../../actions/rdv';

const AppTable = ({ getRdvs, rdv: { rdvs } }) => {
	useEffect(() => {
		getRdvs();
	}, [getRdvs]);

	return (
		<Fragment>
			<h1 className='large text-primary'> Liste des rendez-vous</h1>
			<Segment basic textAlign='right'>
				<Input
					action={{ color: 'blue', content: 'Search' }}
					icon='search'
					iconPosition='left'
					placeholder='Patient Name'
				/>
			</Segment>
			{rdvs === null ? (
				<Loader />
			) : (
				<Table striped>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell> Name </Table.HeaderCell>
							<Table.HeaderCell> Date </Table.HeaderCell>
							<Table.HeaderCell> Doctor </Table.HeaderCell>
							<Table.HeaderCell> Status </Table.HeaderCell>
							<Table.HeaderCell> Options </Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{rdvs === null ? (
							<Loader active />
						) : (
							<Fragment>
								{rdvs.map((rdv) => (
									<Table.Row key={rdv._id}>
										<Table.Cell> {rdv.patient.name} </Table.Cell>
										<Table.Cell>
											<Moment format='YYYY/MM/DD | hh:mm'>{rdv.date}</Moment>
										</Table.Cell>
										<Table.Cell> DR. {rdv.doctor.firstName} </Table.Cell>
										<Table.Cell>
											{rdv.status ? (
												<Button positive circular icon='check' disabled />
											) : (
												<Button negative circular icon='x' disabled />
											)}
										</Table.Cell>
										<Table.Cell>
											<Link to={`/app/${rdv._id}`}>
												<Button basic color='green'>
													Payment
												</Button>
											</Link>
											<Link to={`/modifrdv/${rdv._id}`}>
												<Button basic color='blue'>
													Modifier
												</Button>
											</Link>
										</Table.Cell>
									</Table.Row>
								))}
							</Fragment>
						)}
					</Table.Body>
				</Table>
			)}
		</Fragment>
	);
};

AppTable.propTypes = {
	rdv: PropTypes.object.isRequired,

	getRdvs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	rdv: state.rdv,
});
export default connect(mapStateToProps, {
	getRdvs,
})(AppTable);
