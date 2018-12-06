import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Router from 'next/router'
import gql from 'graphql-tag'
import Form from './styles/Form'
import ErrorMessage from './ErrorMessage'
import { possibleItemTypes } from '../config'

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION($title: String!, $description: String!, $type: ItemType!) {
    createItem(title: $title, description: $description, type: $type) {
      id
    }
  }
`

class CreateItem extends Component {
  state = {
    type: 'BEAN'
  }

  handleChange = e => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) : value
    this.setState({
      [name]: val
    })
  }

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error, data }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault()
              const res = await createItem()
              console.log(res)

              // Router.push({
              //   pathname: '/item',
              //   query: { id: res.data.createItem.id }
              // })
            }}
          >
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter a title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Enter a description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <label htmlFor="type">
                type
                <select
                  type="text"
                  id="type"
                  name="type"
                  placeholder="Enter a type"
                  value={this.state.type}
                  onChange={this.handleChange}
                  required
                >
                  {possibleItemTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default CreateItem
