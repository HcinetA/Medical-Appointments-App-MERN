import React, { Fragment, useEffect } from 'react';
import { Table, Button, Menu, Icon, Segment, Input } from 'semantic-ui-react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPatient, getPatients } from '../../actions/patient';
import { addRdv, getRdvs } from '../../actions/rdv';
import { getDoctors } from '../../actions/doctor';
const AppointmentTable = ({
    getDoctors,
    doctor: { doctors, loading },
    getPatients,
    patient: { patients },
    addPatient,
    getRdvs,
    rdv: { rdvs },
    addRdv,
}) => {
    useEffect(() => {
        getDoctors();
    }, [getDoctors]);
    useEffect(() => {
        getPatients();
    }, [getPatients]);
    useEffect(() => {
        getRdvs();
    }, [getRdvs]);
    return ( <
        Fragment >
        <
        h1 className = 'large text-primary' > Liste De RDVS < /h1>

        <
        Segment basic textAlign = 'right' >
        <
        Button positive icon = 'filter'
        content = 'My Appointments' / >

        <
        Input action = {
            { color: 'blue', content: 'Search' } }
        icon = 'search'
        iconPosition = 'left'
        placeholder = 'Patient Name' /
        >
        <
        /Segment> <
        Table striped >
        <
        Table.Header >
        <
        Table.Row >
        <
        Table.HeaderCell > # < /Table.HeaderCell> <
        Table.HeaderCell > Name < /Table.HeaderCell> <
        Table.HeaderCell > Date < /Table.HeaderCell> <
        Table.HeaderCell > Doctor < /Table.HeaderCell> <
        Table.HeaderCell > Status < /Table.HeaderCell> <
        Table.HeaderCell > Options < /Table.HeaderCell> <
        /Table.Row> <
        /Table.Header>

        <
        Table.Body > {
            rdvs.map((rdv) => ( <
                Table.Row >
                <
                Table.Cell > 1 < /Table.Cell> <
                Table.Cell > { rdv.patient.name } < /Table.Cell> <
                Table.Cell >
                <
                Moment format = 'YYYY-MM-DD' > { rdv.date } < /Moment> | {rdv.time} <
                /Table.Cell> <
                Table.Cell > DR. { rdv.doctor.firstName } < /Table.Cell> <
                Table.Cell > { ' ' } <
                Button circular icon = 'x'
                disabled / >
                <
                /Table.Cell> <
                Table.Cell >
                <
                Link to = { `/appointment/${rdv._id}` } >
                <
                Button primary > Manage < /Button> <
                /Link> <
                /Table.Cell> <
                /Table.Row>
            ))
        } <
        /Table.Body> <
        Table.Footer >
        <
        Table.Row >
        <
        Table.HeaderCell colSpan = '6' >
        <
        Menu floated = 'right'
        pagination >
        <
        Menu.Item as = 'a'
        icon >
        <
        Icon name = 'chevron left' / >
        <
        /Menu.Item> <
        Menu.Item as = 'a' > 1 < /Menu.Item> <
        Menu.Item as = 'a' > 2 < /Menu.Item> <
        Menu.Item as = 'a' > 3 < /Menu.Item> <
        Menu.Item as = 'a' > 4 < /Menu.Item> <
        Menu.Item as = 'a'
        icon >
        <
        Icon name = 'chevron right' / >
        <
        /Menu.Item> <
        /Menu> <
        /Table.HeaderCell> <
        /Table.Row> <
        /Table.Footer> <
        /Table> <
        /Fragment>
    );
};

AppointmentTable.propTypes = {
    addPatient: PropTypes.func.isRequired,
    getDoctors: PropTypes.func.isRequired,
    doctor: PropTypes.object.isRequired,
    getPatients: PropTypes.func.isRequired,
    patient: PropTypes.object.isRequired,
    getRdvs: PropTypes.func.isRequired,
    rdv: PropTypes.object.isRequired,
    addRdv: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    doctor: state.doctor,
    rdv: state.rdv,
    patient: state.patient,
});
export default connect(mapStateToProps, {
    addPatient,
    getDoctors,
    getPatients,
    getRdvs,
    addRdv,
})(AppointmentTable);