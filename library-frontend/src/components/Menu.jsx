import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

const Menu = ({ token, logout }) => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link to="/authors" style={padding}>
        <button>
          authors
        </button>
      </Link>
      <Link to="/books" style={padding}>
        <button>
          books
        </button>
      </Link>
      {
        token &&
        <>
          <Link to="/books/create" style={padding}>
            <button>
              add book
            </button>
          </Link>
          <Link to="/recommended" style={padding}>
            <button>
              recommended
            </button>
          </Link>
          <Link style={padding} onClick={logout}>
            <button>
              logout
            </button>
          </Link>
        </>
      }
      {
        !token &&
        <Link to={"/login"} style={padding}>
          <button>
            login
          </button>
        </Link>
      }
    </div>
  )
}

Menu.propTypes = {
  token: PropTypes.string,
  logout: PropTypes.func
}

export default Menu