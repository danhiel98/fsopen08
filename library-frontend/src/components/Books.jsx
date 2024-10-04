import { useLazyQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries/books"
import { useEffect, useState } from "react"
import BookList from "./BookList"

const Books = () => {
  const [getBooks, { loading, error, data }] = useLazyQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('all')
  let allGenres = []

  const getGenres = (data) => {
    const genres = data.allBooks.map(b => b.genres).flat()
    return genres
      .filter((item, index) => genres.indexOf(item) === index)
      .sort()
  }

  const filterBooks = () => {
    const filterGenre = genre === 'all' ? '' : genre
    getBooks({ variables: { genre: filterGenre } })
  }

  useEffect(() => {
    if (genre) {
      filterBooks()
    }
  }, [genre])

  if (loading) return (<>loading...</>)
  if (error) return `Error! ${error}`

  if (data) {
    allGenres = getGenres(data)
  }

  return (
    <div>
      <h2>Books</h2>

      <p>in genre <strong>{genre}</strong></p>
      <div>
        {allGenres.map(g => (
          <button key={g} onClick={() => setGenre(g)}>{g}</button>
        ))}
        <button onClick={() => setGenre('all')}>all genres</button>
      </div>

      {
        data?.allBooks &&
        <BookList list={data.allBooks} />
      }
    </div>
  )
}

export default Books
