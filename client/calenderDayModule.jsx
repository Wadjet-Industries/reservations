import React from 'react';
import styled from 'styled-components';

const CalenderTdFuture = styled.td`
border: 1px solid #d8d9db;
border-collapse: collapse;
background-color: #fff;
{CalenderTdFuture}: hover {
  border: 2px solid #DA3743
};
height: 30px;
width: 30px;
box-sizing: border-box;
`;

const CalenderTdPast = styled.td`
border: 1px solid #d8d9db;
border-collapse: collapse;
{CalenderTdPast}: hover {
  border: 2px solid #DA3743
};
`;

const CalenderDay = ({ day, selectDate, openCalender, changeShownDate }) => {
  return (
    <CalenderTdFuture onClick={(event) => { selectDate(event); openCalender(); changeShownDate(event); }} value={day.isoDate}>{day.thisDate}</CalenderTdFuture>
  );
};

export default CalenderDay;
