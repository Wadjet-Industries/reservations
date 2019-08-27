/* eslint-disable import/extensions */
import { configure, shallow, mount, render } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Reservations from '../client/reservation';

configure({ adapter: new Adapter() });

test('Text in module', () => {
  const wrapper = shallow(<Reservations />);

  expect((wrapper).contains('Make a reservation')).toBe(true);

})

test('party size module', () => {
  const wrapper = shallow(<Reservations />);

  expect((wrapper).containsMatchingElement(<PartySize />)).toBe(true);
})