export const errConfig = {
    type: 'setMessage',
    message: {
        type: 'error',
        content: 'api 接口错误'
    }
}

export function setMessage(message) {
    return {
        type: 'setMessage',
        message
    }
}
