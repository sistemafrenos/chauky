import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Theme } from '@radix-ui/themes'
import "@radix-ui/themes/styles.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Theme accentColor="jade" grayColor="sage" panelBackground="solid" scaling="95%" appearance='dark'>
			<QueryClientProvider client={queryClient}>
			  <App />
			</QueryClientProvider>
		</Theme>
	</StrictMode>,
)
