import React from 'react';
import styled from 'styled-components';
import CalenderDay from './calenderDayModule.jsx';

const CalenderWeek = ({ week }) => {
  return (
    <tr>
      {week.map((day) => {
        return <CalenderDay day={day} />;
      })}
    </tr>
  )
}

export default CalenderWeek;