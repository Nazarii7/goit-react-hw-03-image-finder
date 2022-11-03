import React, { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleNameChange = event => {
    this.setState({ query: event.target.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      toast('Будь ласка, напишіть Ваш запит', {
        icon: '⏳',
      });
      return;
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
    this.reset();
  };

  reset = () => {
    this.setState(this.state.query);
  };

  render() {
    const { query } = this.state;
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm}>
          <button className={css.Button} type="submit">
            <ImSearch />
          </button>

          <input
            className={css.Input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleNameChange}
            value={query}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
