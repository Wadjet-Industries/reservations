/* eslint-disable import/extensions */
import {
  configure, shallow, mount, render, setupMount,
} from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
import { find, findAll } from 'styled-components/test-utils';
import Reservations from '../client/reservation';
import TimeModule from '../client/timeModule.jsx';
import PartySize from '../client/partySizeModule.jsx';
import CalenderModule from '../client/calenderModule.jsx';
import CalenderWeek from '../client/calenderWeekModule.jsx';
import CalenderDay from '../client/calenderDayModule.jsx';
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

describe('Calender Week module', () => {
  const testWeek = [{ thisDate: "1", isoDate: "2019-09-01T00:00:00-07:00" }, { thisDate: "2", isoDate: "2019-09-02T00:00:00-07:00" }, { thisDate: "3", isoDate: "2019-09-03T00:00:00-07:00" }, { thisDate: "4", isoDate: "2019-09-04T00:00:00-07:00" }, { thisDate: "5", isoDate: "2019-09-05T00:00:00-07:00" }, { thisDate: "6", isoDate: "2019-09-06T00:00:00-07:00" }, { thisDate: "7", isoDate: "2019-09-07T00:00:00-07:00" }];

  const currentMonth = moment().local();
  const currentTestMonth = { month: currentMonth.format('MMMM YYYY'), ISO: moment().local().format().slice(0, 10) };

  it('tests the map function works', () => {
    const wrap = shallow(<CalenderWeek week={testWeek} month={currentTestMonth} />);
    expect(wrap.exists()).toBe(true);
  });
});

describe('Calender Day Module', () => {
  const testDay = { thisDate: moment().local().format('D'), isoDate: moment().local().format() };
  const testMonth = {month: moment().local().format('MMMM YYYY'), ISO: moment().local().format() }
  const mockSelectDate = jest.fn();
  const mockOpenCalender = jest.fn();
  const mockChangeShownDate = jest.fn();

  it('should render a day', () => {
    const wrap = shallow(<CalenderDay day={testDay} month={testMonth} />);
    expect(wrap.exists()).toBe(true);
  });

  it('should register a click event when the element is clicked', () => {
    const wrap = shallow(<CalenderDay day={testDay} month={testMonth} selectDate={mockSelectDate} openCalender={mockOpenCalender} changeShownDate={mockChangeShownDate} />);

    wrap.find('CalenderTdCurrentMonth').simulate('click');
    expect(mockSelectDate).toHaveBeenCalled();
    expect(mockOpenCalender).toHaveBeenCalled();
    expect(mockChangeShownDate).toHaveBeenCalled();
  });

  it('should render correct td for current month and current day', () => {
    const wrap = shallow(<CalenderDay day={testDay} month={testMonth} selectDate={mockSelectDate} openCalender={mockOpenCalender} changeShownDate={mockChangeShownDate} />);

    expect(wrap.find('CalenderTdCurrentMonth').exists()).toBe(true);
  });

  it('should render correct td for a day in the month after current month', () => {
    const aheadDay = { thisDate: moment().local().add(1, 'month').format('D'), isoDate: moment().local().add(1, 'month').format() };
    const wrap = shallow(<CalenderDay day={aheadDay} month={testMonth} selectDate={mockSelectDate} openCalender={mockOpenCalender} changeShownDate={mockChangeShownDate} />);

    expect(wrap.find('CalenderTdNotCurrentMonth').exists()).toBe(true);
  });

  it('should render correct td for a day in the month before current month', () => {
    const behindDay = { thisDate: moment().local().subtract(1, 'month').format('D'), isoDate: moment().local().subtract(1, 'month').format() };
    const wrap = shallow(<CalenderDay day={behindDay} month={testMonth} selectDate={mockSelectDate} openCalender={mockOpenCalender} changeShownDate={mockChangeShownDate} />);

    expect(wrap.find('CalenderTdBeforeDayDiffMonth').exists()).toBe(true);
  });

  if (moment().local().format('D') !== '1') {
    it('should render correct td for day in the same month but before current day', () => {
      const behindDay = { thisDate: moment().local().subtract(1, 'days').format('D'), isoDate: moment().local().subtract(1, 'days').format() };

      const wrap = shallow(<CalenderDay day={behindDay} month={testMonth} selectDate={mockSelectDate} openCalender={mockOpenCalender} changeShownDate={mockChangeShownDate} />);

      expect(wrap.find('CalenderTdBeforeDaySameMonth').exists()).toBe(true);
    });
  }
});