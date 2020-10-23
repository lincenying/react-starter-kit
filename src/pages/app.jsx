/* eslint-disable react/require-optimization, no-inline-comments */
import DevTools from '@devtools'
// import ScrollToTop from '~/components/global/ScrollToTop.jsx'
import 'nprogress/nprogress.css'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import 'toastr/build/toastr.min.css'
import '~/assets/scss/style.scss'
import Nav from '~/components/nav.jsx'
import Article from '~/pages/article/index.jsx'
import Main from '~/pages/topics/index.jsx'

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
            <div className="main">
                <Nav location={this.props.location} />
                <TransitionGroup appear>
                    <CSSTransition classNames="example" in={false} key={this.props.location.key} timeout={{ appear: 300, enter: 300, exit: 300 }}>
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
