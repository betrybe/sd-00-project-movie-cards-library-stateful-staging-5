import React from 'react';

import PropTypes from 'prop-types';

class AddMovie extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    };
  }

  handleChange({ target }) {
    const { name, type, value, checked } = target;
    const newValue = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: newValue,
    });
  }

  onClickAddMovie() {
    const { onClick } = this.props;
    onClick(this.state);

    this.setState({
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    });
  }

  InputTitleComponent(title, onChangeTitle) {
    return (
      <label data-testid="title-input-label" htmlFor="title">
        Título
        <input
          name="title"
          type="text"
          data-testid="title-input"
          value={ title }
          onChange={ onChangeTitle }
        />
      </label>
    );
  }

  InputSubtitleComponent(subtitle, onChangeSubtitle) {
    return (
      <label data-testid="subtitle-input-label" htmlFor="subtitle">
        Subtítulo
        <input
          name="subtitle"
          type="text"
          data-testid="subtitle-input"
          value={ subtitle }
          onChange={ onChangeSubtitle }
        />
      </label>
    );
  }

  InputImagePathComponent(imagePath, onImagePathChange) {
    return (
      <label data-testid="image-input-label" htmlFor="imagePath">
        Imagem
        <input
          name="imagePath"
          type="text"
          data-testid="image-input"
          value={ imagePath }
          onChange={ onImagePathChange }
        />
      </label>
    );
  }

  TextareaSinopseComponent(storyline, onChangeStoryline) {
    return (
      <label data-testid="storyline-input-label" htmlFor="storyline">
        Sinopse
        <textarea
          name="storyline"
          type="text"
          data-testid="storyline-input"
          value={ storyline }
          onChange={ onChangeStoryline }
        />
      </label>
    );
  }

  InputRatingComponent(rating, onChangeRating) {
    return (
      <label data-testid="rating-input-label" htmlFor="rating">
        Avaliação
        <input
          name="rating"
          type="number"
          data-testid="rating-input"
          value={ rating }
          onChange={ onChangeRating }
        />
      </label>
    );
  }

  SelectGenreComponent(genre, onChangeGenre) {
    return (
      <label data-testid="genre-input-label" htmlFor="genre">
        Gênero
        <select
          name="genre"
          data-testid="genre-input"
          value={ genre }
          onChange={ onChangeGenre }
        >
          <option data-testid="genre-option" value="action">Ação</option>
          <option data-testid="genre-option" value="comedy">Comédia</option>
          <option data-testid="genre-option" value="thriller">Suspense</option>
        </select>
      </label>
    );
  }

  ButtonAddMovieComponent(onClick) {
    return (
      <button
        type="button"
        onClick={ onClick }
        data-testid="send-button"
      >
        Adicionar filme
      </button>
    );
  }

  render() {
    const { title, subtitle, imagePath, storyline, rating, genre } = this.state;

    return (
      <form data-testid="add-movie-form">
        {this.InputTitleComponent(title, this.handleChange)}
        {this.InputSubtitleComponent(subtitle, this.handleChange)}
        {this.InputImagePathComponent(imagePath, this.handleChange)}
        {this.TextareaSinopseComponent(storyline, this.handleChange)}
        {this.InputRatingComponent(rating, this.handleChange)}
        {this.SelectGenreComponent(genre, this.handleChange)}
        {this.ButtonAddMovieComponent(() => this.onClickAddMovie())}

      </form>
    );
  }
}

AddMovie.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddMovie;
