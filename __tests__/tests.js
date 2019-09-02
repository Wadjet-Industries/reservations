/* eslint-disable import/extensions */
import {
  configure, shallow, mount, render, setupMount,
} from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
import Reservations from '../client/reservation';
import TimeModule from '../client/timeModule.jsx';
import PartySize from '../client/partySizeModule.jsx';
import CalenderModule from '../client/calenderModule.jsx';
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
  });

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
  const testHours = '2019-08-27T16:00:00-07:00--2019-08-27T23:30:00-07:00';

  it('expects component to render', () => {
    const wrap = shallow(<TimeModule hours={testHours} />);
    expect(wrap.exists()).toBe(true);
  });

  it('expects TimeSelect to have time options', () => {
    const wrapper = mount(<TimeModule hours={testHours} />);
    expect(wrapper.find('select').children()).toHaveLength(48);
  });
});

describe('Party Size Module', () => {
  it('expects component to render', () => {
    const wrap = shallow(<PartySize />);
    expect(wrap.exists()).toBe(true);
  });
});

describe('Calender Module', () => {
  const testMonth = { month: 'August 2019', ISO: '2019-08-27T23:30:00-07:00' };

  it('expects component to render', () => {
    const wrap = shallow(<CalenderModule month={testMonth} />);
    expect(wrap.exists()).toBe(true);
  });

  it('tests next button', () => {
    const mockNextFunc = jest.fn();
    const wrap = shallow(<CalenderModule month={testMonth} next={mockNextFunc} />);
    wrap.find('NextButton').simulate('click');
    expect(mockNextFunc).toHaveBeenCalled();
  });

  it('tests back button works', () => {
    const mockBackFn = jest.fn();
    const wrap = shallow(<CalenderModule month={testMonth} back={mockBackFn} />);
    wrap.find('BackButton').simulate('click');
    expect(mockBackFn).toHaveBeenCalledTimes(1);
  });

  it('tests back button doesn\'t click on same month as initial month', () => {
    const mockBackFn = jest.fn();
    const currentMonth = moment().local();
    const currentTestMonth = { month: currentMonth.format('MMMM YYYY'), ISO: moment().local().format().slice(0, 10) };
    const wrap = shallow(<CalenderModule month={currentTestMonth} back={mockBackFn} />);
    wrap.find('NoBackButton').simulate('click');
    expect(mockBackFn).toHaveBeenCalledTimes(0);
  });

});
