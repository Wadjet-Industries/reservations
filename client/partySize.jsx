/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';

const PartyTitle = styled.div`
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
width: 100%;
{PartySelect}: hover {
  border-bottom: 2px solid #DA3743
}


`;

const SelectDiv = styled.div`
`;

const PartySelectDiv = styled.div`
`

const PartyFor = styled.span``

const PartySize = (props) => {
  const options = [];
  for (let i = 1; i <= 20; i++) {
    options.push(<option value="{i}">{i}</option>);
  }
  return (
    <PartySelectDiv>
      <PartyTitle>Party Size</PartyTitle>
      <SelectDiv>
        <PartySelect>
          {options}
        </PartySelect>
      </SelectDiv>
    </PartySelectDiv>
  )
};

export default PartySize;

