import clientPromise from "../../lib/mongodb";
import User from "../../../model/UserModel";

async function handler(req, res) {
  const { firstName, lastName, email, mobile, password } = req.body;

  const client = await clientPromise;
  const db = await client.db("db_tripster");

  if (req.method === "POST") {
    const checkExisting = await db
      .collection("users")
      .findOne({ email: email });
    //Send error response if duplicate user is found
    if (checkExisting) {
      res.status(422).json({ message: "User already exists" });
      return;
    }

    var lastcount = await db.collection("users").find().count();

    var user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobile: mobile,
      password: password,
      id: lastcount + 1,
    });
    const status = await db.collection("users").insertOne(user);

    //Send success response
    res.status(201).json({ message: "User created", ...status });
    //Close DB connection
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}

export default handler;
