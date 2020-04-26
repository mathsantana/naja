require('dotenv/config');

module.exports = {
  development: {
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PSSWRD_DEV,
    database: process.env.DB_DBNAME_DEV,
    host: process.env.DB_HOST_DEV,
    dialect: 'postgres',
    define: {
      timestamps: true,
    },
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false,
  },
  production: {
    use_env_variable:
      'postgres://apyvlbulbtxisd:b14e689377eab96c537befc6f8eb015887f16a95545db01e7105cd16615d60f5@ec2-34-234-228-127.compute-1.amazonaws.com:5432/dad3tpkd43jvcu',
    username: 'apyvlbulbtxisd',
    password:
      'b14e689377eab96c537befc6f8eb015887f16a95545db01e7105cd16615d60f5',
    database: 'dad3tpkd43jvcu',
    host: 'ec2-34-234-228-127.compute-1.amazonaws.com',
    dialect: 'postgres',
    operatorsAliases: false,
  },
};
