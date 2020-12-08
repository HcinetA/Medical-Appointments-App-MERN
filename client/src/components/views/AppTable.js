import React, { Fragment, useEffect } from 'react';
import { Table, Button, Loader } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRdvs, deleteRdv } from '../../actions/rdv';

// const searchData = {
// 	search: '',
// };

const AppTable = ({ getRdvs, rdv: { rdvs }, deleteRdv }) => {
	useEffect(() => {
		getRdvs();
	}, [getRdvs]);

	// const [editing, setEditing] = useState(searchData);

	// function handleSearch(e) {
	// 	let search = e.target.value;
	// 	setEditing({ ...editing, search });
	// }
	return (
		<Fragment>
			<h1 className='large text-primary'> Liste des rendez-vous</h1>
			{/* <Segment basic textAlign='right'>
				<Input
					icon='search'
					id='search-input'
					value={editing.search}
					onChange={handleSearch}
					name='query'
					placeholder='Search avec tel'
				/>
			</Segment> */}
			{rdvs === null ? (
				<Loader />
			) : (
				<Table striped>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell></Table.HeaderCell>

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
										<Table.Cell> </Table.Cell>{' '}
										<Table.Cell>
											{' '}
											<Link to={`/patient/${rdv.patient._id}`}>
												{rdv.patient.name}
											</Link>{' '}
											{rdv.date}
										</Table.Cell>
										<Table.Cell>
											<Moment
												subtract={{ hours: 1 }}
												format='YYYY/MM/DD | HH:mm '
											>
												{rdv.date}
											</Moment>
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
	deleteRdv: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	rdv: state.rdv,
});
export default connect(mapStateToProps, {
	getRdvs,
	deleteRdv,
})(AppTable);
