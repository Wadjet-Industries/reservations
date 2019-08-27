/* eslint-disable import/extensions */
import { configure, shallow, mount, render } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Reservations from '../client/reservation';
import 'whatwg-fetch';

configure({ adapter: new Adapter() });

/**
 * @jest-environment jsdom
 */

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});

// Test reservations module
describe('Reservations Module', () => {

  it('Text in module', () => {
    const wrapper = shallow(<Reservations />);

    expect((wrapper).contains('Make a reservation')).toBe(true);
  });

  it ('fetches data from server', done => {
    const listing = new Reservations();
    listing.getListingData('L1');

  })
})


