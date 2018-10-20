import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'

import { propTypes } from '~decorators'
import { getArticle } from '~reducers/article'

function mapStateToProps(state) {
    return {
        article: state.article.toJS()
    }
}
function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({ getArticle }, dispatch)
    return { ...actions, dispatch }
}

@connect(
    mapStateToProps,
    mapDispatchToProps
)
@propTypes({
    article: PropTypes.object,
    getArticle: PropTypes.func.isRequired
})
@immutableRenderDecorator
class Article extends Component {
    UNSAFE_componentWillMount() {
        console.log('article: componentWillMount')
        const { pathname } = this.props.article
        if (pathname !== this.props.location.pathname) this.handlegetArticle()
    }
    componentDidMount() {
        console.log('article: componentDidMount')
        window.scrollTo(0, 0)
    }
    componentDidUpdate(prevProps) {
        const pathname = this.props.location.pathname
        const prevPathname = prevProps.location.pathname
        console.log('article: componentDidUpdate', pathname, prevPathname)
        if (pathname !== prevPathname) {
            this.handlegetArticle()
        }
    }
    handlegetArticle() {
        const {
            getArticle,
            match: {
                params: { id }
            },
            location: { pathname }
        } = this.props
        getArticle({ id, pathname })
    }
    render() {
        const { data } = this.props.article
        const rep_lists =
            data.replies &&
            data.replies.map(list => {
                return (
                    <li key={list.id}>
                        <span>{list.author.loginname}:</span>
                        <div dangerouslySetInnerHTML={{ __html: list.content }} />
                    </li>
                )
            })
        return (
            <div>
                <h3>{data.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: data.content }} />
                <h3>回帖: </h3>
                <ul>{rep_lists}</ul>
            </div>
        )
    }
}
export default Article
