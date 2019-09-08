/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
// import styled, { createGlobalStyle } from 'styled-components';
import moment from 'moment';

import PartySize from './partySizeModule.jsx';
import DateModule from './dateModule.jsx';
import TimeModule from './timeModule.jsx';
import BrandonTextRegular from './fonts/BrandonText-Regular.otf';
import BrandonTextLight from './fonts/BrandonText-Light.otf';
import BrandonTextMedium from './fonts/BrandonText-Medium.otf';
import BrandonTextBold from './fonts/BrandonText-Bold.otf';

const GlobalStyle = styled.createGlobalStyle`
  @font-face {
    font-family: Brandon-Text-Regular;
    src: url('${BrandonTextRegular}') format('opentype');
  }
  @font-face {
    font-family: Brandon-Text-Medium;
    src: url('${BrandonTextMedium}') format('opentype');
  }
  @font-face {
    font-family: Brandon-Text-Bold;
    src: url('${BrandonTextBold}') format('opentype');
  }
  @font-face {
    font-family: Brandon-Text-Light;
    src: url('${BrandonTextLight}') format('opentype');
  }
`;

const Title = styled.div`
font-family: Brandon-Text-Bold;
width: 100%;
box-sizing: border-box;
color: #000;
font-size: 120%;
align-self: center;
text-align: center;
border-bottom: 1px solid rgb(216, 217, 219);
padding-bottom: 4%;
font-weight: 700;
`;

const TitleModule = styled.div`
font-family: Brandon-Text-Light;
width: 90%;
box-sizing: border-box;
display: flex;
align-self: center;
flex-direction: column;
padding: 4%;
margin-right: auto;
margin-left: auto;
MongoNetworkError: failed to connect to server [database:27017] on first connect [MongoNetworkError: getaddrinfo ENOTFOUND database database:27017
`;

const Reservation = styled.div`
z-index: 1000;
position: fixed;
box-sizing: border-box;
display: flex;
flex-direction: column;
width: 320px;
height: 346.12px;
border-radius: 1px;
background-color: #ffffff;
box-shadow: 0px 2px 8px 0px rgba(153, 153, 153, 0.4);
opacity: 1;
right: 10vw;
top: 35vh;
`;

const PartyModule = styled.div`
box-sizing: border-box;
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
box-sizing: border-box;
padding-left: 4%;
padding-right: 4%;
padding-bottom: 4%;
margin-right: auto;
margin-left: auto;
display: flex;
width: 90%;
height: 15%;
margin-top: 2%;
margin-bottom: 2%;
justify-content: space-around;
`;

const FindTable = styled.button`
font: Brandon-Text-Regular;
background-color: #DA3743;
color: #fff;
align-self: center;
width: 100%;
height: 52.66px;
font-size: 90%;
{FindTable}: hover {
  opacity: 0.7;
}
border-radius: 2px;
border: 1px solid #DA3743;
`;

FindTable.displayName = 'FindTable';

const FindButtonDiv = styled.div`
box-sizing: border-box;
width: 100%;
`;

const FindDiv = styled.div`
display: flex;
flex-direction: column;
box-sizing: border-box;
width: 90%;
padding-left: 4%;
padding-right: 4%;
margin-top: 10%;
align-self: center;
height: 33%;
margin-right: auto;
margin-left: auto;
`;

FindDiv.displayName = 'FindDiv';

const BookedDiv = styled.div`
box-sizing: border-box;
width: 100%;
display: flex;
align-self: center;
padding-top: 4%;
margin-right: auto;
margin-left: auto;
`;

const Booked = styled.div`
font-family: Brandon-Text-Medium;
align-self: flex-start;
font-size: 80%;
`;

Booked.displayName = 'Booked';


const TimeText = styled.span`
align-self: center;
`;

const ErrorMessage = styled.div`
width: 100%;
background-color: #F1F2F4;
`;

ErrorMessage.displayName = 'ErrorMessage';

const ErrorMessageText = styled.span`
font-family: Brandon-Text-Regular;
`;

