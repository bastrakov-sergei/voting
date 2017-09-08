import {List, Map} from 'immutable'
import {expect} from 'chai'

import makeStore from '../src/store'

describe('store', () => {
    it('Store initialize with correct reducer', () => {
        const store = makeStore()
        expect(store.getState()).to.equal(Map())

        store.dispatch({
            type: 'SET_ENTRIES',
            entries: ['Trainspotting', '28 Days Later']
        })
        expect(store.getState()).to.equal(Map({
            entries: List.of('Trainspotting', '28 Days Later')
        }))
    })
})