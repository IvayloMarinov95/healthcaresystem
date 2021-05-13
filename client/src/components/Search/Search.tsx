import React from "react";
import { Button, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import styles from "./Search.module.scss";

interface Props {
  input: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<Props> = ({ input, handleChange }) => (
  <>
    <div className={styles.search}>
      <Form.Control
        type="text"
        placeholder="Search..."
        value={input}
        onChange={handleChange}
      />
      <Button
        variant="primary"
        onClick={() => handleChange}
        className={styles.btn}
      >
        <FaSearch />
      </Button>
    </div>
  </>
);

export default Search;
