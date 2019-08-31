import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import CalenderModule from './calenderModule.jsx';

const DateDiv = styled.div`
font-family: Brandon-Text-Regular;
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
display: flex;
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
font-family: Brandon-Text-Light;
`;

// const DropDownIcon = styled.svg`
// width: 8px;
// height: 34px;
// // align-self: flex-end;
// `;

// const DropDownPath = styled.path`
// fill: rgb(51, 51, 51);
// `;

class DateModule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      calender: false,
      shownDate: moment().local().format('ddd, M/D'),
    };

    this.openCalender = this.openCalender.bind(this);
    this.changeShownDate = this.changeShownDate.bind(this);
  }

  openCalender() {
    this.setState((state) => ({ calender: !state.calender }));
  }

  changeShownDate(event) {
    const clickedDate = event.target.getAttribute('value');
    this.setState({
      shownDate: moment(clickedDate).format('ddd, M/D'),
    });
  }

  render() {
    return (
      <DateDiv>
        <DateTitle>Date</DateTitle>
        <DateDisplay>{this.state.shownDate}</DateDisplay>
        {/* <DropDownIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.07 5.24"><DropDownPath d="M4.39 5.09l.71-.71 2.82-2.82a.5.5 0 0 0 0-.71l-.7-.7a.5.5 0 0 0-.71 0L4 2.62 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L3 4.39l.71.71a.5.5 0 0 0 .68-.01z" /></DropDownIcon> */}
        <DateSelect onClick={this.openCalender} />
        {this.state.calender ? <CalenderModule back={this.props.back} next={this.props.next} openCalender={this.openCalender} changeShownDate={this.changeShownDate} selectDate={this.props.selectDate} month={this.props.month} /> : ''}
      </DateDiv>
    );
  }
}

export default DateModule;
