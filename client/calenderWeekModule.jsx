import React from 'react';
// import styled from 'styled-components';
import CalenderDay from './calenderDayModule.jsx';

const CalenderWeek = ({
  month, week, selectDate, openCalender, changeShownDate,
}) => (
  <tr>
    {week.map((day, i) => <CalenderDay month={month} changeShownDate={changeShownDate} openCalender={openCalender} selectDate={selectDate} day={day} />)}
  </tr>
);

export default CalenderWeek;
