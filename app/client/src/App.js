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

    </div>
  )
}

export default App;
