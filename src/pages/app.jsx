import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Link from 'react-router/lib/Link'

import DevTools from '~devtools'
import Toastr from '~components/global/toastr.jsx'

import 'nprogress/nprogress.css'
import 'toastr/build/toastr.min.css'

export default props => {
    return (
        <div className="g-doc">
            <h1><Link to="/">列表1a</Link></h1>
            <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                {React.cloneElement(props.children, {
                    key: props.location.pathname
                })}
            </ReactCSSTransitionGroup>
            <DevTools />
            <Toastr />
        </div>
    )
}
