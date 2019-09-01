/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';

const PartyTitle = styled.div`
margin: none;
height: 50%;
margin-bottom: 10%;
`;

const PartyDisplayFinal = styled.div`
width: 100%;
margin: none;
box-sizing: border-box;
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
width: 50%;
align-items: center;
align-self: flex-start;
pointer-events: none;
font-size: 85%;
margin: none;
font-family: Brandon-Text-Light;
box-sizing: border-box;
`;

const SelectDiv = styled.div`
position: absolute;
margin: none;
width: 82%;
align-self: center;
padding-top: 5px;
`;

const PartyDisplayWrap = styled.div`
pointer-events: none
display: flex;
flex-direction: row;
position: absolute;
box-sizing: border-box;
margin: none;
justify-content: space-between;
width: 82%;
align-self: center;
`;

const PartySelectDiv = styled.div`
font-family: Brandon-Text-Regular;
width: 50%;
box-sizing: border-box;
margin-right: 2.5%;
display: flex;
flex-direction: column;
justify-content: flex-start;
`;

const DropDownDiv = styled.div`
align-self: flex-end;
height: 100%;
`;

const DropDownIcon = styled.svg`
width: 8px;
padding-bottom: 5px;
`;


const DropDownPath = styled.path`
fill: rgb(51, 51, 51);
`;

const PartySize = ({ findPartySize, size }) => {
  // take in max table amount
  const options = [];
  for (let i = 1; i <= 20; i++) {
    options.push(<option value={i}>{i}</option>);
  }
  return (
    <PartySelectDiv>
      <PartyTitle>Party Size</PartyTitle>
      <PartyDisplayFinal>
        <SelectDiv>
          <PartySelect onChange={findPartySize}>
            {options}
          </PartySelect>
        </SelectDiv>
        <PartyDisplayWrap>
          <PartyDisplay>
For
            {' '}
            { size }
          </PartyDisplay>
          <DropDownDiv>
            <DropDownIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.07 5.24"><DropDownPath d="M4.39 5.09l.71-.71 2.82-2.82a.5.5 0 0 0 0-.71l-.7-.7a.5.5 0 0 0-.71 0L4 2.62 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L3 4.39l.71.71a.5.5 0 0 0 .68-.01z" /></DropDownIcon>
          </DropDownDiv>
        </PartyDisplayWrap>
      </PartyDisplayFinal>
    </PartySelectDiv>
  );
};

export default PartySize;
