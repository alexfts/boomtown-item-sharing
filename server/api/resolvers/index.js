const { ApolloError } = require('apollo-server-express');
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
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id);
          return user;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async items(parent, { filter }, { pgResource }) {
        try {
          const items = await pgResource.getItems(filter);
          return items;
        } catch (e) {
          throw new ApolloError(e);
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
        try {
          if (imageurl) return imageurl;
          if (imageid) {
            return `data:${mimetype};base64, ${data}`;
          }
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    Mutation: {
      ...authMutations(app),
      async addItem(parent, { item }, { pgResource, req, token }, info) {
        try {
          const user = await jwt.decode(token, app.get('JWT_SECRET'));
          if (!user || !user.id) throw 'Invalid token';
          if (
            item.title === '' ||
            item.description === '' ||
            item.tags.length === 0
          ) {
            throw 'Invalid item input';
          }
          const newItem = await pgResource.saveNewItem({
            item,
            user
          });
          return newItem;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async borrow(parent, { itemid }, { pgResource, req, token }, info) {
        try {
          const user = await jwt.decode(token, app.get('JWT_SECRET'));
          if (!user || !user.id) throw 'Invalid token';
          const item = await pgResource.getItemById(itemid);
          if (!item || !item.ownerid) throw 'Invalid query';
          if (item.borrowerid || item.ownerid === parseInt(user.id))
            throw 'User not allowed to borrow item';
          await pgResource.updateBorrower(itemid, user.id);
          return true;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async return(parent, { itemid }, { pgResource, req, token }, info) {
        try {
          const user = await jwt.decode(token, app.get('JWT_SECRET'));
          if (!user || !user.id) throw 'Invalid token';
          const item = await pgResource.getItemById(itemid);
          if (!item || item.borrowerid !== parseInt(user.id))
            throw 'User not allowed to return item';
          await pgResource.updateBorrower(itemid, null);
          return true;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    }
  };
};
