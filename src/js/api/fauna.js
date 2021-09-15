import faunadb from 'faunadb'

export const q = faunadb.query;

export const client = new faunadb.Client({
   secret: process.env.VUE_APP_FAUNA_KEY_LIMITED,
   domain: 'db.us.fauna.com'
})