ErrorMessageText.displayName = 'ErrorMessageText';

const PossibleTime = styled.div`
font-family: Brandon-Text-Light;
font-size: 80%;
background-color: #DA3743;
border: 1px solid #Da3743;
box-sizing: border-box;
color: #fff;
border-radius: 2px;
{PossibleTime}: hover {
  opacity: 0.7;
}
width: 30%;
height: 32px;
margin-right: 4px;
margin-bottom: 4px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const SelectReservation = styled.div`
background-color: #fff;
box-sizing: border-box;
display: flex;
justify-content: space-between;
align-items: flex-start;
flex-direction: column;
height: 100%;
width: 100%;
`;

SelectReservation.displayName = 'SelectReservation';

const SelectTitle = styled.div`
font-family: Brandon-Text-Bold;
align-self: flex-start;
width: 100%;
`;

const SelectReservationTime = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
width: 100%;
align-content: space-around;
`;

SelectReservationTime.displayName = 'SelectReservationTime';

const BookedSVG = styled.svg`
width: 24px;
height: 24px;
background-color: rgb(255, 255, 255);
`;

const BookedMask = styled.mask`
fill: #FFF;
`;

const BookedPath = styled.path`
fill: #333333
`;
{ /* <BookedSVG viewBox="0 0 24 24"><polygon points="0 0 24 0 24 24 0 24"></polygon><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="icon/ic_social_proof"><BookedMask></BookedMask><path d="M15.5,5 C15.2239,5 15,5.223846 15,5.5 L15,6.5 C15,6.77615 15.2239,7 15.5,7 L17.5858,7 L14,10.58578 L12.70711,9.29291 L12.35355,8.93933 C12.15829,8.74408 11.84171,8.74408 11.64645,8.93933 L11.29289,9.29291 L5,15.5858 L5,7 L11.5,7 C11.77614,7 12,6.77615 12,6.5 L12,5.5 C12,5.22385 11.77614,5 11.5,5 L5,5 C3.89543,5 3,5.89542 3,7 L3,17 C3,18.1046 3.89543,19 5,19 L19,19 C20.1046,19 21,18.1046 21,17 L21,14.5 C21,14.2238 20.7761,14 20.5,14 L19.5,14 C19.2239,14 19,14.2238 19,14.5 L19,17 L6.4142,17 L12,11.41422 L13.2929,12.70709 L13.6464,13.06067 C13.8417,13.25592 14.1583,13.25592 14.3536,13.06067 L14.7071,12.70709 L19,8.41422 L19,10.5 C19,10.77615 19.2239,11 19.5,11 L20.5,11 C20.7761,11 21,10.77615 21,10.5 L21,6 L21,5.5 C21,5.223846 20.7761,5 20.5,5 L20,5 L15.5,5 Z" fill="#333333" fill-rule="nonzero" mask="url(#mask-2)"></path></g></g></BookedSVG> */ }

class Reservations extends React.Component {
  constructor(props) {
    super(props);

    this.listingData = [];

    this.state = {
      hours: '',
      find: false,
      time: '',
      partyAmount: 1,
      date: '',
      openSeatTimes: [],
      month: { month: '', ISO: '' },
    };

    this.getListingData = this.getListingData.bind(this);
    this.findTime = this.findTime.bind(this);
    this.setReservationTime = this.setReservationTime.bind(this);
    this.findPartySize = this.findPartySize.bind(this);
    this.getDay = this.getDay.bind(this);
    this.findTimeRange = this.findTimeRange.bind(this);
    this.getOpenSeatTimes = this.getOpenSeatTimes.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.backMonth = this.backMonth.bind(this);
  }

