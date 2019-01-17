const { GraphQLScalarType } = require('graphql');

const { Kind } = require('graphql/language');

const UploadScalar = new GraphQLScalarType({
  name: 'Upload',
  description:
    'The `Upload` scalar type represents a file upload promise that resolves ' +
    'an object containing `stream`, `filename`, `mimetype` and `encoding`.',
  parseValue: value => value,
  parseLiteral() {
    throw new Error('Upload scalar literal unsupported');
  },
  serialize() {
    throw new Error('Upload scalar serialization unsupported');
  }
});

const DateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.getTime();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
});

module.exports = {
  UploadScalar,
  DateScalar
};
