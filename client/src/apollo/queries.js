import gql from 'graphql-tag';

/**
 * Item and user-related queries and mutations.
 */

const ItemFields = gql`
  fragment ItemFields on Item {
    id
    title
    imageurl
    description
    created
    tags {
      id
      title
    }
    itemowner {
      id
      fullname
      email
      bio
    }
    borrower {
      id
      fullname
      email
      bio
    }
  }
`;

export const ITEM_QUERY = gql`
  query item($id: ID!) {
    item(id: $id) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

export const BORROWED_ITEMS_QUERY = gql`
  query {
    borrowedItems {
      ...ItemFields
    }
  }
`;

export const ALL_ITEMS_QUERY = gql`
  query items($filter: ID) {
    items(filter: $filter) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

export const ALL_USER_ITEMS_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      bio
      email
      fullname
      items {
        ...ItemFields
      }
      borrowed {
        ...ItemFields
      }
    }
  }
  ${ItemFields}
`;

export const ALL_TAGS_QUERY = gql`
  query {
    tags {
      id
      title
    }
  }
`;

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($item: NewItemInput!, $image: Upload!) {
    # @TODO: Pass the item and image into the addItem mutation as arguments
    # and return the new item id when the mutation is complete.
    addItem(item: $item, image: $image) {
      id
    }
  }
`;

export const VIEWER_QUERY = gql`
  query {
    # @TODO: Query the id, email, fullname, and bio fields for the viewer.
    viewer {
      id
      email
      fullname
      bio
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    # @TODO: Run the logout mutation.
    logout
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup($user: SignupInput!) {
    # @TODO: Pass the user into the signup mutation as an argument
    # and return the id of the new user when the mutation is complete.
    signup(user: $user) {
      id
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($user: LoginInput!) {
    login(user: $user) {
      id
    }
  }
`;

export const BORROW_MUTATION = gql`
  mutation borrow($itemid: ID!) {
    borrow(itemid: $itemid)
  }
`;

export const RETURN_MUTATION = gql`
  mutation return($itemid: ID!) {
    return(itemid: $itemid)
  }
`;
