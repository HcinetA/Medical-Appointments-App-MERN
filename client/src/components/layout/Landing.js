import React from 'react';
import {
	Button,
	Form,
	Grid,
	Header,
	Image,
	Message,
	Segment,
} from 'semantic-ui-react';

const LoginForm = () => (
	<Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
		<Grid.Column style={{ maxWidth: 500 }}>
			{' '}
			<Image src='https://i.imgur.com/ZUJQckW.png' size='small' centered />
		</Grid.Column>
	</Grid>
);

export default LoginForm;
