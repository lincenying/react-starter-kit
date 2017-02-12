import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const initStates = fromJS({
    message: {
        type: '',
        content: '',
        title: ''
    }
})
export default createReducer(initStates, {
    ['setMessage']: (state, action) => {
        let message = action.message
        if (typeof message === 'string') {
            message = {
                type: 'success',
                title: '',
                content: message
            }
        }
        return state.merge({
            message
        })
    }
})
