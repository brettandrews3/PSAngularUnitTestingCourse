import { StrengthPipe } from "./strength.pipe"

describe('StrengthPipe', () => {
  it('should display weak if strength is 5', () => {
    // arrange
    let pipe = new StrengthPipe();

    // act
    let val = pipe.transform(5)

    // assert
    expect(val).toEqual('5 (weak)');
  })

  it('should display strong if strength is 10', () => {
    let pipe = new StrengthPipe();

    let val = pipe.transform(10);

    expect(val).toEqual('10 (strong)');
  })

  it('should display unbelievable if strength is 20+', () => {
    let pipe = new StrengthPipe();

    let val = pipe.transform(20);

    expect(val).toEqual('20 (unbelievable)');
  })

  // my test
  it('should display an error if strength is negative', () => {
    let pipe = new StrengthPipe();

    let val = pipe.transform(-15);

    expect(val).toEqual('-15 (error)');
  })
})
