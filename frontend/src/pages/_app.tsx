import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CurrentTaskIdContextProvider, useCurrentTaskIdContext } from '../context';

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<ToastContainer />
			<CurrentTaskIdContextProvider>
				<Component {...pageProps} />;
			</CurrentTaskIdContextProvider>
		</QueryClientProvider>
	);
}
