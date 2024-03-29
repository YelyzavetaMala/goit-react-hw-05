
import './App.css'
import { Suspense } from 'react';
import { BrowserRouter as BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';

function App() {
 

  return (
     <BrowserRouter>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/movies" component={MoviesPage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
