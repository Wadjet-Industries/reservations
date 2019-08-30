import React from 'react';
import styled from 'styled-components';
import CalenderModule from './calenderModule.jsx';
import moment from 'moment';

const DateDiv = styled.div`
width: 50%;
box-sizing: border-box;
margin-right: 2.5%;
`;

const DateSelect = styled.select`
-webkit-appearance: none;
-webkit-border-radius: 0px;
height: 50%;
border: none;
border-bottom: 1px solid rgb(216, 217, 219);
border-right: none;
border-left: none;
background: #ffffff;
width: 100%;
{DateSelect}: hover {
  border-bottom: 2px solid #DA3743
};
margin: none;
outline: none;
`;

const DateTitle = styled.div`
height: 50%;
margin: none;
`;

const DateDisplay = styled.div`
box-sizing: border-box;
width: 82%;
align-items: center;
position: absolute;
pointer-events: none;
font-size: 85%;
margin-left: auto;
margin-right: auto;
`;

class DateModule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      calender: false,
      shownDate: moment().local().format('ddd, M/D'),
    }

    this.openCalender = this.openCalender.bind(this);
    // this.changeShownDate = this.changeShownDate.bind(this);
  }

  openCalender() {
    this.setState((state) => {
      return { calender: !state.calender }
    });
  }

  // changeShownDate(event) {
  //   const clickedDate = event.target.getAttribute('value');
  //   this.setState({
  //     shownDate: moment(clickedDate).format('ddd, M/D'),
  //   })
  // }

  render() {
    return (
      <DateDiv>
        <DateTitle>Date</DateTitle>
        <DateDisplay>{this.state.shownDate}</DateDisplay>
        <DateSelect onClick={this.openCalender}></DateSelect>
        {this.state.calender ? <CalenderModule back={this.props.back} next={this.props.next} openCalender={this.openCalender} selectDate={this.props.selectDate} month={this.props.month} /> : ''}
      </DateDiv>
    )
  }
}

export default DateModule;
