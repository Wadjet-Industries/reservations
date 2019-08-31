import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const TimeDiv = styled.div`
box-sizing: border-box;
width: 50%;
margin-left: 2.5%;
`;

const TimeSelect = styled.select`
-webkit-appearance: none;
-webkit-border-radius: 0px;
height: 50%;
border: none;
border-bottom: 1px solid rgb(216, 217, 219);
border-right: none;
border-left: none;
background: #ffffff;
width: 100%;
{TimeSelect}: hover {
  border-bottom: 2px solid #DA3743
}
margin: none;
outline: none;
color: #fff;
`;

TimeSelect.displayName = 'TimeSelect';

const TimeTitle = styled.div`
margin: none;
height: 50%;
`;

TimeTitle.displayName = 'TimeTitle';

const TimeDisplay = styled.div`
font-family: Josefin Sans;
font-weight: 300;
box-sizing: border-box;
width: 82%;
align-items: center;
position: absolute;
pointer-events: none;
font-size: 85%;
margin-left: auto;
margin-right: auto;
pointer-event: none;
`;

const TimeModule = ({ time, hours, setReservationTimes }) => {
  const hour = hours;
  const timeOptions = [];
  const openClose = hour.split('--');
  const startHour = moment(openClose[0]).startOf('day');
  const closeHour = moment(openClose[1]).endOf('day');
  let durate = moment.duration(closeHour.diff(startHour)).as('hours');
  while (durate >= 0) {
    const time = startHour.format('h:mm A');
    timeOptions.push(<option value={startHour.format()}>{time}</option>);
    startHour.add(30, 'm');
    durate = moment.duration(closeHour.diff(startHour)).as('hours');
  }

  return (
    <TimeDiv>
      <TimeTitle>Time</TimeTitle>
      <TimeDisplay>{moment(time).format('h:mm A')}</TimeDisplay>
      <TimeSelect onChange={setReservationTimes}>
        {timeOptions}
      </TimeSelect>
    </TimeDiv>
  );
};

export default TimeModule;
