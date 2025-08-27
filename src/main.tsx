import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router";
import { router } from '~/routes';
import { AuthProvider } from '~/modules/auth/context'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</StrictMode>,
);
