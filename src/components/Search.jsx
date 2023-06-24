import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className="position-relative mt-2 mb-3">
      <BiSearch className="position-absolute top-50 ms-2 translate-middle-y" />
      <input
        className="ps-5"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search by name..."
      />
    </div>
  );
};

export default Search;
