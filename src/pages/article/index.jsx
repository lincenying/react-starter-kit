import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'

import {propTypes} from '~decorators'
import {getArticle} from '~actions/article'

function mapStateToProps(state) {
    return {
        article: state.article.toJS().article
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getArticle}, dispatch)
}

@connect(mapStateToProps, mapDispatchToProps)
@propTypes({
    article: PropTypes.object,
    getArticle: PropTypes.func.isRequired
})
@immutableRenderDecorator
export default class Article extends Component {
    componentWillMount() {
        console.log(31)
        const {pathname} = this.props.article
        if (pathname !== this.props.location.pathname) this.handlegetArticle()
    }
    componentDidUpdate(prevProps) {
        console.log(32)
        const pathname = this.props.location.pathname
        const prevPathname = prevProps.location.pathname
        if (pathname !== prevPathname) this.handlegetArticle()
    }
    handlegetArticle() {
        const {getArticle, params: {id}, location: {pathname}} = this.props
        getArticle({id, pathname})
    }
    render() {
        const {data} = this.props.article
        return (
            <div>
                <p>dddddddddddbbbbbbbbbdddddddd</p>
                <div dangerouslySetInnerHTML={{__html: data.content}} />
            </div>
        )
    }
}
