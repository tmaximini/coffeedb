import React from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { perPage } from '../config'
import Item from './Item'

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      description
      type
    }
  }
`

const Center = styled.div`
  text-align: center;
`

const ItemList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth}
  margin: 0 auto;
`

const Items = ({ items = [], type = 'BEAN', page = 1 }) => {
  return (
    <Center>
      <Query
        query={ALL_ITEMS_QUERY}
        variables={{
          skip: page * perPage - perPage
        }}
      >
        {({ data, error, loading }) => {
          if (loading) return <p> Loading...</p>
          if (error) return <p> Error: ${error.message}</p>
          console.log(data)

          return (
            <ItemList>
              {data.items.map(item => (
                <Item item={item} key={item.id} />
              ))}
            </ItemList>
          )
        }}
      </Query>
    </Center>
  )
}

export default Items
