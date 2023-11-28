export default async (req, res) => {
  try {
    var listData = JSON.parse(req.body)
    console.log(listData,"listData")
    var reqObject = {
      "stay": {
        "checkIn": listData.checkIn,
        "checkOut": listData.checkOut,
        "shiftDays":"1"
      },
      "occupancies": [{
        "rooms": listData.rooms,
        "adults": listData.adults,
        "children": listData.children,
        
      }],
      "geolocation": {
          "latitude": listData.latitude,
          "longitude": listData.longitude,
          "radius": 200,
        "unit": "km"
      }
    };
console.log(JSON.stringify(reqObject))
   



    let response = await fetch("https://api.test.hotelbeds.com/hotel-api/1.0/hotels", {
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
    if (data.error) {
      return res.send({ status: 500, error: data });
    }
    else {
   
      if (data?.hotels?.total > 0) {
        let hotelCodes = data?.hotels.hotels.map((item) => {
          return item.code
        });

        let hotelContentResponse = await fetch(process.env.HOTELBEDS_BASE_URL + "/hotel-content-api/1.0/hotels?" + new URLSearchParams({ ...reqObject, codes: hotelCodes }).toString(), {
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
          }
        })

        let hotelsContentData = await hotelContentResponse.json();

        if (hotelsContentData.error) {
          return res.send({ status: 500, error: hotelsContentData });
        }
        else {
          let mapHotelContent = await mergeHotelContent(data?.hotels?.hotels, hotelsContentData?.hotels);
          return res.send({
            status: 200, data: {
              checkIn: data?.hotels?.checkIn,
              checkOut: data?.hotels?.checkOut,
              total: mapHotelContent.length,
              hotels: mapHotelContent
            }
          });
        }
      }
      else {
        res.send({ status: 200, data: {}, message: "No Data Found" })
      }
    }

  } catch (err) {
    return res.send({ status: 500, error: err });
  }
};


async function mergeHotelContent(hotel, hotelContent) {
  const mergedObject = {};

  hotel.forEach((obj) => {
    mergedObject[obj.code] = [obj]
  });

  hotelContent.forEach((obj) => {
    if (mergedObject[obj.code]) {
      mergedObject[obj.code] = [...mergedObject[obj.code], obj]
    }
    else {
      mergedObject[obj.code] = [obj]
    }
  });

  const mergedArray = Object.values(mergedObject);
  return mergedArray;
};