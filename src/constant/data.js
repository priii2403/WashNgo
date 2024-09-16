import Metrics from '../Helpers/Metrics';
export const privacy_Policy = 'https://policies.google.com/privacy?hl=en-US';

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
export const appHitSlop = (t = 0, r = 0, b = 0, l = 0) => {
  return {
    top: Metrics.rfv(t),
    right: Metrics.rfv(r),
    bottom: Metrics.rfv(b),
    left: Metrics.rfv(l),
  };
};
