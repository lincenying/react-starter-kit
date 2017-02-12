import api from '~api'
import { errConfig } from '~actions/global'

export function getTopics(config) {
    return async dispatch => {
        const { data: { data, success }} = await api.get('https://cnodejs.org/api/v1/topics', config)
        if (success === true) {
            return dispatch({
                type: 'receiveTopics',
                data,
                ...config
            })
        }
        return dispatch(errConfig)
    }
}
