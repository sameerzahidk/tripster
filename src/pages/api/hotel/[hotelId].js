export default async (req, res) => {

  try {

    const query = req.query;
    const { hotelId } = query;

    var id = hotelId.toString()

    var listData = JSON.parse(req.body)
    console.log(listData, "listData")
    var reqObject = {
      "stay": {
        "checkIn": listData.checkIn,
        "checkOut": listData.checkOut,
        "shiftDays": listData.shiftDays
      },
      "occupancies": [{
        "rooms": parseInt(listData.rooms),
        "adults": parseInt(listData.adults),
        "children": listData.children !== "" ? parseInt(listData.children) : 0,
        "paxes": listData.paxes
      }],
      "hotels": {
        "hotel": [id]
      }
    }

    // let response = await fetch(process.env.HOTELBEDS_BASE_URL+"/hotel-content-api/1.0/hotels/" + hotelId, {
    //   method: 'GET',
    //   headers: {
    //     'Api-key': process.env.apikey,
    //     'X-Signature': req.headers["x-signature"],
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Methods': '*',
    //     'Access-Control-Allow-Credentials': true,
    //     'Access-Control-Allow-Origin': '*',
    //     'X-Requested-With': '*',
    //     'Accept': 'application/json',
    //     'Accept-Encoding': 'g-zip',
    //     'Accept': '*'
    //   },
    // })

    let response = await fetch(process.env.HOTELBEDS_BASE_URL + "/hotel-api/1.0/hotels", {
      method: 'POST',
      headers: {
        'Api-key': process.env.apikey,
        'X-Signature': req.headers["x-signature"],
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': '*',
        'Accept': 'application/json',
        'Accept-Encoding': 'g-zip',
        'Accept': '*'
      },
      body: JSON.stringify(reqObject)
    })
    let data = await response.json();
    console.log(data, "data")
    if (data.error) {
      return res.send({ status: 500, error: data })
    } else {

      if (data?.hotels?.total > 0) {

console.log("here in second call")
        let hotelContentResponse = await fetch(process.env.HOTELBEDS_BASE_URL + "/hotel-content-api/1.0/hotels/" + hotelId, {
          method: 'GET',
          headers: {
            'Api-key': process.env.apikey,
            'X-Signature': req.headers["x-signature"],
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

        let hotelsContentData = await hotelContentResponse.json();

        if (hotelsContentData.error) {
          return res.send({ status: 500, error: hotelsContentData });
        }
        else {

          console.log(hotelsContentData,"hotel content data")
          let mapHotelContent = await mergeHotelContent(data?.hotels?.hotels, hotelsContentData?.hotel);

          return res.send({ status: 200, data: mapHotelContent });
        }
      }

    }
  } catch (err) {
    return res.send({ status: 500, error: err });
  }
};
async function mergeHotelContent(hotel, hotelContent) {
  const mergedObject = {};
  console.log("in here")


  mergedObject[0]=hotel[0];
  mergedObject[1]=hotelContent
  // hotel.forEach((obj) => {
  //   mergedObject[obj.code] = [obj]
  // });

  // hotelContent.forEach((obj) => {
  //   if (mergedObject[obj.code]) {
  //     mergedObject[obj.code] = [...mergedObject[obj.code], obj]
  //   }
  //   else {
  //     mergedObject[obj.code] = [obj]
  //   }
  // });

  const mergedArray = Object.values(mergedObject);
  console.log("mergerd array ",mergedArray)
  return mergedArray;
};