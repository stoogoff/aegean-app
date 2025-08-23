import React from 'react'
import ReactDOM from 'react-dom/client'

interface Props {
	id: string;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<h1 className="bg-red-400 test">
			HELLO
		</h1>
	</React.StrictMode>,
);
