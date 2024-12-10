import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GlobalStyles } from './components/common/styles/globalStyles.js'
import { store } from './features/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>,
)
