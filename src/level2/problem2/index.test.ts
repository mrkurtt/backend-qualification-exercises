import { DowntimeLogs, merge } from './';

describe('mergeDowntimeLogs', () => {
  const cases: [string, DowntimeLogs[], DowntimeLogs][] = [
    [
      'islands',
      [
        [[new Date('2020-01-01T00:00:00Z'), new Date('2020-01-01T01:00:00Z')], [new Date('2020-01-02T05:00:00Z'), new Date('2020-01-02T05:30:00Z')]],
        [[new Date('2020-01-01T17:00:00Z'), new Date('2020-01-01T17:45:00Z')]],
      ],
      [
        [new Date('2020-01-01T00:00:00Z'), new Date('2020-01-01T01:00:00Z')],
        [new Date('2020-01-01T17:00:00Z'), new Date('2020-01-01T17:45:00Z')],
        [new Date('2020-01-02T05:00:00Z'), new Date('2020-01-02T05:30:00Z')],
      ]
    ],
    [
      'overlaps',
      [
        [[new Date('2020-01-01T00:00:00Z'), new Date('2020-01-01T01:00:00Z')], [new Date('2020-01-02T05:00:00Z'), new Date('2020-01-02T05:30:00Z')]],
        [[new Date('2020-01-01T17:00:00Z'), new Date('2020-01-01T17:45:00Z')], [new Date('2020-01-02T05:20:00Z'), new Date('2020-01-02T06:10:00Z')]],
      ],
      [
        [new Date('2020-01-01T00:00:00Z'), new Date('2020-01-01T01:00:00Z')],
        [new Date('2020-01-01T17:00:00Z'), new Date('2020-01-01T17:45:00Z')],
        [new Date('2020-01-02T05:00:00Z'), new Date('2020-01-02T06:10:00Z')],
      ]
    ],
  ];

  test.each(cases)('%p', (_, input, expected) => {
    expect(merge(...input)).toEqual(expected);
  });
});
