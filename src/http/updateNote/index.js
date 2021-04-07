const faunadb = require("faunadb");
const query = faunadb.query;

let arc = require('@architect/functions')
let parseBody = arc.http.helpers.bodyParser
exports.handler = async function http (request) {
   const data = parseBody(request)
  try {
    const client = new faunadb.Client({ secret: process.env.REACT_APP_FAUNADB_SERVER_SECRET });
    const response = await client.query(
      query.Update(
        query.Collection("Notes"),
        {data: data.note}
        )
    );

    return {statusCode: 200, body: JSON.stringify(response)};

  } catch (error) {
    console.log(error.message);
  }
}
