import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
  const client = await clientPromise;
  const db = await client.db("db_tripster");
    const collection = db.collection('destinations'); // Replace with your collection name

  try {
    const headersJson = JSON.stringify(req.headers)
    const query = req.query;
    let response = await fetch("https://api.test.hotelbeds.com/hotel-content-api/1.0/locations/destinations?fields=all&countryCodes=AU&countryCodes=US&countryCodes=AE&countryCodes=ID&countryCodes=SG&countryCodes=UK&countryCodes=IN&countryCodes=TH&countryCodes=MY&countryCodes=HK&countryCodes=LK&countryCodes=JP&from=2000&to=2999", {
      method: 'GET',

      headers: {
        'Api-key': process.env.apikey,
        'X-Signature': req.headers["x-signature"], //it can be iPhone or your any other attribute
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': '*',
        'Accept': 'application/json',
        'Accept-Encoding': 'g-zip',
        'Accept': '*'
      },
    })
    let data = await response.json();
    //   const result = await collection.insertMany(data.destinations);
    // console.log(data,result, "result in db")
 
    const states = await collection.insertMany(data.destinations, { ordered: false });

     const documents = await collection.find({}).toArray();
    if (documents) {
      return res.send({ status: 200, states: documents });
    } else {
            return res.send({ status: 500, states: 'error' })

    }

  } catch (err) {
    return res.send({ status: 500, error: err });
  }
};
