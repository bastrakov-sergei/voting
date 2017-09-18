import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { List, Map } from 'immutable'

import Voting from './Voting'
import Result from './Result'

const pair = List.of('Trainspotting', '28 Days Later')
const tally = Map({'Trainspotting': 5, '28 Days Later': 4})

export default class App extends React.PureComponent {
    render() {
        return  <Switch>
                    <Route exact path='/' render={() => <Voting pair={pair} />}/>
                    <Route path='/result' render={() => <Result pair={pair} tally={tally} />}/>
                </Switch>
    }
}