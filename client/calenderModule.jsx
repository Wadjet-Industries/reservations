// import styled from 'styled-components';
import React from 'react';
import moment from 'moment';
import CalenderWeek from './calenderWeekModule.jsx';

const CalenderContainer = styled.div`
font-family: Brandon-Text-Medium;
width: 288px;
height: 302px;
position: absolute;
box-sizing: border-box;
display: flex;
flex-direction: column;
align-items: center;
background-color: #f1f2f4;
border: 1px solid #d8d9db;
justify-content: space-around;
`;


const CalenderDiv = styled.div`
width: 256px;
height: 271px;
position: absolute;
box-sizing: border-box;
display: flex;
flex-direction: column;
align-items: center;
align-self: center;
`;

const CalenderTitleDiv = styled.div`
align-self: center;
box-sizing: border-box;
height: 32px;
box-sizing: border-box;
display: flex;
width: 100%;
justify-content: space-between;
`;

const CalenderTitle = styled.span`
align-self: center;
justify-content: center;
box-sizing: border-box;
text-align: center;
font-weight: 700;
`;

const CalenderGrid = styled.table`
box-sizing: border-box;
border-collapse: collapse;
position: relative;
width: 100%;
`;

CalenderGrid.displayName = 'CalenderGrid';

const NextButton = styled.span`
border-radius: 50%;
align-self: flex-end;
{NextButton}: hover {
  border: 2px solid #DA3743
};
background-size: 6px 8px;
background-position: center;
background-repeat: no-repeat;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5.24 8.07'%3E%3Cg%3E%3Cpath style='fill:%23333' d='M5.09 3.68L4.39 3 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L2.62 4 .15 6.51a.5.5 0 0 0 0 .71l.71.71a.5.5 0 0 0 .71 0L4.39 5.1l.71-.71a.5.5 0 0 0-.01-.71z'/%3E%3C/g%3E%3C/svg%3E");
width: 32px;
height: 32px;
border: 1px solid #d8d9db;
box-sizing: border-box;
`;
NextButton.displayName = 'NextButton';

const BackButton = styled.span`
align-self: flex-start;
border-radius: 50%;
{NextButton}: hover {
  border: 2px solid #DA3743
};
background-size: 6px 8px;
background-position: center;
background-repeat: no-repeat;
transform: scaleX(-1);
background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5.24 8.07'%3E%3Cg%3E%3Cpath style='fill:%23333' d='M5.09 3.68L4.39 3 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L2.62 4 .15 6.51a.5.5 0 0 0 0 .71l.71.71a.5.5 0 0 0 .71 0L4.39 5.1l.71-.71a.5.5 0 0 0-.01-.71z'/%3E%3C/g%3E%3C/svg%3E");
width: 32px;
height: 32px;
border: 1px solid #d8d9db;
box-sizing: border-box;`;

BackButton.displayName = 'BackButton';

const WeekDays = styled.th`
font-family: Brandon-Text-Light;
font-size: 80%;
`;

const NoBackButton = styled(BackButton)`
background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5.24 8.07'%3E%3Cg%3E%3Cpath style='fill:%23E1E1E1' d='M5.09 3.68L4.39 3 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L2.62 4 .15 6.51a.5.5 0 0 0 0 .71l.71.71a.5.5 0 0 0 .71 0L4.39 5.1l.71-.71a.5.5 0 0 0-.01-.71z'/%3E%3C/g%3E%3C/svg%3E");
pointer-events: none;
`;

NoBackButton.displayName = 'NoBackButton';

const CalenderModule = ({
  selectDate, month, next, back, openCalender, changeShownDate,
}) => {
  let calender = [];
  const startDay = moment(month.ISO).clone().startOf('month').startOf('week');
  const endDay = moment(month.ISO).clone().endOf('month').add(1, 'week')
    .endOf('week');
  const date = startDay.clone().subtract(1, 'day');

  while (date.isBefore(endDay, 'day')) {
    calender.push(Array(7).fill(0).map(() => {
      const thisDate = date.add(1, 'day').clone();
      return {
        thisDate: thisDate.format('D'),
        isoDate: thisDate.format(),
      };
    }));
  }
  if (calender.length > 6) {
    calender = calender.slice(0, 6);
  }
  return (
    <CalenderContainer>
      <CalenderDiv>
        <CalenderTitleDiv>
          {(moment(month.ISO).isSame(moment().local(), 'month')) ? <NoBackButton /> : <BackButton onClick={back} />}
          <CalenderTitle>{month.month}</CalenderTitle>
          <NextButton onClick={next}> </NextButton>
        </CalenderTitleDiv>
        <CalenderGrid>
          <thead>
            <tr>
              <WeekDays>Sun</WeekDays>
              <WeekDays>Mon</WeekDays>
              <WeekDays>Tue</WeekDays>
              <WeekDays>Wed</WeekDays>
              <WeekDays>Thu</WeekDays>
              <WeekDays>Fri</WeekDays>
              <WeekDays>Sat</WeekDays>
            </tr>
            {calender.map((week, i) => <CalenderWeek month={month} changeShownDate={changeShownDate} openCalender={openCalender} selectDate={selectDate} week={week} />)}
          </thead>
        </CalenderGrid>
      </CalenderDiv>
    </CalenderContainer>
  );
};

export default CalenderModule;
