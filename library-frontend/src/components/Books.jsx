import { useLazyQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries/books"
import { useEffect, useState } from "react"
import BookList from "./BookList"

const Books = () => {
  const [getBooks] = useLazyQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('all')
  const [genres, setGenres] = useState([])
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  const filterBooks = () => {
    const filterGenre = genre === 'all' ? '' : genre
    setLoading(true)
    getBooks({ variables: { genre: filterGenre } })
      .then(res => {
        const result = res.data.allBooks
        setBooks(result)
      }).finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getBooks('all').then((res) => {
      const result = res.data.allBooks
      const genres = result.map(b => b.genres).flat()
      const genresList = genres
        .filter((item, index) => genres.indexOf(item) === index)
        .sort()
      setGenres(genresList)


    })
  }, [])

  useEffect(() => {
    if (genre) {
      filterBooks()
    }
  }, [genre])

  if (loading) return (<>loading...</>)

  return (
    <div>
      <h2>Books</h2>

      <p>in genre <strong>{genre}</strong></p>
      <div>
        {genres.map(g => (
          <button key={g} onClick={() => setGenre(g)}>{g}</button>
        ))}
        <button onClick={() => setGenre('all')}>all genres</button>
      </div>

      <BookList list={books} />
    </div>
  )
}

export default Books
