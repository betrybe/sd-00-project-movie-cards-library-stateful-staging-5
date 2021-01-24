import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import AddMovie from './AddMovie';

class MovieLibrary extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.addMovie = this.addMovie.bind(this);

    const { movies } = this.props;

    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies,
    };
  }

  handleChange({ target }) {
    const { name, type, value, checked } = target;
    const newValue = type === 'checkbox' ? checked : value;

    this.setState({
      [name]: newValue,
    }, () => this.onFilter(name));
  }

  onFilter(typeFilter) {
    const { movies } = this.props;

    let moviesFiltered = [];

    switch (typeFilter) {
    case 'searchText':
      moviesFiltered = this.filterByText(movies);
      break;
    case 'bookmarkedOnly':
      moviesFiltered = this.filterBookmarked(movies);
      break;
    default:
      moviesFiltered = this.filterGenre(movies);
    }

    this.setState({ movies: moviesFiltered });
  }

  filterByText(movies) {
    const { searchText } = this.state;
    const moviesFiltered = movies.filter(
      ({ title, subtitle, storyline }) => (title.includes(searchText)
      || subtitle.includes(searchText)
      || storyline.includes(searchText)),
    );
    return moviesFiltered;
  }

  filterBookmarked(movies) {
    const { bookmarkedOnly } = this.state;
    const moviesFiltered = bookmarkedOnly
      ? movies.filter(({ bookmarked }) => bookmarked === true) : movies;

    return moviesFiltered;
  }

  filterGenre(movies) {
    const { selectedGenre } = this.state;

    const moviesFiltered = selectedGenre
      ? movies.filter(({ genre }) => genre === selectedGenre) : movies;

    return moviesFiltered;
  }

  addMovie(movie) {
    this.setState((state) => {
      state.movies.push(movie);
      return { movies: state.movies };
    });
  }

  render() {
    const { searchText, bookmarkedOnly, selectedGenre, movies } = this.state;

    return (
      <>
        <SearchBar
          searchText={ searchText }
          onSearchTextChange={ this.handleChange }
          bookmarkedOnly={ bookmarkedOnly }
          onBookmarkedChange={ this.handleChange }
          selectedGenre={ selectedGenre }
          onSelectedGenreChange={ this.handleChange }
        />
        <MovieList movies={ movies } />
        <AddMovie onClick={ this.addMovie } />
      </>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    subtitle: PropTypes.string,
    title: PropTypes.string,
    imagePath: PropTypes.string,
    storyline: PropTypes.string,
    rating: PropTypes.number,
    genre: PropTypes.string,
  }).isRequired).isRequired,
};

export default MovieLibrary;
