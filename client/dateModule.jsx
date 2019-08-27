import React from 'react';
import styled from 'styled-components';

const DateDiv = styled.div`
width: 50%;
box-sizing: border-box;
margin-right: 2.5%;
`;

const DateSelect = styled.select`
-webkit-appearance: none;
-webkit-border-radius: 0px;
border: none;
border-bottom: 1px solid rgb(216, 217, 219);
border-right: none;
border-left: none;
background: #ffffff;
width: 100%;
{PartySelect}: hover {
  border-bottom: 2px solid #DA3743
}
`;

const DateTitle = styled.div``;

const DateModule = (props) => {
  return (
    <DateDiv>
      <DateTitle>Date</DateTitle>
      <DateSelect>Date</DateSelect>
    </DateDiv>
  );
};

export default DateModule;
