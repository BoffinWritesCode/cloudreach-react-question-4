const { pathfind } = require('../pathfind')

describe('Pathfind', () => {
    const validMap = [
        [true, true, true, true, true],
        [false, false, false, false, false],
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true]
    ]

    it('start and end the same', () => {
        const P = [0, 0]
        const Q = [0, 0]
        expect(pathfind(validMap, P, Q)).toBe(0)
    })

    it('example case', () => {
        const P = [1, 0]
        const Q = [2, 3]
        expect(pathfind(validMap, P, Q)).toBe(6)
    })

    // test case for no available path
    it('no available path', () => {
        const A = [
            [true, true, true, true, true],
            [false, false, false, false, false],
            [true, true, true, true, true],
            [true, true, true, true, true],
            [true, true, true, true, true]
        ]
        const P = [0, 0];
        const Q = [2, 3];
        expect(pathfind(A, P, Q)).toThrow();
    })

    // test case for no map data at all
    it ('empty map', () => {
        const A = [[], [], [], [], []]
        const P = [0, 0];
        const Q = [2, 3];
        expect(pathfind(A, P, Q)).toThrow();
    })

    // test case for invalid coords
    // nested for the sake of similar tests
    describe ('coordinate arrays having length of', () => {
        it('0', () => {
            expect(pathfind(validMap, [], [])).toThrow();
        })
        it('1', () => {
            expect(pathfind(validMap, [1], [4])).toThrow();
        })
        it('3', () => {
            expect(pathfind(validMap, [2, 2, 3], [2, 1, 4])).toThrow();
        })
    })

    // test case for out of bounds
    it ('coordinates out of bounds', () => {
        const P = [-1, -1];
        const Q = [6, 6];
        expect(pathfind(validMap, P, Q)).toThrow();
    });
})
