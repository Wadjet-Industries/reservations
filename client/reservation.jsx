/* eslint-disable import/extensions */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';
import PartySize from './partySize.jsx';
import DateModule from './dateModule.jsx';
import TimeModule from './timeModule.jsx';

const Title = styled.h1`
color: #000;
font-size: 20px;
align-self: center;
`;

const Reservation = styled.div`
display: flex;
flex-direction: column;
border: 1px solid black;
width: 25%;
height: 300px;
`;

const DateTime = styled.div`
display: flex;
`

class Reservations extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Reservation>
        <Title>Make a reservation</Title>
        <PartySize />
        <DateTime>
          <DateModule />
          <TimeModule />
        </DateTime>
      </Reservation>
    );
  }
}


export default Reservations;
