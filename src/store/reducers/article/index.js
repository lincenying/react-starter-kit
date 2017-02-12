import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const initStates = fromJS({
    article: {
        data: {},
        pathname: ''
    }
})

export default createReducer(initStates, {
    ['receiveArticle']: (state, action) => {
        const {data, pathname} = action
        return state.merge({
            article: {
                data,
                pathname
            }
        })
    }
})
