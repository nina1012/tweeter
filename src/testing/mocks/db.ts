import { factory, primaryKey } from '@mswjs/data';
import { nanoid } from 'nanoid';

export type Model = keyof typeof models;
const models = {
  user: {
    user_id: primaryKey(nanoid),
    firstName: String,
    lastName: String,
    username: String,
    bio: String,
    created_at: Date.now,
    email: String,
    password: String,
  },
  tweet: {
    tweet_id: primaryKey(nanoid),
    content: String,
    author_id: String,
    created_at: Date.now,
  },
};

export const db = factory(models);

// if running in client/browser
export const loadDB = () => {
  return Object.assign(
    JSON.parse(window.localStorage.getItem('msw-db') || '{}'),
  );
};

export const storeDB = (data: string) => {
  window.localStorage.setItem('msw-db', data);
};

export const persistDB = async (model: Model) => {
  if (process.env.NODE_ENV === 'test') return;
  const data = await loadDB();
  data[model] = db[model].getAll();
  await storeDB(JSON.stringify(data));
};

export const initializeDb = async () => {
  const database = await loadDB();
  Object.entries(db).forEach(([key, model]) => {
    const dataEntres = database[key];
    if (dataEntres) {
      dataEntres?.forEach((entry: Record<string, any>) => {
        model.create(entry);
      });
    }
  });
};

export const resetDb = () => {
  window.localStorage.clear();
};
