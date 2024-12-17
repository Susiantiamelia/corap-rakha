import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCountries = createAsyncThunk(
  "compare/fetchCountries",
  async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }
    const data = await response.json();
    return data.map((country) => ({
      name: country.name.common,
      code: country.cca3,
      population: country.population,
      area: country.area,
      capital: country.capital ? country.capital[0] : "N/A",
      region: country.region,
      subregion: country.subregion,
      languages: country.languages ? Object.values(country.languages).join(", ") : "N/A",
    }));
  }
);

const compareSlice = createSlice({
  name: "compare",
  initialState: {
    countries: [],
    top10Countries: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
        state.top10Countries = action.payload
          .sort((a, b) => b.population - a.population)
          .slice(0, 10);
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default compareSlice.reducer;
