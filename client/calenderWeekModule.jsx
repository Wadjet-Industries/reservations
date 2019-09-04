import React from 'react';
// import styled from 'styled-components';
import CalenderDay from './calenderDayModule.jsx';

const CalenderWeek = ({ month, week, selectDate, openCalender, changeShownDate }) => {
  return (
    <tr>
      {week.map((day, i) => {
        return <CalenderDay key={day + i} month={month} changeShownDate={changeShownDate} openCalender={openCalender} selectDate={selectDate} day={day} />;
      })}
    </tr>
  )
}

export default CalenderWeek;