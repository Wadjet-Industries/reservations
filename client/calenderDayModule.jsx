import React from 'react';
import styled from 'styled-components';

const CalenderTdFuture = styled.td`
`;

const CalenderTdPast = styled.td``;

const CalenderDay = ({ day }) => {
  return (
    <CalenderTdFuture value={day.isoDate}>{day.thisDate}</CalenderTdFuture>
  );
};

export default CalenderDay;
