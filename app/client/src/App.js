import './App.scss';
import { BrowserRouter } from 'react-router-dom';

import Bookmark from './components/bookmark/Bookmark';

import Routes from './config/Routes';
import Header from './components/header/Header'
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div name='pseudo-body' style={{ position: 'relative', paddingBottom: '5rem', minHeight: '100vh' }}>
          <Header />
          <Routes></Routes>
          <Footer />
        </div>
      </BrowserRouter>

      <Bookmark movieId='1211' category='movie' onClick={() => console.log('click')}/>
    </div>
  )
}

export default App;