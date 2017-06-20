/* eslint-disable react/require-optimization, no-inline-comments */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Route, Switch } from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import Main from '~pages/topics/index.jsx'
import Article from '~pages/article/index.jsx'

import DevTools from '~devtools'
import Nav from '~components/nav.jsx'
// import ScrollToTop from '~components/global/ScrollToTop.jsx'

import 'nprogress/nprogress.css'
import 'toastr/build/toastr.min.css'
import 'assets/less/style.less'

@withRouter
export default class App extends Component {
    static propTypes = {
        location: PropTypes.shape({
            key: PropTypes.string,
            pathname: PropTypes.string.isRequired,
        })
    }
    render() {
        return (
            // <ScrollToTop>
            <div className="g-doc">
                <Nav location={this.props.location} />
                <CSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {/*<Switch key={this.props.location.pathname} location={this.props.location} >*/}
                    {/*使用上面一行, 可以使用动画, 但是将不能使用滚动条记录, 开启下面一行则反之*/}
                    <Switch>
                        <Route name="index" path="/" exact component={Main} />
                        <Route name="article" path="/article/:id" component={Article} />
                    </Switch>
                </CSSTransitionGroup>
                <DevTools />
            </div>
            // </ScrollToTop>
        )
    }
}
