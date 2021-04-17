import React from 'react';
import { Fragment } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import Nav from './Nav';

const Landing = () => (
  <Fragment>
    <Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 500 }}>
        {' '}
        <Image src='https://i.imgur.com/ZUJQckW.png' size='small' centered />
      </Grid.Column>
    </Grid>
  </Fragment>
);

export default Landing;
