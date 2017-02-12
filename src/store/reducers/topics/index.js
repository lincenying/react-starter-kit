import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const initStates = fromJS({
    lists: {
        data: [],
        hasNext: 0,
        page: 1,
        path: ''
    }
})

export default createReducer(initStates, {
    ['receiveTopics']: (state, action) => {
        const {data, page, pathname} = action
        const lists = page === 1 ? [].concat(data) : state.get('lists').toJS().data.concat(data)
        return state.merge({
            lists: {
                data: lists,
                page,
                pathname
            }
        })
    }
})
