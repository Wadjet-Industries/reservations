import styled from 'styled-components';
import React from 'react';
import moment from 'moment';
import CalenderWeek from './calenderWeekModule.jsx';

const CalenderDiv = styled.div`
width: 288px;
height: 302px;
position: absolute;
box-sizing: border-box;
background-color: #f1f2f4;
border: 1px solid #d8d9db;
display: flex;
flex-direction: column;
`;

const CalenderTitleDiv = styled.div`
align-self: center;
box-sizing: border-box;
`;

const CalenderTitle = styled.span``;

const CalenderGrid = styled.table`
box-sizing: border-box;
border-collapse: collapse;
// border: 1px solid #d8d9db;
align-self: center;
justify-content: center;
`;

const NextButton = styled.button`

border-radius: 25%;
// border: 1px solid black;
{NextButton}: hover {
  border: 2px solid #DA3743
};
`;

const BackButton = styled.button`
border-radius: 25%;
// border: 1px solid black;
{BackButton}: hover {
  border: 2px solid #DA3743
};
`;

const CalenderModule = ({ selectDate, month, next, back, openCalender, changeShownDate }) => {
  let calender = [];
  const startDay = moment(month.ISO).clone().startOf('month').startOf('week');
  const endDay = moment(month.ISO).clone().endOf('month').add(1, 'week').endOf('week');
  let date = startDay.clone().subtract(1, 'day');

  while (date.isBefore(endDay, 'day')) {
    calender.push(Array(7).fill(0).map(() => {
      const thisDate = date.add(1, 'day').clone();
      return {
        thisDate: thisDate.format('D'),
        isoDate: thisDate.format(),
      };
    }));
  }
  if (calender.length > 6) {
    calender = calender.slice(0, 6);
  }
  return (
    <CalenderDiv>
      <CalenderTitleDiv>
        <BackButton onClick={back}>Back</BackButton>
        <CalenderTitle>{month.month}</CalenderTitle>
        <NextButton onClick={next}>Next</NextButton>
      </CalenderTitleDiv>
      <CalenderGrid>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
          {calender.map((week) => {
            return <CalenderWeek changeShownDate={changeShownDate} openCalender={openCalender} selectDate={selectDate} week={week} />;
          })}
      </thead>
    </CalenderGrid>
    </CalenderDiv>
  )
}

export default CalenderModule