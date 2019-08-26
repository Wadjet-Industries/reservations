/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';

const PartyTitle = styled.h2`
color: #000;
font-size: 15px;
`;

const PartySelect = styled.select`
-webkit-appearance: none;
-webkit-border-radius: 0px;
border-top: none;
border-right: none;
border-left: none;
background: #ffffff;
width: 25%;
`;

const PartySelectDiv = styled.div`
`

const PartySize = (props) => {
  const options = [];
  for (let i = 1; i <= 20; i++) {
    options.push(<option value="{i}">{i}</option>);
  }
  return (
    <PartySelectDiv>
      <PartyTitle>Party Size</PartyTitle>
      <div>
        <PartySelect>
          {options}
        </PartySelect>
      </div>
    </PartySelectDiv>
  )
};

export default PartySize;

