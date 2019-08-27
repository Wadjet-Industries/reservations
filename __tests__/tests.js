/* eslint-disable import/extensions */
import { configure, shallow, mount, render } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Reservations from '../client/reservation';
import 'whatwg-fetch';
import TimeModule from '../client/timeModule.jsx';

configure({ adapter: new Adapter() });

/**
 * @jest-environment jsdom
 */

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});


let listing;
beforeAll(() => {
  listing = new Reservations();
});

// Test reservations module
describe('Reservations Module', () => {

  it('Text in module', () => {
    const wrapper = shallow(<Reservations />);

    expect((wrapper).contains('Make a reservation')).toBe(true);
  });

  it ('fetches data from server and checks length', done => {

    listing.getListingData('L1')
      .then((data) => {
        expect(data.length).toEqual(100);
      })

    done();
  })

  it('renders select times on click', () => {
    const wrapper = shallow(<Reservations />);
    wrapper.find('FindDiv').children().simulate('click');
    wrapper.update();
    expect(wrapper.find('FindDiv').children().children()).toHaveLength(5);
  })
});

describe('Time Module', () => {
  let wrapper;
  let testHours = '16-23.5';

  beforeEach(() => {
    wrapper = mount(<TimeModule hours={testHours} />);
  })
  it('expects component to render', () => {
    const wrap = shallow(<TimeModule hours={'16-23.5'} />);

    expect(wrap.exists()).toBe(true);
  });

  it('expects TimeSelect to have time options', () => {
    expect(wrapper.find('select').children()).toHaveLength(16);
  })
});


