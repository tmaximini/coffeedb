import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import ErrorMessage from './ErrorMessage'
import { possibleItemTypes } from '../config'

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      type
    }
  }
`

export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String, $description: String, $type: ItemType) {
    updateItem(id: $id, title: $title, description: $description, type: $type) {
      id
      title
      description
      type
    }
  }
`

class UpdateItem extends Component {
  state = {}

  handleChange = e => {
    const { name, type, value } = e.target
    const val = type === 'number' ? parseFloat(value) : value
    this.setState({
      [name]: val
    })
  }

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault()
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    })
  }

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ loading, data }) => {
          if (loading) return <p>Loading...</p>
          if (!data.item) return <p>No item found for id {this.props.id}</p>
          const itemData = data.item
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(UpdateItem, { loading, error, data }) => (
                <Form onSubmit={e => this.updateItem(e, UpdateItem)}>
                  <ErrorMessage error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter a title"
                        defaultValue={itemData.title}
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
                        defaultValue={itemData.description}
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
                    <button type="submit">Sav{loading ? 'ing' : 'e'} changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default UpdateItem
