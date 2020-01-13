import { configureCounterStore } from '@store'
import { Modal } from 'antd'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from './pages/app'

const store = configureCounterStore()

const getConfirmation = (message, callback) => {
    Modal.confirm({
        title: message,
        onCancel: () => {
            callback(false)
        },
        onOk: () => {
            callback(true)
        }
    })
}

render(
    <AppContainer>
        <Provider store={store}>
            <Router getUserConfirmation={getConfirmation}>
                <Root />
            </Router>
        </Provider>
    </AppContainer>,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept('./pages/app', () => {
        const RootContainer = require('./pages/app').default
        render(
            <AppContainer>
                <Provider store={store}>
                    <Router>
                        <RootContainer />
                    </Router>
                </Provider>
            </AppContainer>,
            document.getElementById('root')
        )
    })
}
