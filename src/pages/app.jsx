import React from 'react'
import Router from 'react-router-dom/BrowserRouter'
import Route from 'react-router-dom/Route'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Main from '~pages/topics/index.jsx'
import Article from '~pages/article/index.jsx'

import DevTools from '~devtools'
import Toastr from '~components/global/toastr.jsx'
import Nav from '~components/nav.jsx'

import 'nprogress/nprogress.css'
import 'toastr/build/toastr.min.css'
import 'assets/less/style.less'

const App = () => {
    return (
        <Router>
            <Route render={({ location, history }) =>
                <div className="g-doc">
                    <Nav location={location} history={history} />
                    <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                        <Route name="index" path="/" exact component={Main} />
                        <Route name="article" path="/article/:id" component={Article} />
                    </ReactCSSTransitionGroup>
                    <DevTools />
                    <Toastr />
                </div>
            }
            />
        </Router>
    )
}
export default App
