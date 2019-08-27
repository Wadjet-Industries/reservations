/* eslint-disable class-methods-use-this */
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
width: 20%;
height: 300px;
`;

const PartyModule = styled.div`
border-sizing: border-box;
padding-right: 4%;
padding-left: 4%;
align-self: center;
width: 90%;
height: 15%;
`;

const DateTime = styled.div`
align-self: center;
border-sizing: border-box;
padding-left: 4%;
padding-right: 4%;
padding-bottom: 4%;
display: flex;
width: 90%;
height: 15%;
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
margin-top: 5%;
align-self: center;
height: 15%;
`;

FindDiv.displayName = 'FindDiv';

const BookedDiv = styled.div`
box-sizing: border-box;
width: 100%;
display: flex;
align-self: center;
padding: 4%;
`;

const Booked = styled.div`
align-self: left;
font-size: 80%;
`;

const PossibleTime = styled.button`
background-color: #DA3743;
border: 1px solid #fff;
color: #fff;
border-radius: 8%;
`;

const SelectReservation = styled.div`
background-color: #fff;
box-sizing: border-box;
display: flex;
`;

class Reservations extends React.Component {
  constructor(props) {
    super(props);

    this.listingData = [];

    this.state = {
      hours: '',
      find: false,
      time: 16,
    };

    this.getListingData = this.getListingData.bind(this);
    this.findTime = this.findTime.bind(this);
  }

  componentDidMount() {
    const loc = window.location.pathname;
    const id = loc.split('/')[1];
    this.getListingData(id)
      .then((data) => {
        this.listingData = data;
        this.setState({
          hours: data[0].Hours,
        });
      });
  }

  getListingData(listing = 'L1') {
    return fetch(`/api/${listing}/reservations`, {
      method: 'GET',
    })
      .then((res) => (
        res.json()
      ))
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log('Error with retrieving data', err);
      });
  }

  findTime(event) {
    // event.preventDefault();
    this.setState({
      find: true,
    });
  }

  render() {
    const findReservation = [];
    for (let i = this.state.time - 0.5; i <= this.state.time + 0.5; i += 0.25) {
      let time;
      let amPm = i;
      let pM = i > 12;
      if (pM) {
        amPm = i - 12;
      }
      const hour = Math.floor(amPm);
      const quarters = hour * 4;
      const timeQuarter = amPm * 4;
      if (timeQuarter - quarters === 1) {
        time = `${hour}:15 ${(pM ? 'PM' : 'AM')}`;
      } else if (timeQuarter - quarters === 2) {
        time = `${hour}:30 ${(pM ? 'PM' : 'AM')}`;
      } else if (timeQuarter - quarters === 3) {
        time = `${hour}:45 ${(pM ? 'PM' : 'AM')}`;
      } else {
        time = `${hour}:00 ${(pM ? 'PM' : 'AM')}`;
      }

      findReservation.push(<PossibleTime>{time}</PossibleTime>);
    }

    const selectTime = <SelectReservation>{findReservation}</SelectReservation>;

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
          <TimeModule hours={this.state.hours} />
        </DateTime>
        <FindDiv>
          {this.state.find ? selectTime : <FindTable onClick={this.findTime}>Find a Table</FindTable>}
        </FindDiv>
        <BookedDiv>
          <Booked>
            Booked 65 times today
          </Booked>
        </BookedDiv>
        {/* {selectTime} */}
      </Reservation>
    );
  }
}


export default Reservations;
