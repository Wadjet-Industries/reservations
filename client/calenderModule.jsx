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
border: 1px solid #d8d9db;
align-self: center;
justify-content: center;
`;

const CalenderModule = ({ month }) => {
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

  console.log(calender);
  const a = '<div>hi</div>'
  return (
    <CalenderDiv>
      <CalenderTitleDiv>
        <CalenderTitle>{month.month}</CalenderTitle>
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
            return <CalenderWeek week={week} />;
          })}
      </thead>
    </CalenderGrid>
    </CalenderDiv>
  )
}

export default CalenderModule