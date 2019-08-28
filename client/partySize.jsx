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
border: none;
border-bottom: 1px solid rgb(216, 217, 219);
border-top: none;
border-right: none;
border-left: none;
background: #ffffff;
width: 100%;
{PartySelect}: hover {
  border-bottom: 2px solid #DA3743
}
color: #fff;
outline: none;
`;

PartySelect.displayName = 'PartySelect';

const PartyDisplay = styled.div`
box-sizing: border-box;
width: 82%;
align-items: center;
position: absolute;
pointer-events: none;
font-size: 85%;
margin-left: auto;
margin-right: auto;
`;

const SelectDiv = styled.div`
width: 100%;
`;

const PartySelectDiv = styled.div`
`;

const PartySize = ({ findPartySize, size }) => {
  //take in max table amount
  const options = [];
  for (let i = 1; i <= 20; i++) {
    options.push(<option value={i}>{i}</option>);
  }
  return (
    <PartySelectDiv>
      <PartyTitle>Party Size</PartyTitle>
      <SelectDiv>
        <PartyDisplay>For {size}</PartyDisplay>
        <PartySelect onChange={findPartySize}>
          {options}
        </PartySelect>
      </SelectDiv>
    </PartySelectDiv>
  );
};

export default PartySize;

