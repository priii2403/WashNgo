import Metrics from '../Helpers/Metrics';

export const multiplicationData = [
  {
    id: 1,
    name: 'X1',
  },
  {
    id: 2,
    name: 'X5',
  },
  {
    id: 3,
    name: 'X10',
  },
  {
    id: 4,
    name: 'X20',
  },
  {
    id: 5,
    name: 'X50',
  },
  {
    id: 6,
    name: 'X100',
  },
];

export const balance = [
  {
    id: 1,
    amount: '1',
  },
  {
    id: 2,
    amount: '10',
  },
  {
    id: 3,
    amount: '100',
  },
  {
    id: 4,
    amount: '1000',
  },
];
export const chart_number = [
  {
    id: 0,
    amount: '0',
  },
  {
    id: 1,
    amount: '1',
  },
  {
    id: 2,
    amount: '2',
  },
  {
    id: 3,
    amount: '3',
  },
  {
    id: 4,
    amount: '4',
  },
  {
    id: 5,
    amount: '5',
  },
  {
    id: 6,
    amount: '6',
  },
  {
    id: 7,
    amount: '7',
  },
  {
    id: 8,
    amount: '8',
  },
  {
    id: 9,
    amount: '9',
  },
  {
    amount: 'S',
  },
];
export const chart_Alpha = [
  {
    id: 0,
    amount: 'B',
  },
  {
    id: 1,
    amount: 'B',
  },
  {
    id: 2,
    amount: 'S',
  },
  {
    id: 3,
    amount: 'S',
  },
  {
    id: 4,
    amount: 'B',
  },
  {
    id: 5,
    amount: 'S',
  },
  {
    id: 6,
    amount: 'B',
  },
  {
    id: 7,
    amount: 'S',
  },
  {
    id: 8,
    amount: 'B',
  },
  {
    id: 9,
    amount: 'S',
  },
];

export const gameData = [
  {
    number: 0,
    color: 'violet',
    value: '207.36X',
    size: 'small',
    source: require('../Assets/dies/circle-0.png'),
  },
  {
    number: 1,
    color: 'green',
    size: 'small',
    value: '207.36X',
    source: require('../Assets/dies/circle-1.png'),
  },
  {
    number: 2,
    color: 'red',
    size: 'small',
    value: '67.36X',
    source: require('../Assets/dies/circle-2.png'),
  },
  {
    number: 3,
    color: 'green',
    size: 'small',
    value: '267.36X',
    source: require('../Assets/dies/circle-3.png'),
  },
  {
    number: 4,
    color: 'red',
    size: 'small',
    value: '57.36X',
    source: require('../Assets/dies/circle-4.png'),
  },
  {
    number: 5,
    color: 'violet',
    value: '27.36X',
    size: 'big',
    source: require('../Assets/dies/circle-5.png'),
  },
  {
    number: 6,
    color: 'red',
    value: '77.36X',
    size: 'big',
    source: require('../Assets/dies/circle-6.png'),
  },
  {
    number: 7,
    color: 'green',
    value: '20.36X',
    size: 'big',
    source: require('../Assets/dies/circle-7.png'),
  },
  {
    number: 8,
    color: 'red',
    value: '207.00X',
    size: 'big',
    source: require('../Assets/dies/circle-8.png'),
  },
  {
    number: 9,
    color: 'green',
    value: '87.36X',
    size: 'big',
    source: require('../Assets/dies/circle-9.png'),
  },
  {
    number: 10,
    color: 'green',
    value: '22.36X',
    size: 'big',
    source: require('../Assets/dies/circle-9.png'),
  },
  {
    number: 11,
    color: 'green',
    value: '25.36X',
    size: 'big',
    source: require('../Assets/dies/circle-9.png'),
  },
  {
    number: 12,
    color: 'green',
    value: '25.36X',
    size: 'big',
    source: require('../Assets/dies/circle-9.png'),
  },
  {
    number: 13,
    color: 'green',
    value: '21.36X',
    size: 'big',
    source: require('../Assets/dies/circle-9.png'),
  },
  {
    number: 14,
    color: 'green',
    value: '26.36X',
    size: 'big',
    source: require('../Assets/dies/circle-9.png'),
  },
  {
    number: 15,
    color: 'green',
    value: '28.36X',
    size: 'big',
    source: require('../Assets/dies/circle-9.png'),
  },
];

export const WinningData = [
  {
    period: 20240802011055,
    number: 5,
    bigSmall: 'big',
    color: ['green', 'purple'],
  },
  {
    period: 20240802011054,
    number: 7,
    bigSmall: 'big',
    color: ['purple'],
  },
  {
    period: 20240802011053,
    number: 8,
    bigSmall: 'small',
    color: ['red', 'purple'],
  },
  {
    period: 20240802011052,
    number: 9,
    bigSmall: 'small',
    color: ['green', 'red'],
  },
  {
    period: 20240802011051,
    number: 2,
    bigSmall: 'big',
    color: ['red'],
  },
];

export const games = [
  {
    title: 'Win Go',
    type: 'Guess Number',
    options: 'Green/Red/Violet to win',
    icon: require('../Assets/home/lottery-coin.png'),
    // icon: require('../../Assets/home/lottery-coin.png'),
    link: 'Wingo',
  },
  {
    title: 'K3',
    type: 'Guess Number',
    options: 'Big/Small/Odd/Even',
    icon: require('../Assets/home/lottery-dice.png'),
    link: 'K3',
  },
  {
    title: '5d',
    type: 'Guess Number',
    options: 'Big/Small/Odd/Even',
    icon: require('../Assets/home/lottery-5d.png'),
    link: 'Wingo',
  },
  {
    title: 'Trx Win Go',
    type: 'Guess Number',
    options: 'Green/Red/Violet to win',
    icon: require('../Assets/home/lottery-trx.png'),
    link: 'Wingo',
  },
];

export const Terms_url = {
  url: 'https://www.example.com/terms-and-conditions',
};
export const Payment_Type = ['Bank', 'UPI'];
export const WithDraw_STATUS = ['Completed', 'Rejected', 'Processing'];
export const Game_Status = ['Win', 'Lose', 'Processing'];
export const Deposit_status = ['Success', 'Failed', 'Processing'];

export const FONT_SIZE = {
  very_tiny: Metrics.rfv(6),
  tiny: Metrics.rfv(8),
  small_tiny: Metrics.rfv(10),
  small: Metrics.rfv(12),
  small_medium: Metrics.rfv(14),
  medium: Metrics.rfv(16),
  medium_extra: Metrics.rfv(18),
  regular: Metrics.rfv(20),
  regular_extra: Metrics.rfv(22),
  large: Metrics.rfv(24),
  extra_large: Metrics.rfv(48),
};
export const Fonts = {
  Roboto100: 'Roboto-Thin',
  Roboto300: 'Roboto-Light',
  Roboto400: 'Roboto-Regular',
  Roboto500: 'Roboto-Medium',
  Roboto700: 'Roboto-Bold',
  Roboto900: 'Roboto-Black',
};
