/* eslint-disable import/extensions */
import { configure, shallow, mount, render } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Reservations from '../client/reservation';

configure({ adapter: new Adapter() });

test('Text in module', () => {
  const wrapper = shallow(<Reservations />);

  expect((wrapper).contains('Hello this is reservations!')).toBe(true);

})