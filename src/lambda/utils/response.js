const generate = (statusCode, body) => ({
  statusCode,
  body,
  headers: {
    'Access-Control-Allow-Headers':
      'Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
    'X-Requested-With': '*',
  },
});

exports.generate = generate;
