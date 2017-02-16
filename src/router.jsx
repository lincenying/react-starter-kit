import React from 'react'
import browserHistory from 'react-router/lib/browserHistory'
import IndexRoute from 'react-router/lib/IndexRoute'
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'
import ls from 'store2'

import NotFound from '~pages/404.jsx'
import App from '~pages/app.jsx'
import Main from '~pages/topics/index.jsx'
import Article from '~pages/article/index.jsx'

const savePosition = router => {
    const scrollTop = document.body.scrollTop
    const path = router.location.pathname
    if (path) {
        if (scrollTop) ls.set(path, scrollTop)
        if (ls.get(path) && !scrollTop) ls.remove(path)
    }
}
const goScrollTop = () => {
    //window.scrollTo(0, 0)
}

export default ({store}) => {
    const history = syncHistoryWithStore(browserHistory, store)
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route name="index" needLogin="0" path="/" component={App}>
                    <IndexRoute component={Main} onLeave={savePosition} />
                    <Route name="article" path="/article/:id" component={Article} onEnter={goScrollTop} />
                </Route>
                <Route component={NotFound} path="*" />
            </Router>
        </Provider>
    )
}
