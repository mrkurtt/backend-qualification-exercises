import * as R from 'ramda';
import delay from '@highoutput/delay';
import { ObjectId } from './';

describe('ObjectId', () => {
  test('unique ids', () => {
    const COUNT = 10000;

    const set = new Set(
      R.times(() => ObjectId.generate().toString(), COUNT)
    );

    expect(set.size).toBe(COUNT);
  });

  test('different timestamps', async () => {
    const one = ObjectId.generate().toString();
    await delay(100);
    const two = ObjectId.generate().toString();
    expect(one.substring(2, 14)).not.toEqual(two.substring(2, 14));
  });

  test('fixed random', async () => {
    const one = ObjectId.generate().toString();
    const two = ObjectId.generate().toString();
    expect(one.substring(14, 22)).toEqual(two.substring(14, 22));
  });

  test('lexicographic ordering', () => {
    const ids = R.times(() => ObjectId.generate().toString(), 1000);
    expect(ids.slice().sort()).toEqual(ids);
  });
});
