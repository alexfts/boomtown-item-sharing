const { defaultFieldResolver } = require('graphql');
const { ForbiddenError } = require('apollo-server-express');
const { SchemaDirectiveVisitor } = require('graphql-tools');

class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type);
  }
  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
  }

  ensureFieldsWrapped(objectType) {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function(parent, args, context, info) {
        if (context.token || fieldName === 'login' || fieldName === 'signup') {
          return resolve.apply(this, [parent, args, context, info]);
        } else {
          throw new ForbiddenError('User not authenticated');
        }
      };
    });
  }
}

module.exports = {
  AuthDirective
};
