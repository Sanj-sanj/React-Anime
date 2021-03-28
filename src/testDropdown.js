import React, { useState } from "react";

export default function sortDropdown(tag, label, defaultState, options) {
  //   console.log(tag, label, defaultState, options);
  const [state, setState] = useState(defaultState);
  const Dropdown = () => (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor={`sort-${tag}`}>
          {label}:
        </label>
      </div>
      <select
        className="custom-select"
        name="sort-by"
        id={`sort-${tag}`}
        onChange={(e) => setState(e.target.value)}
        onBlur={(e) => setState(e.target.value)}
        value={state}
      >
        {options.map((value) => {
          return (
            <option value={value.toLowerCase()} key={value.toLowerCase()}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
  return [state, Dropdown, setState];
}
