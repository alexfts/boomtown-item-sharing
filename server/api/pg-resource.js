const strs = require('stringstream');

/**
 * Helper function to generate a SQL statement
 * for inserting multiple tags for an item */
const tagsQueryString = (tags, itemid) => {
  function range(start, end) {
    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  }
  const indices = range(1, tags.length);
  let result = indices.map(index => `($${index}, ${itemid})`);
  result = result.join(',') + ';';
  return result;
};

/**
 * Helper function to insert item into postgres as part of a transaction
 */
const insertItem = async (client, title, description, user) => {
  const insertItemQuery = {
    text:
      'INSERT INTO items (title, description, ownerid) VALUES ($1, $2, $3) RETURNING *',
    values: [title, description, user.id]
  };

  const insertItemResult = await client.query(insertItemQuery);
  return insertItemResult.rows[0];
};

/**
 * Helper function to insert item tags into postgres as part of a transaction
 */
const insertItemTags = async (client, tags, item) => {
  const qs = tagsQueryString(tags, item.id);
  const insertItemTagsQuery = {
    text: `INSERT INTO itemtags (tagid, itemid) VALUES ${qs}`,
    values: tags.map(({ id }) => parseInt(id))
  };
  await client.query(insertItemTagsQuery);
};

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text:
          // @TODO: Authentication - Server
          'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name AS fullname, email, bio',
        values: [fullname, email, password]
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
        case /users_fullname_key/.test(e.message):
          throw 'An account with this username already exists.';
        case /users_email_key/.test(e.message):
          throw 'An account with this email already exists.';
        default:
          throw 'There was a problem creating your account.';
        }
      }
    },

    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        // @TODO: Authentication - Server
        text:
          'SELECT id, name AS fullname, email, bio, password FROM users WHERE email = $1',
        values: [email]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw 'User was not found.';
        return user.rows[0];
      } catch (e) {
        throw 'User was not found.';
      }
    },

    async getUserById(id) {
      const findUserQuery = {
        text:
          'SELECT id, email, name AS fullname, bio FROM users WHERE id = $1',
        values: [id]
      };

      try {
        const user = await postgres.query(findUserQuery);
        if (user.rows.length === 0) throw 'User was not found.';
        return user.rows[0];
      } catch (error) {
        throw 'User was not found.';
      }
    },

    async getItems(idToOmit) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE ownerid IS NOT NULL ${
            idToOmit ? ' AND ownerid <> $1' : ''
          } ORDER BY created DESC`,
          values: idToOmit ? [idToOmit] : []
        });
        return items.rows;
      } catch (error) {
        throw 'Error fetching items.';
      }
    },

    async getItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE ownerid = $1;`,
          values: [id]
        });
        return items.rows;
      } catch (error) {
        throw 'Error fetching items.';
      }
    },

    async getBorrowedItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE borrowerid = $1`,
          values: [id]
        });
        return items.rows;
      } catch (error) {
        throw 'Error fetching borrowed items.';
      }
    },

    async getTags() {
      try {
        const tags = await postgres.query({
          text: 'SELECT id, name AS title FROM tags'
        });
        return tags.rows;
      } catch (error) {
        throw 'Error fetching tags.';
      }
    },

    async getTagsForItem(id) {
      try {
        const tagsQuery = {
          text: `SELECT id, name AS title
          FROM tags
          WHERE id IN
          (SELECT tagid FROM itemtags WHERE itemid = $1)`,
          values: [id]
        };

        const tags = await postgres.query(tagsQuery);
        return tags.rows;
      } catch (error) {
        throw 'Error fetching tags for item';
      }
    },

    async saveNewItem({ item, user }) {
      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            client.query('BEGIN', async err => {
              // @TODO Convert image (file stream) to Base64

              // const imageStream = image.stream.pipe(strs('base64'));

              // let base64Str = '';
              // imageStream.on('data', data => {
              //   base64Str += data;
              // });

              // imageStream.on('end', async err => {
              //   // Image has been converted, begin saving things

              const { title, description, tags } = item;
              const newItem = await insertItem(
                client,
                title,
                description,
                user
              );

              /* @TODO: Upload image */
              // const imageUploadQuery = {
              //   text:
              //     'INSERT INTO uploads (itemid, filename, mimetype, encoding, data) VALUES ($1, $2, $3, $4, $5) RETURNING *',
              //   values: [
              //     // itemid,
              //     image.filename,
              //     image.mimetype,
              //     'base64',
              //     base64Str
              //   ]
              // };

              // // Upload image
              // const uploadedImage = await client.query(imageUploadQuery);
              // const imageid = uploadedImage.rows[0].id;

              // Generate image relation query
              // @TODO
              // -------------------------------

              // Insert image
              // @TODO
              // -------------------------------

              await insertItemTags(client, tags, newItem);

              client.query('COMMIT', err => {
                if (err) {
                  throw err;
                }
                done();
                resolve(newItem);
              });
              //}); // end of imageStream.on('end') handler
            });
          } catch (e) {
            client.query('ROLLBACK', err => {
              if (err) {
                throw err;
              }
              done();
            });
            switch (true) {
            case /uploads_itemid_key/.test(e.message):
              throw 'This item already has an image.';
            default:
              throw e;
            }
          }
        });
      });
    }
  };
};
