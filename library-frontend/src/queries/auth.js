import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username,
      favoriteGenre,
      token
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      id
      favoriteGenre
    }
  }
`