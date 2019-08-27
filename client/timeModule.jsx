import React from 'react';
import styled from 'styled-components';

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
{DateSelect}: hover {
  border-bottom: 2px solid #DA3743
}
margin: none;
`;

const TimeTitle = styled.div`
margin: none;
height: 50%;
`;

const TimeModule = (props) => {
  const fakeData = '8-19.5';
  const timeOptions = [];
  const openClose = fakeData.split('-');

  for (let i = Number(openClose[0]); i <= Number(openClose[1]); i += 0.5) {
    let time;
    let amPm = i;
    let timeOption;
    if (i > 12) {
      amPm = i - 12;
    }
    if (i % 1 !== 0) {
      time = `${amPm - 0.5}:30 ${(i > 12 ? 'PM' : 'AM')}`;
    } else {
      time = `${amPm}:00 ${(i > 12 ? 'PM' : 'AM')}`;
    }
    timeOptions.push(<option value={i}>{time}</option>);
  }
  return (
    <TimeDiv>
      <TimeTitle>Time</TimeTitle>
      <TimeSelect>
        {timeOptions}
      </TimeSelect>
    </TimeDiv>
  );
};

export default TimeModule;
