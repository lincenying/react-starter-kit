import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'

import { propTypes } from '@/decorators'
import { getArticle } from '@/store/reducers/article'

@connect(
    state => ({
        article: state.article.toJS()
    }),
    dispatch => ({ ...bindActionCreators({ getArticle }, dispatch), dispatch })
)
@propTypes({
    article: PropTypes.object,
    getArticle: PropTypes.func.isRequired
})
@immutableRenderDecorator
class Article extends Component {
    constructor(props) {
        super(props)
        console.log('article: constructor')
        const { pathname } = props.article
        if (pathname !== props.location.pathname) this.handlegetArticle()
    }
    componentDidMount() {
        console.log('article: componentDidMount')
        window.scrollTo(0, 0)
    }
    componentDidUpdate(prevProps) {
        const pathname = this.props.location.pathname
        const prevPathname = prevProps.location.pathname
        if (pathname !== prevPathname) {
            console.log('article: componentDidUpdate', pathname, prevPathname)
            this.handlegetArticle()
        }
    }
    componentWillUnmount() {
        console.log('article: componentWillUnmount')
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
        return (
            <div>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: data.content }} />
                <div className="reply">
                    {data.replies &&
                        data.replies.map(sub_item => {
                            return (
                                <div key={sub_item.id} className="reply-item">
                                    <h5>
                                        {sub_item.author.loginname}: <span>[{data.create_at}]</span>
                                    </h5>
                                    <div
                                        className="reply-item-content"
                                        dangerouslySetInnerHTML={{
                                            __html: sub_item.content
                                        }}
                                    />
                                </div>
                            )
                        })}
                </div>
            </div>
        )
    }
}
export default Article
