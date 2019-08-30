import React from 'react';
import styled from 'styled-components';
import CalenderDay from './calenderDayModule.jsx';

const CalenderWeek = ({ week, selectDate, openCalender }) => {
  return (
    <tr>
      {week.map((day) => {
        return <CalenderDay openCalender={openCalender} selectDate={selectDate} day={day} />;
      })}
    </tr>
  )
}

export default CalenderWeek;