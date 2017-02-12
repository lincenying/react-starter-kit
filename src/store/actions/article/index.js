import api from '~api'
import { errConfig } from '~actions/global'

export function getArticle(config) {
    return async dispatch => {
        const { data: { data, success }} = await api.get('https://cnodejs.org/api/v1/topic/' + config.id)
        if (success === true) {
            return dispatch({
                type: 'receiveArticle',
                data,
                ...config
            })
        }
        return dispatch(errConfig)
    }
}
