
import { Link } from 'react-router'

export const HomePage = () => (
	<article>
		<header className="marble">
			<h1>AEGEAN</h1>
		</header>
		<div className="container">
			<div>
				<h2 className="meander"><span>Characters</span></h2>
				<p>Create a new character and view existing ones.</p>
				<Link to="/characters" className="btn block">Characters</Link>
			</div>
		</div>
	</article>
)
