import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const TimeDiv = styled.div`
font-family: Brandon-Text-Regular;
width: 50%;
box-sizing: border-box;
padding-left: 2%;
display: flex;
flex-direction: column;
justify-content: flex-start;
margin-top: 5%;
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
margin-bottom: 10%;
`;

TimeTitle.displayName = 'TimeTitle';

const TimeDisplay = styled.div`
box-sizing: border-box;
align-items: center;
align-self: flex-start;
pointer-events: none;
font-size: 85%;
margin: none;
font-family: Brandon-Text-Light;
box-sizing: border-box;
`;

const TimeSelectDiv = styled.div`
position: absolute;
margin: none;
width: 39.365%;
align-self: center;
padding-top: 5px;
`;

const TimeDisplayFinal = styled.div`
width: 100%;
margin: none;
box-sizing: border-box;
margin-top: 5%;
`;

const TimeDisplayWrap = styled.div`
pointer-events: none
display: flex;
flex-direction: row;
position: absolute;
box-sizing: border-box;
margin: none;
justify-content: space-between;
width: 39.365%;
align-self: center;
`;


const DropDownDiv = styled.div`
align-self: flex-end;
height: 100%;
`;

const DropDownIcon = styled.svg`
width: 8px;
padding-bottom: 5px;
`;


const DropDownPath = styled.path`
fill: rgb(51, 51, 51);
`;


const TimeModule = ({ time, hours, setReservationTimes }) => {
  const hour = hours;
  const timeOptions = [];
  const openClose = hour.split('--');
  const startHour = moment(openClose[0]).startOf('day');
  const closeHour = moment(openClose[1]).endOf('day');
  let durate = moment.duration(closeHour.diff(startHour)).as('hours');
  while (durate >= 0) {
    const thisTime = startHour.format('h:mm A');
    timeOptions.push(<option value={startHour.format()}>{thisTime}</option>);
    startHour.add(30, 'm');
    durate = moment.duration(closeHour.diff(startHour)).as('hours');
  }

  return (
    <TimeDiv>
      <TimeTitle>Time</TimeTitle>
      <TimeDisplayFinal>
        <TimeSelectDiv>
          <TimeSelect onChange={setReservationTimes}>
            {timeOptions}
          </TimeSelect>
        </TimeSelectDiv>
        <TimeDisplayWrap>
          <TimeDisplay>{moment(time).format('h:mm A')}</TimeDisplay>
          <DropDownDiv>
            <DropDownIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.07 5.24"><DropDownPath d="M4.39 5.09l.71-.71 2.82-2.82a.5.5 0 0 0 0-.71l-.7-.7a.5.5 0 0 0-.71 0L4 2.62 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L3 4.39l.71.71a.5.5 0 0 0 .68-.01z" /></DropDownIcon>
          </DropDownDiv>
        </TimeDisplayWrap>
      </TimeDisplayFinal>
    </TimeDiv>
  );
};

export default TimeModule;
