import './App.scss';
import { BrowserRouter} from 'react-router-dom';

import Routes from './config/Routes';
import tmdbAPI from './api/tmdbAPI'
import Header from './components/header/Header'
import Footer from './components/footer/Footer';

const App = (props) => {
  const handler = async () => {

    const params = {}
    tmdbAPI.getMoviesList('popular', params).then(res => console.log(res))

  }

  return (
    <div className="App">

      <BrowserRouter>
        
        <div name='pseudo-body' style={{position: 'relative', paddingBottom: '5rem', minHeight: '100vh'}}>
          <Header />
          <Routes></Routes>
          <Footer />
        </div>
        
        
      </BrowserRouter>
    </div>
  )
}

export default App;
