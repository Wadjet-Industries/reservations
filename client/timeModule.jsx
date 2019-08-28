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
`;

const TimeTitle = styled.div`
margin: none;
height: 50%;
`;

const TimeModule = ({ hours, setReservationTimes }) => {
  const hour = hours;
  const timeOptions = [];
  const openClose = hour.split('--');
  const startHour = moment(openClose[0]);
  const closeHour = moment(openClose[1]);
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
      <TimeSelect onChange={setReservationTimes}>
        {timeOptions}
      </TimeSelect>
    </TimeDiv>
  );
};

export default TimeModule;
