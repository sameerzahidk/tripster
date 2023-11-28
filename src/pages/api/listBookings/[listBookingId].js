import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = await client.db("db_tripster");
    const collection = db.collection("bookings");
    const query = req.query;
    const { user } = query;
    console.log(user, "user");

    // var today = new Date().toISOString().slice(0, 10)
    // var before = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().slice(0, 10)
    // console.log(today,before,"test")
    // let response = await fetch("https://api.test.hotelbeds.com/hotel-api/1.0/bookings?&start="+ before +"&end="+ today + "&creationUser="+ query.listBookingId + "&filterType=CREATION&status=ALL&from=1&to=25", {
    //     method: 'GET',
    //     headers: {
    //         'Api-key': process.env.apikey,
    //         'X-Signature': req.headers["x-signature"],
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Methods': '*',
    //         'Access-Control-Allow-Credentials': true,
    //         'Access-Control-Allow-Origin': '*',
    //         'X-Requested-With': '*',
    //         'Accept': 'application/json',
    //         'Accept-Encoding': 'g-zip',
    //         'Accept': '*'
    //     },
    // })
    // let data = await response.json();
    // if (data.error) {
    //     return res.send({ status: 500, error: data });
    // }
    // else {
    //     return res.send({ status: 200, data: data });
    // }
    if (query.listBookingId) {
      const condition = { creationUser: query.listBookingId };
      const documents = await collection.find(condition).toArray();
      if (documents) {
        return res.send({ status: 200, data: documents });
      } else {
        return res.send({ status: 500, states: "error" });
      }
    }
  } catch (err) {
    return res.send({ status: 500, error: err });
  }
};
