const faunadb = require("faunadb");
const query = faunadb.query;

let arc = require('@architect/functions')
let parseBody = arc.http.helpers.bodyParser

exports.handler = async function http (request) {
  const data = parseBody(request)
  try {
    const client = new faunadb.Client({ secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET });
    const res = await client.query(
        query.Create(
          query.Collection("Notes"),
          {data: data}
          )
      );
    return {
      headers: {
        'content-type': 'application/json; charset=utf8',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      },
      statusCode: 200,
      body: JSON.stringify({ id: res.ref.id, ...res.data })
    }
  } catch (error) {
    console.log(error.message);
  }
};