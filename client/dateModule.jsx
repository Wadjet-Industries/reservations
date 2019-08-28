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

const DateModule = (props) => {
  return (
    <DateDiv>
      <DateTitle>Date</DateTitle>
      <DateSelect>Mon, 8/26</DateSelect>
    </DateDiv>
  );
};

export default DateModule;
