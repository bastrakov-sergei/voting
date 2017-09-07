import {List, Map} from 'immutable'
import {expect} from 'chai'

import {setEntries, next, vote} from '../src/core'

describe('Application logic', () => {
    describe('SetEntries', () => {
        it('Add entries to state', () => {
            const state = Map()
            const entries = ['Trainspotting', '28 Days Later']

            const nextState = setEntries(state, entries)

            expect(nextState).to.equal(Map({
                entries: List.of('Trainspotting', '28 Days Later')
            })) 
        })
    })

    describe('Next', () => {
        it('Go to next voting pair', () => {
            const state = Map({
                entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
            })
            const nextState = next(state)

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later')
                }),
                entries: List.of('Sunshine')
            }))
        })
    })

    describe('Vote', () => {
        it('Make vote result', () => {
            const state = Map({
                pair: List.of('Trainspotting', '28 Days Later')
            })
            const nextState = vote(state, 'Trainspotting')

            expect(nextState).to.equal(Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 1
                })
            }))
        })

        it('Add vote result', () => {
            const state = Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 2,
                    '28 Days Later': 5
                })
            })
            const nextState = vote(state, 'Trainspotting')

            expect(nextState).to.equal(Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 3,
                    '28 Days Later': 5
                })
            }))
        })

        it('Move winner to entries list tail', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            })
            const nextState = next(state)

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', 'Trainspotting')
            }))
        })

        it('Move pair to entries list tail when draw', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 3,
                        '28 Days Later': 3
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            })
            const nextState = next(state)

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
            }))
        })

        it('Determine winner when last entry remains', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                }),
                entries: List()
            })
            const nextState = next(state)

            expect(nextState).to.equal(Map({
                winner: 'Trainspotting'
            }))
        })
    })
})