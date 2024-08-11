import PropTypes from 'prop-types'

const BookList = ({ list }) => {
  let i = 1
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {list.map((a) => (
          <tr key={a.title}>
            <td>{i++}</td>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

BookList.propTypes = {
  list: PropTypes.array
}

export default BookList