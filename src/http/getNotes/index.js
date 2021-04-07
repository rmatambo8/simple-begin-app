const faunadb = require("faunadb");
const q = faunadb.query;

let arc = require('@architect/functions')
let parseBody = arc.http.helpers.bodyParser
exports.handler = async function http (request) {
  console.log('reached function');
  
  try {
    const client = new faunadb.Client({ secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET });
    const response = await client.query(
      q.Paginate(q.Documents(q.Collection('Notes'))),
      )

    const somethingElse = await response.data.map(ref => q.Get(ref));

    const info = await client.query(somethingElse);

    const docRefs = await info.map(({ data, ref }) => {
      let body;
      try {
        body = JSON.parse(data.body)
      } catch (error) {
        body = data.body
      }
      return { ...body, id: ref.id }
    });
    return {
       headers: {
        'content-type': 'application/json; charset=utf8',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      },
      statusCode: 201,
      body: JSON.stringify({ notes: docRefs })
    };
  } catch (error) {
   console.log(error.message);
  }
}
