import { convertDateToEpoch, convertEpochToTimeString } from './helper';

describe('Helper', () => {
  it('should convert date to Epoch', () => {
    const date = new Date('2022-12-10T00:00:00').getTime();
    expect(convertDateToEpoch(date)).toEqual(1670630400);
  });

  it('should convert epoch to TimeString', () => {
    const epoch = 5;
    expect(convertEpochToTimeString(epoch)).toEqual('00:00:05');
  });
});
