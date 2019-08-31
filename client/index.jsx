/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import Reservations from './reservation.jsx';

WebFont.load({
  google: {
    families: ['Josefin Sans:100, 200, 300, 400, 700', 'Lota', 'sans-serif'],
  },
});

ReactDOM.render(<Reservations />, document.getElementById('reservation'));
