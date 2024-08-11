import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOKS, CREATE_BOOK } from '../queries/books'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const NewBook = ({ token }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/books')
    }
  }, [token, navigate])

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      console.log(error)
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
    },
    update: (cache, response) => {
      const newBook = response.data.addBook

      cache.updateQuery({ query: ALL_BOOKS, variables: { genre: '' } }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(newBook)
        }
      })

      newBook.genres.forEach(genre => {
        cache.updateQuery({ query: ALL_BOOKS, variables: { genre } }, ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(newBook)
          }
        })
      })
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    if (!genres.length) {
      return alert('add at least one genre')
    }

    const bookData = { title, author, published, genres }

    createBook({ variables: bookData })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>Add book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            required
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            required
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            required
            type="number"
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value) || '')}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

NewBook.propTypes = {
  token: PropTypes.string
}

export default NewBook