  componentDidMount() {
    const loc = window.location.pathname;
    const id = loc.split('/')[1];
    this.getListingData(id)
      .then((data) => {
        this.listingData = data;
      })
      .then(() => {
        const currentDay = moment().local().format().slice(0, 10);
        const currentMonth = moment().local().format('MMMM YYYY');
        const dayTimes = this.listingData.filter((day) => {
          const daysFile = day.Date.slice(0, 10);
          return daysFile === currentDay;
        });
        this.setState({
          date: currentDay,
          month: { month: currentMonth, ISO: moment().local().format() },
          hours: dayTimes[0].Hours,
          time: moment().local().startOf('day').format(),
        });
        this.getDay();
      });
  }

  getListingData(listing = 'L1') {
    return fetch(`http://54.67.39.70:3008/api/${listing}/reservations`, {
      method: 'GET',
    })
      .then((res) => (
        res.json()
      ))
      .then((data) => data)
      .catch((err) => {
        console.log('Error with retrieving data', err);
      });
  }

  getDay() {
    const dayReserves = this.listingData.filter((day) => {
      const daysInFile = day.Date.slice(0, 10);
      return daysInFile === this.state.date;
    });
    this.findTimeRange(dayReserves[0].Seats, this.state.time);
  }

  findTimeRange(day, time) {
    const startReserveMoment = moment(time).subtract(2, 'h').subtract(30, 'm').format();
    const endReserveMoment = moment(time).add(2, 'h').add(30, 'm').format();
    const timeRange = day.filter((times) => {
      const testAfter = moment(times.time).isSameOrAfter(startReserveMoment);
      const testBefore = moment(times.time).isSameOrBefore(endReserveMoment);
      if (testAfter && testBefore) {
        return true;
      }
      return false;
    });
    const openTimes = this.getOpenSeatTimes(timeRange);
    this.setState({
      openSeatTimes: openTimes,
    });
  }

  getOpenSeatTimes(reserveRange) {
    const openSeats = reserveRange.filter((seatTimes) => this.state.partyAmount <= seatTimes.reservations.open);
    return openSeats;
  }

  setReservationTime(event) {
    const newTime = event.target.value;
    this.setState({
      time: newTime,
      find: false,
    });
    this.getDay();
  }

  findPartySize(event) {
    this.setState({
      partyAmount: event.target.value,
      find: false,
    });
    this.getDay();
  }

  findTime(event) {
    this.setState({
      find: true,
    });
    this.getDay();
  }

  selectDate(event) {
    const selectedDate = event.target.getAttribute('value');
    const selectedMonth = moment(selectedDate).format('MMMM YYYY');
    const formattedDate = selectedDate.slice(0, 10);
    const dayTimes = this.listingData.filter((day) => {
      const daysFile = day.Date.slice(0, 10);
      return daysFile === formattedDate;
    });
    if (dayTimes.length === 0) {
      this.setState({
        date: formattedDate,
        month: {
          month: selectedMonth,
          ISO: selectedDate,
        },
        find: false,
      });
    } else {
      this.setState({
        date: formattedDate,
        hours: dayTimes[0].Hours,
        time: dayTimes[0].Hours.split('--')[0],
        month: {
          month: selectedMonth,
          ISO: selectedDate,
        },
        find: false,
      });
      this.findTimeRange(dayTimes[0].Seats, dayTimes[0].Hours.split('--')[0]);
    }
  }

  nextMonth() {
    const nextMonth = moment(this.state.month.ISO).add(1, 'month');
    const nextMonthName = nextMonth.format('MMMM YYYY');
    this.setState({
      month: {
        month: nextMonthName,
        ISO: nextMonth.format(),
      },
    });
  }

  backMonth() {
    const backMonth = moment(this.state.month.ISO).subtract(1, 'month');
    const backMonthName = backMonth.format('MMMM YYYY');
    this.setState({
      month: {
        month: backMonthName,
        ISO: backMonth.format(),
      },
    });
  }


