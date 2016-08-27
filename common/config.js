module.exports.getConfig = function() {
  const ENV = process.env;
  const config = {
    development: {
      members: [
        {
          USER: '',
          PASS: '',
          HOST: ENV.MONGO_HOST || 'localhost',
          PORT: ENV.MONGO_PORT || '27017',
          DATABASE: ENV.MONGO_NAME || 'goquoteme',
        },
      ],
      token: {
        secret: ENV.TOKEN_SECRET || 'Ud9L3pPLxkQJeMCqEePfMaJa3BUELHpNmVLqdd36',
      },
    },
  };
  if (!config[ENV.ENV]) { throw new Error('Incorrect env'); }
  return config[ENV.ENV];
};

function createPathString(dbConfig, prependMongo, appendDbName) {
  const dbPath = [];
  if (prependMongo) {
    dbPath.push('mongodb://');
  }
  if (dbConfig.USER && prependMongo) {
    dbPath.push(dbConfig.USER);
    dbPath.push(':');
    dbPath.push(dbConfig.PASS);
    dbPath.push('@');
  }
  dbPath.push(dbConfig.HOST);
  dbPath.push(':');
  dbPath.push(dbConfig.PORT);
  if (appendDbName) {
    dbPath.push('/');
    dbPath.push(dbConfig.DATABASE);
  }
  return dbPath.join('');
}

module.exports.getConnectOptions = function() {
  const dbConfig = module.exports.getConfig();
  const connectStrings = (dbConfig.members || []).map((member, i, array) => {
    return createPathString(member, i === 0, i === array.length - 1);
  });
  const result = {
    connectString: connectStrings.join(','),
    options: {},
  };
  if (dbConfig.ssl) {
    const ca = [(new Buffer(process.env.MONGO_CERT, 'base64')).toString()];
    result.options.mongos = {
      ssl: true,
      sslValidate: true,
      sslCA: ca,
      ca: ca, // eslint-disable-line
      socketOptions: {
        connectTimeoutMS: 300000,
        socketTimeoutMS: 300000,
      },
    };
  }
  return result;
};
