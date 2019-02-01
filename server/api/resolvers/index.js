const { ApolloError, AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const authMutations = require('./auth');

const { UploadScalar, DateScalar } = require('../custom-types');

module.exports = app => {
  return {
    Upload: UploadScalar,
    Date: DateScalar,

    Query: {
      viewer(root, args, { token }) {
        if (token) {
          return jwt.decode(token, app.get('JWT_SECRET'));
        }
        return null;
      },
      async user(parent, { id }, { pgResource, token }, info) {
        try {
          const viewer = await jwt.decode(token, app.get('JWT_SECRET'));
          if (!viewer) throw 'Unauthorized';
          const user = await pgResource.getUserById(id);
          return user;
        } catch (e) {
          if (e === 'Unauthorized') {
            throw new AuthenticationError(e);
          } else {
            throw new ApolloError(e);
          }
        }
      },
      async items(parent, { filter }, { pgResource, token }) {
        try {
          const viewer = await jwt.decode(token, app.get('JWT_SECRET'));
          if (!viewer) throw 'Unauthorized';
          const items = await pgResource.getItems(filter);
          return items;
        } catch (e) {
          if (e === 'Unauthorized') {
            throw new AuthenticationError(e);
          } else {
            throw new ApolloError(e);
          }
        }
      },
      async tags(parent, _, { pgResource }) {
        try {
          const tags = await pgResource.getTags();
          return tags;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    User: {
      async items({ id }, _, { pgResource }) {
        try {
          const userItems = await pgResource.getItemsForUser(id);
          return userItems;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async borrowed({ id }, _, { pgResource }) {
        try {
          const borrowedItems = await pgResource.getBorrowedItemsForUser(id);
          return borrowedItems;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    Item: {
      async itemowner({ ownerid }, _, { pgResource }) {
        try {
          const owner = await pgResource.getUserById(ownerid);
          return owner;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async tags({ id }, _, { pgResource }) {
        try {
          const tags = await pgResource.getTagsForItem(id);
          return tags;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async borrower({ borrowerid }, _, { pgResource }) {
        if (!borrowerid) return null;
        try {
          const borrower = await pgResource.getUserById(borrowerid);
          return borrower;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async imageurl({ imageurl, imageid, mimetype, data }) {
        if (imageurl) return imageurl;
        if (imageid) {
          return `data:${mimetype};base64, ${data}`;
        }
      }
    },

    Mutation: {
      ...authMutations(app),
      async addItem(parent, { item }, { pgResource, req, token }, info) {
        // @TODO add image
        // image = await image;
        const user = await jwt.decode(token, app.get('JWT_SECRET'));
        try {
          if (!user) throw 'Unauthorized';
          const newItem = await pgResource.saveNewItem({
            item,
            //image: args.image,
            user
          });
          return newItem;
        } catch (e) {
          if (e === 'Unauthorized') {
            throw new AuthenticationError(e);
          } else {
            throw new ApolloError(e);
          }
        }
      }
    }
  };
};
