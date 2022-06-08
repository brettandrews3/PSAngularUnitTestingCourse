describe('my first test', () => {
    let sut;

    // beforeEach() resets the data before each test
    beforeEach(() => {
        sut = {}
    })

    it('should be true if true', () => {
        // arrange
        sut.a = false;

        // act
        sut.a = true;

        // assert
        expect(sut.a).toBe(true);
    })

    // If test fails, the output would read: 'my first test should be true if true'
})
