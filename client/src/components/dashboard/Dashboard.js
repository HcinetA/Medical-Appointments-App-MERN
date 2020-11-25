import React, { Fragment, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Loader } from 'semantic-ui-react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRdvs } from '../../actions/rdv';

const Dashboard = ({ getRdvs, rdv: { rdvs, loading } }) => {
	useEffect(() => {
		getRdvs();
	}, [getRdvs]);
	var events = [];

	if (rdvs) {
		events = rdvs.map((e) => ({
			title: e.patient.name,
			start: e.date,
			//	color: 'e.doctor.color', // override!
			url: `/appointment/${e._id}`,
		}));
	}
	return loading || rdvs === null ? (
		<Loader active />
	) : (
		<FullCalendar
			plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
			headerToolbar={{
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth,timeGridWeek,timeGridDay',
			}}
			initialView='dayGridMonth'
			editable={true}
			nowIndicator={true}
			selectable={true}
			selectMirror={true}
			dayMaxEvents={true}
			toolTip={true}
			events={events}
		/>
	);
};
function renderEventContent(eventInfo) {
	return (
		<>
			<b>{eventInfo.timeText}</b>
			<i>{eventInfo.event.title}</i>
		</>
	);
}
Dashboard.propTypes = {
	getRdvs: PropTypes.func.isRequired,
	rdv: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	rdv: state.rdv,
});
export default connect(mapStateToProps, {
	getRdvs,
})(Dashboard);
