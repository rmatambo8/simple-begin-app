const faunadb = require("faunadb");
const query = faunadb.query;

let arc = require('@architect/functions')
let parseBody = arc.http.helpers.bodyParser

exports.handler = async function http (request){
  
  try {
    const data = parseBody(request)
    const client = new faunadb.Client({ secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET });
    await client.query(
      query.Delete (
        query.Ref(query.Collection("Notes"), data.id)
      )
    )
    return {  headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
      statusCode: 204
    };
  } catch (error) {
    console.log(error.message);
  }
}