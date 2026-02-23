import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ConfigProvider} from 'antd';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#B57B2F',
                    borderRadius: 16,
                    borderRadiusLG: 20,
                    borderRadiusSM: 12,
                },
                components: {
                    Input: { activeBorderColor: '#B57B2F', hoverBorderColor: '#c99b4d' },
                    Select: { optionSelectedBg: '#e8dfc8' },
                },
            }}
        >
            <App/>
        </ConfigProvider>
    </StrictMode>,
)
