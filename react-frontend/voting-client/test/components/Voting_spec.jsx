import React from 'react'
import ReactDOM from 'react-dom'
import { 
    renderIntoDocument, 
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react-addons-test-utils'
import {expect} from 'chai'
import {List} from 'immutable'

import Voting from '../../src/components/Voting'

describe('Voting', () => {
    it('Renders pair of buttons', () => {
        const component = renderIntoDocument(
            <Voting pair={['Trainspotting', '28 Days Later']} />
        )
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button')

        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal('Trainspotting');
        expect(buttons[1].textContent).to.equal('28 Days Later');
    })

    it('Invoke callback on click', () => {
        let votedWith;
        const vote = (entry) => votedWith = entry

        const component = renderIntoDocument(
            <Voting pair={['Trainspotting', '28 Days Later']} vote={vote}/>
        )
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button')

        Simulate.click(buttons[0])

        expect(votedWith).to.equal('Trainspotting')
    })

    it('Disable buttons if voted', () => {
        const component = renderIntoDocument(
            <Voting pair={['Trainspotting', '28 Days Later']} hasVoted="Trainspotting"/>
        )
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button')

        expect(buttons.length).to.equal(2);
        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(buttons[1].hasAttribute('disabled')).to.equal(true);
    })

    it('Voted label on needed button', () => {
        const component = renderIntoDocument(
            <Voting pair={['Trainspotting', '28 Days Later']} hasVoted="Trainspotting"/>
        )
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button')

        expect(buttons[0].textContent).to.contain('Voted')
        expect(buttons[1].textContent).to.not.contain('Voted')
    })

    it('No buttons when has winner', () => {
        const component = renderIntoDocument(
            <Voting pair={['Trainspotting', '28 Days Later']} winner="Trainspotting"/>
        )

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button')
        expect(buttons.length).to.equal(0)

        const winner = ReactDOM.findDOMNode(component.refs.winner)
        expect(winner).to.be.ok
        expect(winner.textContent).to.contain('Trainspotting')
    })

    it('Draw as pure component', () => {
        const pair = ['Trainspotting', '28 Days Later']
        const container = document.createElement('div')

        let component = ReactDOM.render(
            <Voting pair={pair}/>,
            container
        )
        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0]
        expect(firstButton.textContent).to.contain('Trainspotting')

        pair[0] = 'Sunshine'

        component = ReactDOM.render(
            <Voting pair={pair}/>,
            container
        )        
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0]
        expect(firstButton.textContent).to.contain('Trainspotting')
    })

    it('Update component when property changed', () => {
        const pair = List.of('Trainspotting', '28 Days Later')
        const container = document.createElement('div')

        let component = ReactDOM.render(
            <Voting pair={pair}/>,
            container
        )
        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0]
        expect(firstButton.textContent).to.contain('Trainspotting')

        const newPair = pair.set(0, 'Sunshine')

        component = ReactDOM.render(
            <Voting pair={newPair}/>,
            container
        )        
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0]
        expect(firstButton.textContent).to.contain('Sunshine')
    })
})