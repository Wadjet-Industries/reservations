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
import DateModule from '../client/dateModule.jsx';
import PartySize from '../client/partySizeModule.jsx';
import CalenderModule from '../client/calenderModule.jsx';
import CalenderWeek from '../client/calenderWeekModule.jsx';
import CalenderDay from '../client/calenderDayModule.jsx';
import fetch from '../__mocks__/fetch.js';
import fakeListingData from '../__mocks__/listingData.js';

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

  it('find state should start off as false', () => {
    const wrap = shallow(<Reservations />);
    expect(wrap.state('find')).toBe(false);
  });

  it('should render a Find Table button initially', () => {
    const wrap = shallow(<Reservations />);
    expect(wrap.find('FindTable').exists()).toBe(true);
  });

  it('should change Find Table button on state change', () => {
    const wrap = shallow(<Reservations />);
    wrap.setState({ find: true });
    expect(wrap.find('FindTable').exists()).toBe(false);
  });

  it('expects find state to change on click', () => {
    const currentTestMonth = { month: moment().local().format('MMMM YYYY'), ISO: moment().local().format().slice(0, 10) };
    const testDate = moment().local().format().slice(0, 10);
    const testTime = moment().local().startOf('day').format();
    const wrap = shallow(<Reservations />);
    wrap.instance().listingData = fakeListingData;
    wrap.setState({ month: currentTestMonth, date: testDate, time: testTime });
    wrap.find('FindTable').simulate('click');
    expect(wrap.state('find')).toBe(true);
  });

  it('expects getDay function to be called on find times click', () => {
    const mockGetDay = jest.fn();
    const currentTestMonth = { month: moment().local().format('MMMM YYYY'), ISO: moment().local().format().slice(0, 10) };
    const testDate = moment().local().format().slice(0, 10);
    const testTime = moment().local().startOf('day').format();
    const wrap = shallow(<Reservations />);
    wrap.instance().listingData = fakeListingData;
    wrap.setState({ month: currentTestMonth, date: testDate, time: testTime });
    wrap.instance().getDay = mockGetDay;
    wrap.find('FindTable').simulate('click');
    expect(wrap.instance().getDay).toHaveBeenCalled();
  });

  it('expects findTimeRange function to be called on getDay click', () => {
    const mockFindTimeRange = jest.fn();
    const currentTestMonth = { month: moment().local().format('MMMM YYYY'), ISO: moment().local().format().slice(0, 10) };
    const testDate = moment().local().format().slice(0, 10);
    const testTime = moment().local().startOf('day').format();
    const wrap = shallow(<Reservations />);
    wrap.instance().listingData = fakeListingData;
    wrap.setState({ month: currentTestMonth, date: testDate, time: testTime });
    wrap.instance().findTimeRange = mockFindTimeRange;
    wrap.instance().getDay();
    expect(wrap.instance().findTimeRange).toHaveBeenCalled();
  });

  it('expects error message to render on click if nothing in openSeatTimes', () => {
    const currentTestMonth = { month: moment().local().format('MMMM YYYY'), ISO: moment().local().format().slice(0, 10) };
    const testDate = moment().local().format().slice(0, 10);
    const testTime = moment().local().startOf('day').format();
    const wrap = shallow(<Reservations />);
    wrap.instance().listingData = fakeListingData;
    wrap.setState({
      month: currentTestMonth, date: testDate, time: testTime, openSeatTimes: [],
    });
    wrap.find('FindTable').simulate('click');
    expect(wrap.exists('ErrorMessage')).toBe(true);
  });

  it('expects possible times to render on click', () => {
    const wrap = shallow(<Reservations />);
    wrap.instance().listingData = fakeListingData;
    wrap.setState({
      month: {
        month: 'September 2019',
        ISO: '2019-09-02T20:24:43-07:00',
      },
      date: '2019-09-02',
      hours: '2019-09-02T08:30:00-07:00--2019-09-02T14:00:00-07:00',
      openSeatTimes: [
        {
          reservations: {
            open: 21,
            reserved: 20,
          },
          _id: '5d6c8ae33b814c597deb02f0',
          time: '2019-09-02T10:00:00-07:00',
        },
        {
          reservations: {
            open: 29,
            reserved: 12,
          },
          _id: '5d6c8ae33b814c597deb02ef',
          time: '2019-09-02T10:30:00-07:00',
        },
        {
          reservations: {
            open: 21,
            reserved: 20,
          },
          _id: '5d6c8ae33b814c597deb02ee',
          time: '2019-09-02T11:00:00-07:00',
        },
        {
          reservations: {
            open: 25,
            reserved: 16,
          },
          _id: '5d6c8ae33b814c597deb02ed',
          time: '2019-09-02T11:30:00-07:00',
        },
        {
          reservations: {
            open: 19,
            reserved: 22,
          },
          _id: '5d6c8ae33b814c597deb02ec',
          time: '2019-09-02T12:00:00-07:00',
        },
        {
          reservations: {
            open: 11,
            reserved: 30,
          },
          _id: '5d6c8ae33b814c597deb02eb',
          time: '2019-09-02T12:30:00-07:00',
        },
        {
          reservations: {
            open: 24,
            reserved: 17,
          },
          _id: '5d6c8ae33b814c597deb02ea',
          time: '2019-09-02T13:00:00-07:00',
        },
        {
          reservations: {
            open: 23,
            reserved: 18,
          },
          _id: '5d6c8ae33b814c597deb02e9',
          time: '2019-09-02T13:30:00-07:00',
        },
        {
          reservations: {
            open: 38,
            reserved: 3,
          },
          _id: '5d6c8ae33b814c597deb02e8',
          time: '2019-09-02T14:00:00-07:00',
        },
      ],
      partyAmount: 1,
      time: '2019-09-02T12:30:00-07:00',
    });
    wrap.find('FindTable').simulate('click');
    expect(wrap.exists('SelectReservationTime')).toBe(true);
  });

  it('expects there to be a booked div', () => {
    const wrap = shallow(<Reservations />);
    expect(wrap.find('Booked').contains('Booked 65 times today')).toBe(true);
  })
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
  const testWeek = [{ thisDate: '1', isoDate: '2019-09-01T00:00:00-07:00' }, { thisDate: '2', isoDate: '2019-09-02T00:00:00-07:00' }, { thisDate: '3', isoDate: '2019-09-03T00:00:00-07:00' }, { thisDate: '4', isoDate: '2019-09-04T00:00:00-07:00' }, { thisDate: '5', isoDate: '2019-09-05T00:00:00-07:00' }, { thisDate: '6', isoDate: '2019-09-06T00:00:00-07:00' }, { thisDate: '7', isoDate: '2019-09-07T00:00:00-07:00' }];

  const currentMonth = moment().local();
  const currentTestMonth = { month: currentMonth.format('MMMM YYYY'), ISO: moment().local().format().slice(0, 10) };

  it('tests the map function works', () => {
    const wrap = shallow(<CalenderWeek week={testWeek} month={currentTestMonth} />);
    expect(wrap.exists()).toBe(true);
  });
});

describe('Calender Day Module', () => {
  const testDay = { thisDate: moment().local().format('D'), isoDate: moment().local().format() };
  const testMonth = { month: moment().local().format('MMMM YYYY'), ISO: moment().local().format() };
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

describe('tests Dates module', () => {
  it('should render', () => {
    const wrap = shallow(<DateModule />);
    expect(wrap.exists()).toBe(true);
  });

  it('should change calender state to true on click', () => {
    const dateInstance = new DateModule();
    const wrap = shallow(<DateModule />);
    wrap.find('DateSelect').simulate('click');
    expect(wrap.state('calender')).toBe(true);
  });
});
