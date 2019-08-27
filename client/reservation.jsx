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
border-bottom: 1px solid rgb(216, 217, 219);
padding-bottom: 4%;
`;

const TitleModule = styled.div`
width: 90%;
border-sizing: border-box;
display: flex;
align-self: center;
flex-direction: column;
padding: 4%;
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
padding: 4%;
align-self: center;
width: 90%;
`;

const DateTime = styled.div`
border-sizing: border-box;
padding: 4%;
display: flex;
width: 100%;
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
        <TitleModule>
          <Title>Make a reservation</Title>
        </TitleModule>
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
