import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
export default class DemoApp extends React.Component {
	render() {
		return (
			<FullCalendar
				defaultView='dayGridMonth'
				header={{
					left: 'prev,next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
				}}
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView='dayGridMonth'
				editable={true}
				selectable={true}
				selectMirror={true}
				dayMaxEvents={true}
				events={[
					{ title: 'event 1', date: '2020-11-25' },
					{ title: 'event 2', date: '2019-04-02' },

					{
						title: 'Meeting',
						start: '2020-11-12T10:30:00',
						end: '2020-11-12T12:30:00',
						color: 'purple', // override!
						url: 'http://google.com/',
					},
					{
						title: 'Lunch',
						start: '2020-11-12T12:00:00',
					},
					{
						title: 'Meeting',
						start: '2020-11-12T14:30:00',
					},
				]}
			/>
		);
	}
}
