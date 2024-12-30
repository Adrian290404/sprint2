import { createRoot } from 'react-dom/client';
import App from './App';
import { GlobalStyles } from "./components/common/styles/globalStyles.js";
import { store } from './features/store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error("Root element not found");
}

createRoot(rootElement).render(
    <Provider store={store}>
        <GlobalStyles />
        <App />
    </Provider>,
);