  render() {
    let findReservation = [];
    const errorMessage = (
      <ErrorMessage>
        <ErrorMessageText>
        At the moment, there's no online availability within 2.5 hours of
          {' '}
          { moment(this.state.time).format('h:mm A') }
.
          <br />
        Have another time in mind?
        </ErrorMessageText>
      </ErrorMessage>
    );
    let noSpots = false;
    const open = this.state.hours.split('--')[0];
    const close = this.state.hours.split('--')[1];
    let allAvailableTimes = [];
    this.state.openSeatTimes.forEach((time) => {
      const availableTimeAdd15 = moment(time.time).add(15, 'm').format();
      allAvailableTimes.push(time.time, availableTimeAdd15);
    });
    allAvailableTimes = allAvailableTimes.filter((time) => {
      const compareTime = moment(time);
      if (compareTime.isBefore(close) && compareTime.isSameOrAfter(open)) {
        return (Math.abs(moment(time).diff(moment(this.state.time), 'minutes')) <= 150);
      }
    });
    if (allAvailableTimes.length === 0) {
      noSpots = true;
    } else if (allAvailableTimes.length < 5) {
      findReservation = allAvailableTimes.map((time) => {
        const availableTime = moment(time).format('h:mm A');
        return (<PossibleTime>{availableTime}</PossibleTime>);
      });
    } else if (allAvailableTimes.indexOf(this.state.time) !== -1) {
      const indexTime = allAvailableTimes.indexOf(this.state.time);
      for (let i = indexTime - 2; i <= indexTime + 2; i++) {
        if (i >= 0 && i < allAvailableTimes.length) {
          if (moment(allAvailableTimes[i]).isBefore(close) && moment(allAvailableTimes[i]).isSameOrAfter(open)) {
            const availableTime = moment(allAvailableTimes[i]).format('h:mm A');
            findReservation.push(<PossibleTime>{availableTime}</PossibleTime>);
          }
        }
      }
    } else if (allAvailableTimes.indexOf(this.state.time) === -1) {
      let findTimes = [];
      const filtered = allAvailableTimes.filter((time) => moment(time).isBefore(close) && moment(time).isSameOrAfter(open));
      const diff = filtered.map((time) => {
        const minute = moment(time).diff((moment(this.state.time)), 'minutes');
        return Math.abs(minute);
      });
      const sorted = diff.map((time) => time).sort((timeA, timeB) => timeA - timeB);
      if (filtered.length <= 5) {
        findTimes = filtered;
      } else {
        for (let i = 0; i < 5; i++) {
          const index = diff.indexOf(sorted[i]);
          findTimes.push(filtered[index]);
          diff[index] = true;
        }
        findTimes.sort((timeA, timeB) => {
          if (moment(timeA).isBefore(timeB)) {
            return -1;
          } if (moment(timeA).isAfter(timeB)) {
            return 1;
          } if (moment(timeA).isSame(timeB)) {
            return 0;
          }
        });
      }
      findReservation = findTimes.map((time) => {
        const availableTime = moment(time).format('h:mm A');
        return (<PossibleTime><TimeText>{availableTime}</TimeText></PossibleTime>);
      });
    }

    const selectTime = (
      <SelectReservation>
        <SelectTitle>Select a time:</SelectTitle>
        <SelectReservationTime>
          {findReservation}
        </SelectReservationTime>
      </SelectReservation>
    );

    return (
      <Reservation>
        <GlobalStyle />
        <TitleModule>
          <Title>Make a reservation</Title>
        </TitleModule>
        <PartyModule>
          <PartySize size={this.state.partyAmount} findPartySize={this.findPartySize} />
        </PartyModule>
        <DateTime>
          <DateModule next={this.nextMonth} back={this.backMonth} selectDate={this.selectDate} month={this.state.month} />
          <TimeModule time={this.state.time} setReservationTimes={this.setReservationTime} hours={this.state.hours} />
        </DateTime>
        <FindDiv>
          <FindButtonDiv>
            {this.state.find ? (noSpots ? errorMessage : selectTime) : <FindTable onClick={this.findTime}>Find a Table</FindTable>}
          </FindButtonDiv>
          <BookedDiv>
            <Booked>
            Booked 65 times today
            </Booked>
          </BookedDiv>
        </FindDiv>
      </Reservation>
    );
  }
}


export default Reservations;
