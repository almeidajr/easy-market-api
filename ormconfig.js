module.exports = {
  name: 'default',
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [process.env.ENTITIES_DIR],
  migrations: [process.env.MIGRATIONS_DIR],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};
