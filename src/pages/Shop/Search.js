import React, { useState } from "react";

function Search({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch(inputValue);
      setInputValue("");
    }
  };
  return (
    <div className="col-lg-4">
      <input
        type="text"
        placeholder="Enter Search Here!"
        onChange={handleInputChange}
        value={inputValue}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Search;
