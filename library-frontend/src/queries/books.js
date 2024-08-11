import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query getBooks($author: String, $genre: String) {
    allBooks (
      author: $author,
      genre: $genre
    ) {
      title
      author {
        name
        born
        bookCount
      }
      published
      genres
      id
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`