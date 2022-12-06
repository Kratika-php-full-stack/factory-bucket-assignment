import { defineStore } from "pinia";
import axios from "axios";
import { take as _take } from "lodash";

export const useSearchBooks = defineStore({
  id: "searchBooks",
  state: () => ({
    searchString: "",
    booksData: [],
  }),
  getters: {
    // This getter is used to show list book titles on list page
    getBooksTitles: (state) => {
      let bookTitles = [];
      bookTitles = state.booksData?.map((item) => {
        return item.title;
      });
      return bookTitles;
    },
  },
  actions: {
    // This method is used to fetch data from the open book library on the basis of book title
    async getBooksList() {
      const url = `https://openlibrary.org/search.json?title=${this.searchString}`;
      try {
        // using axios to fetch data
        const data = await axios.get(url);
        if (data.data.numFound > 0) {
          // using take method from lodash to get top 10 records from whole data return from API
          this.booksData = _take(data.data.docs, 10);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
