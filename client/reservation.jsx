/* eslint-disable import/extensions */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';
import PartySize from './partySize.jsx';
import DateModule from './dateModule.jsx';
import TimeModule from './timeModule.jsx';

const Title = styled.div`
width: 100%;
border-sizing: border-box;
color: #000;
font-size: 120%;
align-self: center;
text-align: center;
border-bottom: 1px solid #666;
`;

const Reservation = styled.div`
boder-sizing: border-box;
display: flex;
flex-direction: column;
border: 1px solid black;
width: 25%;
height: 300px;
`;

const PartyModule = styled.div`
border-sizing: border-box;
padding-left: 4%;
padding-right: 4%;
align-self: center;
width: 90%;
`;

const DateTime = styled.div`
border-sizing: border-box;
display: flex;
width: 100%;
padding-left: 4%;
padding-right: 4%;
`;

const FindTable = styled.button`
background-color: #DA3743;
color: #fff;
align-self: center;
width: 100%;
height: 100%;
size: 50%;
font-size: 90%;
`;


const FindDiv = styled.div`
display: flex;
flex-direction: column;
box-sizing: border-box;
width: 100%;
padding-left: 4%;
padding-right: 4%;
align-self: center;
height: 15%;
`;

class Reservations extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Reservation>
        <Title>Make a reservation</Title>
        <PartyModule>
          <PartySize />
        </PartyModule>
        <DateTime>
          <DateModule />
          <TimeModule />
        </DateTime>
        <FindDiv>
          <FindTable>Find a Table</FindTable>
        </FindDiv>
      </Reservation>
    );
  }
}


export default Reservations;
