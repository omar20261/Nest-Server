require('dotenv').config();

module.exports = {
  type: 'postgres', 
  host:  process.env.db_host, 
  port:  process.env.db_port, 
  username:  process.env.db_username, 
  password:  process.env.db_password,
  database:  process.env.db_database,
  synchronize: true,
  logging: true,
  dropSchema: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};