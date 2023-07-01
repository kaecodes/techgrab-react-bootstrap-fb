import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className="position-relative my-auto">
      <BiSearch className="position-absolute top-50 ms-2 translate-middle-y" />
      <input
        className="ps-4 w-100"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search by name..."
      />
    </div>
  );
};

export default Search;
