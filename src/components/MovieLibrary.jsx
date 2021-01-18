import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import AddMovie from './AddMovie';

class MovieLibrary extends Component {
  constructor(props) {
    super(props);

    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onBookmarkedChange = this.onBookmarkedChange.bind(this);
    this.onSelectedGenreChange = this.onSelectedGenreChange.bind(this);
    this.moviesFilter = this.moviesFilter.bind(this);
    this.handleClickAddMovie = this.handleClickAddMovie.bind(this);

    const { movies } = this.props;

    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies,
    };
  }

  onSearchTextChange({ target }) {
    this.setState({ searchText: target.value });
  }

  onBookmarkedChange({ target }) {
    this.setState({ bookmarkedOnly: target.checked });
  }

  onSelectedGenreChange({ target }) {
    this.setState({ selectedGenre: target.value });
  }

  moviesFilter({ movies, searchText, bookmarkedOnly, selectedGenre }) {
    return movies
      .filter((movie) => selectedGenre === '' || movie.genre === selectedGenre)
      .filter((movie) => (bookmarkedOnly ? movie.bookmarked : movie))
      .filter((movie) => {
        const text = `${movie.title} ${movie.subtitle} ${movie.storyline}`;
        return text.toLowerCase().includes(searchText.toLowerCase());
      });
  }

  handleClickAddMovie(movie) {
    this.setState(({ movies }) => ({ movies: [...movies, movie] }));
  }

  render() {
    const { bookmarkedOnly, searchText, selectedGenre } = this.state;
    return (
      <div>
        <SearchBar
          searchText={searchText}
          onSearchTextChange={this.onSearchTextChange}
          bookmarkedOnly={bookmarkedOnly}
          onBookmarkedChange={this.onBookmarkedChange}
          selectedGenre={selectedGenre}
          onSelectedGenreChange={this.onSelectedGenreChange}
        />

        <MovieList movies={this.moviesFilter(this.state)} />

        <AddMovie onClick={this.handleClickAddMovie} />
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      storyline: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      imagePath: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default MovieLibrary;
