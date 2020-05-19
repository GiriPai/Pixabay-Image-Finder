import React, { useState, useEffect } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";

import ImageResults from "../image-results/ImageResults";

const Search = () => {
  const [state, setState] = useState({
    searchText: "",
    amount: 15,
    apiUrl: process.env.REACT_APP_API_URL,
    apiKey: process.env.REACT_APP_API_KEY,
    images: [],
  });

  useEffect(() => {
    fetchImages();
  }, [state.searchText, state.amount]);

  const fetchImages = async () => {
    const results = await axios.get(
      `${state.apiUrl}/?key=${state.apiKey}&q=${state.searchText}&image_type=photo&per_page=${state.amount}&safesearch=false`
    );

    setState({ ...state, images: results.data.hits });
  };

  const onTextChange = (e) => {
    setState({ ...state, searchText: e.target.value });
  };

  const onAmountChange = (e, index, value) => {
    setState({ ...state, amount: value });
  };

  return (
    <div>
      <TextField
        name="searchText"
        value={state.searchText}
        onChange={onTextChange}
        floatingLabelText="Search For Images"
        fullWidth={true}
      />
      <br />
      <SelectField
        name="amount"
        floatingLabelText="Amount"
        value={state.amount}
        onChange={onAmountChange}
      >
        <MenuItem value={5} primaryText="5" />
        <MenuItem value={10} primaryText="10" />
        <MenuItem value={15} primaryText="15" />
        <MenuItem value={30} primaryText="30" />
        <MenuItem value={50} primaryText="50" />
      </SelectField>
      <br />
      {state.images.length > 0 ? <ImageResults images={state.images} /> : null}
    </div>
  );
};

export default Search;
