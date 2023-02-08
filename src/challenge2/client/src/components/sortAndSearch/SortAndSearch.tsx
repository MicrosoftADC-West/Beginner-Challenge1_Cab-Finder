import "./SortAndSearch.css";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Select from "react-select";

export default function SortAndSearch({
  state,
  setState,
  searchKey,
  sortByOptions,
  sortFunction,
  initialState,
}: {
  sortByOptions: { value: string; label: string }[];
  sortFunction: any;
  state: any;
  setState: any;
  searchKey: string;
  initialState: any;
}) {
  const [searchedItem, setSearchedItem] = useState<string>("");
  const handleUpdateStateBasedOnSearch = (searchTerm: string) => {
    if (searchTerm) {
      console.log(searchTerm);
      const filteredStates = state.filter(
        (stateItem: any) => stateItem[searchKey] === parseInt(searchTerm)
      );

      setState(filteredStates);
    } else {
      setState(initialState);
    }
  };

  useEffect(() => {
    handleUpdateStateBasedOnSearch(searchedItem);
  }, [searchedItem]);

  return (
    <div className="table-sort-and-search">
      <div className="table-search">
        <FiSearch style={{ color: "#a3a3a3" }} />
        <input
          type="number"
          value={searchedItem}
          onChange={(e) => setSearchedItem(e.target.value)}
          placeholder="Search by Id"
        />
      </div>
      <div className="table-sort">
        Filter By
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={sortByOptions[0]}
          name="color"
          options={sortByOptions}
          onChange={sortFunction}
        />
      </div>
    </div>
  );
}
