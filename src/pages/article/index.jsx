import { Avatar, Card, List, Spin } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { propTypes } from '~/decorators'
import { getArticle } from '~/store/reducers/article'

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
        const { pathname, data } = this.props.article
        return (
            <Spin spinning={pathname !== this.props.location.pathname} delay={100} size="large">
                <Card title={data.title} bordered={false}>
                    <div className="article-content" dangerouslySetInnerHTML={{ __html: data.content }} />
                </Card>
                <div className="reply">
                    <List
                        itemLayout="horizontal"
                        dataSource={data.replies}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.author.avatar_url} />}
                                    title={<a href="https://ant.design">{item.author.loginname}</a>}
                                    description={
                                        <div
                                            className="reply-item-content"
                                            dangerouslySetInnerHTML={{
                                                __html: item.content
                                            }}
                                        />
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </Spin>
        )
    }
}
export default Article
