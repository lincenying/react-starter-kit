/* eslint-disable react/require-optimization, no-inline-comments */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Route, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Main from '@/pages/topics/index.jsx'
import Article from '@/pages/article/index.jsx'

import DevTools from '@devtools'
import Nav from '@/components/nav.jsx'
// import ScrollToTop from '@/components/global/ScrollToTop.jsx'

import 'nprogress/nprogress.css'
import 'toastr/build/toastr.min.css'
import '@/assets/less/style.less'

@withRouter
class App extends Component {
    static propTypes = {
        location: PropTypes.shape({
            key: PropTypes.string,
            pathname: PropTypes.string.isRequired
        })
    }
    render() {
        return (
            // <ScrollToTop>
            <div className="g-doc">
                <Nav location={this.props.location} />
                <TransitionGroup appear>
                    <CSSTransition classNames="example" in={false} key={this.props.location.key} timeout={{ appear: 3000, enter: 3000, exit: 300 }}>
                        <Switch key={this.props.location.pathname} location={this.props.location}>
                            <Route name="index" path="/" exact component={Main} />
                            <Route name="article" path="/article/:id" component={Article} />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <DevTools />
            </div>
            // </ScrollToTop>
        )
    }
}
export default App
