import Age from './../src/age.js';


describe('Age', () => {
  let reuseableAge;
  beforeEach(() => {
    reuseableAge = new Age(100);
  })

  test('Confirms constructor built the age correctly', () => {
    expect(reuseableAge.earthAge).toEqual(100);
    expect(reuseableAge.venusAge).toEqual(100/.62);
  })
})
