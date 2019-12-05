import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import { Button } from 'antd'
import ls from 'store2'
import { propTypes } from '@/decorators'
import { getTopics } from '@/store/reducers/topics'
import MainItem from './item.jsx'

@connect(
    state => ({
        topics: state.topics.toJS()
    }),
    dispatch => ({ ...bindActionCreators({ getTopics }, dispatch), dispatch })
)
@immutableRenderDecorator
@propTypes({
    getTopics: PropTypes.func.isRequired,
    topics: PropTypes.object
})
class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            scrollTop: 0,
            loading: false
        }
        this.handleLoadMore = this.handleLoadMore.bind(this)
        this.onScroll = this.onScroll.bind(this)

        console.log('topic: constructor')
        const { pathname } = props.topics
        if (pathname !== props.location.pathname) this.handlefetchPosts()
    }
    componentDidMount() {
        console.log('topic: componentDidMount')
        const path = this.props.location.pathname
        const scrollTop = ls.get(path) || 0
        ls.remove(path)
        if (scrollTop) window.scrollTo(0, scrollTop)
        window.addEventListener('scroll', this.onScroll)
    }
    componentDidUpdate(prevProps) {
        const pathname = this.props.location.pathname
        const prevPathname = prevProps.location.pathname
        if (pathname !== prevPathname) {
            console.log('topic: componentDidUpdate', pathname, prevPathname)
            this.handlefetchPosts()
        }
    }
    componentWillUnmount() {
        console.log('topic: componentWillUnmount')
        window.removeEventListener('scroll', this.onScroll)
    }
    async handlefetchPosts(page = 1) {
        const {
            getTopics,
            location: { pathname }
        } = this.props
        this.setState({ loading: true })
        await getTopics({ page, pathname })
        this.setState({ loading: false })
    }
    handleLoadMore() {
        const { page } = this.props.topics
        this.handlefetchPosts(page + 1)
    }
    onScroll() {
        const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
        const path = this.props.location.pathname
        if (path && scrollTop) ls.set(path, scrollTop)
    }
    render() {
        const { data } = this.props.topics
        const lists = data.map(list => {
            return <MainItem key={list.id} list={list} />
        })
        return (
            <div>
                <div>{this.state.msg}</div>
                <ul>
                    {lists}
                    <li className="page">
                        <Button type="primary" loading={this.state.loading} onClick={this.handleLoadMore}>
                            加载下一页
                        </Button>
                    </li>
                </ul>
            </div>
        )
    }
}
export default Main
