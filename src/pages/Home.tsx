import { Button } from '../components/ui/Button'

export const HomePage = () =>
	<article>
		<header className="marble">
			<h1>AEGEAN</h1>
		</header>
		<div className="container">
			<div>
				<h2 className="meander"><span>Characters</span></h2>
				<p>Create a new character and view existing ones.</p>
				<a href="/characters/" className="btn block">Characters</a>

				<Button onClick={() => console.log('Button click')}>From the Button</Button>
				<Button block disabled onClick={() => console.log('Button click')}>From the Button</Button>
			</div>
		</div>
	</article>
