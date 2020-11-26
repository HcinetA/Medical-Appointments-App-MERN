import React from 'react';
import { Input } from 'semantic-ui-react';
import axios from 'axios';
class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			query: '',
			patients: {},
			qloading: false,
			message: '',
		};
		this.cancel = '';
	}

	handleOnInputChange = (event) => {
		const query = event.target.value;
		this.setState({ query, qloading: true, message: '' }, () => {
			this.fetchSearchResults(query);
		});
	};
	render = () => {
		const { query } = this.setState;

		return (
			<Input
				icon='search'
				id='search-input'
				name='query'
				value={query}
				placeholder='Search avec tel'
				onChange={this.handleOnInputChange}
			/>
		);
	};
}

export default Search;
