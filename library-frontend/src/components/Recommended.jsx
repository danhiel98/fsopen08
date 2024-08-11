import PropTypes from 'prop-types'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/books'
import BookList from './BookList'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Recommended = ({ userData }) => {
  const navigate = useNavigate()
  const [getBooks, { loading, error, data }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (!userData) {
      return navigate('/books')
    }

    getBooks({ variables: { genre: userData.favoriteGenre } })
  }, [userData])

  if (!userData) return

  if (loading) return <div>loading...</div>
  if (error) return `Error! ${error}`

  const booksResult = data ? data.allBooks : []

  return (
    <>
      <h2>Recommendations</h2>
      books for your favorite genre <strong>{userData.favoriteGenre}</strong>

      {
        booksResult.length ?
          <BookList list={booksResult} />
          :
          <div>
            <p>No data found</p>
          </div>
      }
    </>
  )
}

Recommended.propTypes = {
  userData: PropTypes.object
}

export default Recommended