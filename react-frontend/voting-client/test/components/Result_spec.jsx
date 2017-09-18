import React from 'react'
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils'
import { List, Map } from 'immutable'
import { expect } from 'chai'

import Results from '../../src/components/Result'

describe('Results', () => {

    it('Renders entries with vote count or zero', () => {
        const pair = List.of('Trainspotting', '28 Days Later')
        const tally = Map({'Trainspotting': 5})
        const component = renderIntoDocument(
            <Results pair={pair} tally={tally} />
        )
        const entiries = scryRenderedDOMComponentsWithClass(component, 'entry')

        const [train, days] = entiries.map(e => e.textContent)

        expect(entiries.length).to.equal(2)
        
        expect(train).to.contain('Trainspotting')
        expect(train).to.contain('5')

        expect(days).to.contain('28 Days Later')
        expect(days).to.contain('0')
    })
})