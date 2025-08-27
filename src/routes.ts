
import { createBrowserRouter } from 'react-router'
import { HomePage } from '~/pages/Home'
import { CharacterList } from '~/modules/characters/components/List'
import { CharacterCreate } from '~/modules/characters/components/Create'

export const router = createBrowserRouter([
	{ index: true, Component: HomePage },
	{
		Component: CharacterList,
		path: '/characters',
	},
	{
		Component: CharacterCreate,
		path: '/characters/new',
	},
])
