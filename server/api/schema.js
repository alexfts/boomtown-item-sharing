const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar Upload

  scalar Date

  type Item {
    id: ID!
    title: String!
    imageurl: String
    description: String!
    itemowner: User!
    tags: [Tag]
    created: Date!
    borrower: User
  }

  type User {
    id: ID!
    email: String!
    fullname: String!
    bio: String
    items: [Item]
    borrowed: [Item]
  }

  type Tag {
    id: ID!
    title: String!
  }

  type File {
    id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
    itemid: ID!
  }

  input AssignedTag {
    id: ID!
    title: String!
  }

  input AssignedBorrower {
    id: ID!
  }

  input NewItemInput {
    title: String!
    description: String!
    tags: [AssignedTag]!
  }

  input SignupInput {
    email: String!
    fullname: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query @auth {
    user(id: ID!): User
    viewer: User
    items(filter: ID): [Item]
    tags: [Tag]
  }

  type Mutation @auth {
    addItem(item: NewItemInput!, image: Upload): Item
    signup(user: SignupInput!): User
    login(user: LoginInput!): User
    logout: Boolean
  }
`;
