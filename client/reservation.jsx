/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';
import PartySize from './partySize.jsx';

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
`;

class Reservations extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Reservation>
        <Title>Make a reservation</Title>
        <PartySize />
      </Reservation>
    );
  }
}


export default Reservations;
