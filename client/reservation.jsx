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
import moment from 'moment';

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
margin-right: auto;
margin-left: auto;
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
margin-right: auto;
margin-left: auto;
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
{FindTable}: hover {
  opacity: 0.7;
}
border-radius: 4%;
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
margin-right: auto;
margin-left: auto;
`;

FindDiv.displayName = 'FindDiv';

const BookedDiv = styled.div`
box-sizing: border-box;
width: 100%;
display: flex;
align-self: center;
padding: 4%;
margin-right: auto;
margin-left: auto;
`;

const Booked = styled.div`
align-self: left;
font-size: 80%;
`;

const PossibleTime = styled.div`
background-color: #DA3743;
border: 1px solid #fff;
color: #fff;
border-radius: 8%;
width: 33%;
display: block;
{PossibleTime}: hover {
  opacity: 0.7;
}
`;

const SelectReservation = styled.div`
background-color: #fff;
box-sizing: border-box;
display: flex;
justify-content: space-evenly;
align-content: space-between;
`;
SelectReservation.displayName = 'SelectReservation';

const SelectTitle = styled.div`
align-self: center;
`;

class Reservations extends React.Component {
  constructor(props) {
    super(props);

    this.listingData = [];

    this.state = {
      hours: '',
      find: false,
      time: '',
      partySize: 0,
    };

    this.getListingData = this.getListingData.bind(this);
    this.findTime = this.findTime.bind(this);
    this.setReservationTime = this.setReservationTime.bind(this);
    this.findPartySize = this.findPartySize.bind(this);
  }

  componentDidMount() {
    const loc = window.location.pathname;
    const id = loc.split('/')[1];
    this.getListingData(id)
      .then((data) => {
        this.listingData = data;
        this.setState({
          hours: data[0].Hours,
          time: data[0].Hours.split('--')[0]
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

  setReservationTime(event) {
    const newTime = event.target.value;
    this.setState({
      time: newTime,
    });
  }

  findPartySize(event) {
    this.setState({
      partySize: event.target.value,
    });
  }

  findTime(event) {
    this.setState({
      find: true,
    });
  }


  render() {
    const findReservation = [];
    const startTimeRange = moment(this.state.time).subtract(30, 'm');
    const endTimeRange = moment(this.state.time).add(30, 'm');
    let durate = moment.duration(endTimeRange.diff(startTimeRange)).as('hours');
    while (durate >= 0) {
      const time = startTimeRange.format('h:mm A');
      findReservation.push(<PossibleTime>{time}</PossibleTime>);
      startTimeRange.add(15, 'm');
      durate = moment.duration(endTimeRange.diff(startTimeRange)).as('hours');
    }

    const selectTime = (
      <SelectReservation>
        <SelectTitle>Select a time:</SelectTitle>
        {findReservation}
      </SelectReservation>
    );

    return (
      <Reservation>
        <TitleModule>
          <Title>Make a reservation</Title>
        </TitleModule>
        <PartyModule>
          <PartySize findPartySize={this.findPartySize} />
        </PartyModule>
        <DateTime>
          <DateModule />
          <TimeModule setReservationTimes={this.setReservationTime} hours={this.state.hours} />
        </DateTime>
        <FindDiv>
          {this.state.find ? selectTime : <FindTable onClick={this.findTime}>Find a Table</FindTable>}
        </FindDiv>
        <BookedDiv>
          <Booked>
            Booked 65 times today
          </Booked>
        </BookedDiv>
      </Reservation>
    );
  }
}


export default Reservations;
