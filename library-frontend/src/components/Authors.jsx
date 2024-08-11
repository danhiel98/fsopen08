import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../queries/authors"
import BirthForm from "./BirthForm"
import { useLocalStorage } from "../hooks/useLocalStorage"

const Authors = () => {
  const result = useQuery(ALL_AUTHORS)
  const userData = useLocalStorage('library-user-data')

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        userData &&
        <BirthForm authors={authors} />
      }
    </div>
  )
}

export default Authors
