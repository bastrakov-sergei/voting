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
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later')
                }),
                entries: List()
            })
            const nextState = vote(state, 'Trainspotting')

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 1
                    }),
                }),
                entries: List()
            }))
        })

        it('Add vote result', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 2,
                        '28 Days Later': 5
                    })
                }),
                entries: List()
            })
            const nextState = vote(state, 'Trainspotting')

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 3,
                        '28 Days Later': 5
                    }),
                }),
                entries: List()
            }))
        })
    })
})