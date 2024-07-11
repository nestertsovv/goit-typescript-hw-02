import { Field, Form, Formik } from "formik";
import s from "./SearchBar.module.css";

const initialValues = { text: "" };

export const SearchBar = ({ onSubmit }) => {
  const formSubmit = (value, actions) => {
    onSubmit(value.text);
    actions.resetForm();
  };

  return (
    <header className={s.header}>
      <Formik initialValues={initialValues} onSubmit={formSubmit}>
        <Form className={s.form}>
          <Field
            type="search"
            name="text"
            placeholder="Search images and photos"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
};
