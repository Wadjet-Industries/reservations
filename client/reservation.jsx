/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
color: red;
font-size: 20px;
`;

class Reservations extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Title>Make a reservation</Title>
      </div>
    );
  }
}


export default Reservations;
