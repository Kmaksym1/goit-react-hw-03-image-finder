import { Component } from "react";
import { Formik, Form } from "formik";
import SearchIcon from "@mui/icons-material/Search";
import * as yup from "yup";
import css from "../searchBar/searchBar.module.css";

const schema = yup.object().shape({
  input: yup.string().required(),
});

export class SearchBar extends Component {
  state = {
    input: "",
  };
  handleInput = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.input.trim() !== "") this.props.onInput(this.state.input);
  };

  initialValues = { input: "" };
  render() {
    return (
      <Formik
        initialValues={this.initialValues}
        onSubmit={this.handleSubmit}
        validationSchema={schema}
      >
        <Form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button className={css.button} type="submit">
            <div className={css.searchIcon}>
              <SearchIcon />
            </div>
          </button>
          <input
            onInput={this.handleInput}
            className={css.searchInput}
            type="text"
            name="input"
            autoComplete="off"
            placeholder="Search images and photos"
            value={this.state.input}
          />
        </Form>
      </Formik>
    );
  }
}
