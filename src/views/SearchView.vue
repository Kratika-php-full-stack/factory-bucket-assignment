<template>
  <div class="container">
    <h2>Search Books</h2>
    <form v-on:submit.prevent="searchBookHandler">
      <input
        class="search-text"
        type="text"
        placeholder="Enter Book Title"
        v-model="searchBooks.searchString"
        @input="handleKeyPressed"
      />
      <div class="err-meesage">{{ error }}</div>
      <button class="submit-button" @click="searchBookHandler">Submit</button>
    </form>
  </div>
  <div class="loader" v-if="isLoading"></div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useSearchBooks } from "@/stores/searchBooks";
const router = useRouter();

// isLoading is state to show and hide the loader
const isLoading = ref(false);
// isError is stae to show and hide error message
const isError = ref(false);

const searchBooks = useSearchBooks();

const error = computed(() => {
  return isError.value ? "  The Input field is required" : "";
});

//method called on key press of search input field
const handleKeyPressed = () => {
  isError.value = searchBooks.searchString.length === 0;
};

// function called on click of submit button and form submission on key press of enter
const searchBookHandler = async () => {
  if (!searchBooks.searchString) {
    isError.value = true;
    return;
  }
  isLoading.value = true;
  await searchBooks.getBooksList();
  isLoading.value = false;
  router.push({ name: "BookListView" });
};
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}
* {
  box-sizing: border-box;
}

.search-text {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

.submit-button {
  background-color: #04aa6d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  margin: 100px;
}

h2 {
  text-align: center;
}
.loader {
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgb(173 169 169 / 53%);
  z-index: 9999;
}

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.loader::after {
  content: "";
  display: block;
  position: absolute;
  left: 48%;
  top: 40%;
  width: 100px;
  height: 100px;
  border-style: solid;
  border-color: #04aa6d;
  border-top-color: transparent;
  border-width: 8px;
  border-radius: 50%;
  -webkit-animation: spin 0.8s linear infinite;
  animation: spin 0.8s linear infinite;
}
.err-meesage {
  padding: 5px;
  margin-bottom: 5px;
  color: #ba3939;
  font-weight: bold;
}
</style>
