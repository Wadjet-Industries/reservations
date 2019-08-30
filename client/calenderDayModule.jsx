import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const CalenderTdCurrentMonth = styled.td`
border: 1px solid #d8d9db;
border-collapse: collapse;
background-color: #fff;
{CalenderTdFuture}: hover {
  border: 2px solid #DA3743
};
height: 36px;
width: 34px;
box-sizing: border-box;
color: #000;
text-align: center;
`;


const CalenderTdNotCurrentMonth = styled(CalenderTdCurrentMonth)`
background-color: #f1f2f4;
color: #000;
`;

const CalenderTdBeforeDaySameMonth = styled(CalenderTdCurrentMonth)`
pointer-events: none;
color: #d8d9db;
`;

const CalenderTdBeforeDayDiffMonth = styled(CalenderTdNotCurrentMonth) `
pointer-events: none;
color: #d8d9db;
`;

const CalenderDay = ({ month, day, selectDate, openCalender, changeShownDate }) => {

  const currentMonth = <CalenderTdCurrentMonth onClick={(event) => { selectDate(event); openCalender(); changeShownDate(event); }} value={day.isoDate}>{day.thisDate}</CalenderTdCurrentMonth>;
  const notCurrentMonth = <CalenderTdNotCurrentMonth onClick={(event) => { selectDate(event); openCalender(); changeShownDate(event); }} value={day.isoDate}>{day.thisDate}</CalenderTdNotCurrentMonth>;
  const beforeDaySameMonth = <CalenderTdBeforeDaySameMonth onClick={(event) => { selectDate(event); openCalender(); changeShownDate(event); }} value={day.isoDate}>{day.thisDate}</CalenderTdBeforeDaySameMonth>;
  const beforeDayDiffMonth = <CalenderTdBeforeDayDiffMonth onClick={(event) => { selectDate(event); openCalender(); changeShownDate(event); }} value={day.isoDate}>{day.thisDate}</CalenderTdBeforeDayDiffMonth>;

  if (moment(day.isoDate).isBefore(moment().local(), 'day')) {
    return (moment(day.isoDate).isBefore(moment().local(), 'month') ? beforeDayDiffMonth : beforeDaySameMonth);
  }
  return (moment(day.isoDate).isSame(moment(month.ISO), 'month') ? currentMonth : notCurrentMonth);
};

export default CalenderDay;
