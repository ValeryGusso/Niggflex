import { FC } from 'react'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import NiggflexRouter from './Components/Router'

const App: FC = () => {
	return (
		<div className="container">
			<Header />
			<div className="content">
				<NiggflexRouter />
			</div>
			<footer>
				<Footer />
			</footer>
		</div>
	)
}

export default App
