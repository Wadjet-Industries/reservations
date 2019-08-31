/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import PartySize from './partySizeModule.jsx';
import DateModule from './dateModule.jsx';
import TimeModule from './timeModule.jsx';


const Title = styled.div`
width: 100%;
box-sizing: border-box;
color: #000;
font-size: 120%;
align-self: center;
text-align: center;
border-bottom: 1px solid rgb(216, 217, 219);
padding-bottom: 4%;
`;

const TitleModule = styled.div`
width: 90%;
box-sizing: border-box;
display: flex;
align-self: center;
flex-direction: column;
padding: 4%;
margin-right: auto;
margin-left: auto;
`;

const Reservation = styled.div`
font-family: Manjari;
position: fixed;
box-sizing: border-box;
display: flex;
flex-direction: column;
// border: 1px solid black;
width: 320px;
height: 346.12px;
border-radius: 1px;
box-shadow: 0px 2px 8px 0px rgba(153, 153, 153, 0.4);
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

FindTable.displayName = 'FindTable';

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

const ErrorMessage = styled.div``;

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

const SelectReservationTime = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
`;

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
    // this.updateTimeForDays = this.updateTimeForDays.bind(this);
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
    return fetch(`/api/${listing}/reservations`, {
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
        At the moment, there's no online availability within 2.5 hours of
        {' '}
        { moment(this.state.time).format('h:mm A') }
.
        <br />
        Have another time in mind?
      </ErrorMessage>
    );
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
      findReservation.push(errorMessage);
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
      const sorted = diff.map((time) => time).sort();
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
        return (<PossibleTime>{availableTime}</PossibleTime>);
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
