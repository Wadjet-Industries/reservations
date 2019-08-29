/* eslint-disable import/extensions */
import { configure, shallow, mount, render, setupMount } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Reservations from '../client/reservation';
import TimeModule from '../client/timeModule.jsx';
import PartySize from '../client/partySize.jsx';
import fetch from '../__mocks__/fetch.js';

global.fetch = fetch;

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

  it('renders on page load', () => {
    const wrapper = shallow(<Reservations />);
    expect(wrapper.exists()).toBe(true);
  })

  it('Text in module', () => {
    const wrapper = shallow(<Reservations />);
    expect((wrapper).contains('Make a reservation')).toBe(true);
  });

  it('tests find state value to initialize as false', () => {
    const wrapper = shallow(<Reservations />);
    expect(wrapper.state('find')).toBe(false);
  });

  it('should fetch data from server', () => {
    const fetchSpy = jest.spyOn(window, 'fetch');
    const reservationInstance = shallow(<Reservations />);

    expect(fetchSpy).toBeCalled();
  });

});

describe('Time Module', () => {
  let wrapper;
  let testHours = '2019-08-27T16:00:00-07:00--2019-08-27T23:30:00-07:00';

  beforeEach(() => {
    wrapper = mount(<TimeModule hours={testHours} />);
  })
  it('expects component to render', () => {
    const wrap = shallow(<TimeModule hours={'2019-08-27T16:00:00-07:00--2019-08-27T23:30:00-07:00'} />);
    expect(wrap.exists()).toBe(true);
  });

  it('expects TimeSelect to have time options', () => {
    expect(wrapper.find('select').children()).toHaveLength(16);
  });
});

describe('Party Size Module', () => {

  it('expects component to render', () => {
    const wrap = shallow(<PartySize />);
    expect(wrap.exists()).toBe(true);
  });
});

