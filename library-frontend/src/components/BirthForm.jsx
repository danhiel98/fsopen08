import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { UPDATE_BIRTH } from "../queries/authors"
import PropTypes from 'prop-types'

const BirthForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [birth, setBirth] = useState('')

  const [updateBirthYear, result] = useMutation(UPDATE_BIRTH, {
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
    }
  })

  const submit = (ev) => {
    ev.preventDefault()

    updateBirthYear({ variables: { name, setBornTo: birth } })

    setName('')
    setBirth('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      alert('person not found')
    }
  }, [result.data])

  return (
    <>
      <h2>Set birhyear</h2>
      <form onSubmit={submit}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option>[Select author]</option>
            {authors.map(a => (
              <option key={a.id} value={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born <input type="number" required value={birth} onChange={({ target }) => setBirth(parseInt(target.value) || '')} />
        </div>

        <button type="submit">update author</button>
      </form>
    </>
  )
}

BirthForm.propTypes = {
  authors: PropTypes.array.isRequired
}

export default BirthForm