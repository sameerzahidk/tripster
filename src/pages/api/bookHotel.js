import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
  try {
    var bookingData = JSON.parse(req.body);
    const client = await clientPromise;
    const db = await client.db("db_tripster");
    const collection = db.collection("bookings");
    let response = await fetch(
      "https://api.test.hotelbeds.com/hotel-api/1.0/bookings",
      {
        method: "POST",
        headers: {
          "Api-key": process.env.apikey,
          "X-Signature": req.headers["x-signature"], //it can be iPhone or your any other attribute
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "*",
          Accept: "application/json",
          "Accept-Encoding": "g-zip",
          Accept: "*",
        },
        body: JSON.stringify({
          holder: {
            name: bookingData.firstName,
            surname: bookingData.lastName,
          },
          rooms: [
            {
              rateKey: bookingData.rateKey,
              paxes: bookingData.paxes,
            },
          ],
          clientReference: "STRIPE",
          creationUser: bookingData.id,
          remark: "",
        }),
      }
    );

    let data = await response.json();
    console.log("booking", data);
    

    if (data?.booking) {
      const result = await collection.insertOne(data.booking);
      console.log("booking", data);

      return res.send({ status: 200, hotels: data });
    } else {
      console.log("here");
      return res.send({ status: 500, hotels: data });
    }
  } catch (err) {
    return res.send({ status: 500, error: err });
  }
};
