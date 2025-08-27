import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router";
import { router } from '~/modules/routes/routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />,
	</StrictMode>,
);
