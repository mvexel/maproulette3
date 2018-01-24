import React, { Component } from 'react'
import { isEqual as _isEqual } from 'lodash'
import { MAPBOX_STREETS } from '../../services/VisibleLayer/LayerSources'
import ChallengeFilterSubnav from './ChallengeFilterSubnav/ChallengeFilterSubnav'
import MapPane from '../EnhancedMap/MapPane/MapPane'
import Sidebar from '../Sidebar/Sidebar'
import LocatorMap from '../LocatorMap/LocatorMap'
import ChallengeResultList from './ChallengeResultList/ChallengeResultList'
import WithChallenges from '../HOCs/WithChallenges/WithChallenges'
import WithStatus from '../HOCs/WithStatus/WithStatus'
import './ChallengePane.css'

// Setup child components with necessary HOCs
const ChallengeResults =
  WithStatus(WithChallenges(ChallengeResultList('challenges')))

/**
 * ChallengePane represents the top-level view when the user is browsing,
 * searching, and choosing a challenge to start working on. It includes
 * a ChallengeFilterSubnav that presents a subnav with filter and search
 * options, a ChallengeResultList (wrapped in a Sidebar) for presenting challenges
 * that match the current search and set of filters, and a LocatorMap for
 * finding challenges geographically.
 *
 * @see See [ChallengeFilterSubnav](#challengefiltersubnav)
 * @see See [ChallengeResultList](#challengeresultlist)
 * @see See [LocatorMap](#locatormap)
 *
 * @author [Neil Rotstan](https://github.com/nrotstan)
 */
export default class ChallengePane extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !_isEqual(this.props, nextProps) ||
           !_isEqual(this.state, nextState)
  }

  render() {
    return (
      <span>
        <ChallengeFilterSubnav {...this.props} />

        <div className="challenge-pane">
          <Sidebar className='challenge-pane__results' isActive={true}>
            <ChallengeResults {...this.props} />
          </Sidebar>

          <MapPane>
            <LocatorMap layerSourceName={MAPBOX_STREETS} {...this.props} />
          </MapPane>
        </div>
      </span>
    )
  }
}
