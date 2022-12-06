<template>
  <h3>List of Book Titles</h3>
  <div v-if="!searchBooksStore.getBooksTitles.length" class="no-data-container">
    <div class="message-div"><h3>No Titles found</h3></div>
  </div>
  <div v-else class="table-container">
    <table class="table-list">
      <tr>
        <th>Top 10 Titles with title "{{ searchBooksStore.searchString }}"</th>
      </tr>
      <tr
        v-for="(title, index) in searchBooksStore.getBooksTitles"
        :key="index"
      >
        <td>{{ title }}</td>
      </tr>
    </table>
  </div>
</template>
<script setup>
import { useSearchBooks } from "@/stores/searchBooks";
const searchBooksStore = useSearchBooks();
</script>
<style scopped>
.table-container {
  display: flex;
  justify-content: center;
}
.table-list {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 70%;
  align-self: center;
}

.table-list td,
.table-list th {
  border: 1px solid #ddd;
  padding: 8px;
}

.table-list tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table-list tr:hover {
  background-color: #ddd;
}

.table-list th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}

h3 {
  text-align: center;
}
.no-data-container {
  width: 100%;
  text-align: center;
}

.message-div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  margin: 10px;
  width: 50%;
  display: inline-block;
}
</style>
