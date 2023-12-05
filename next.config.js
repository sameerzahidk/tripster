/** @type {import('next').NextConfig} */
// const nextConfig = {}
module.exports = {
  compress: true,
  // nextConfig,
  env: {
    HOTELBEDS_BASE_URL: "https://api.test.hotelbeds.com",
    NEXT_URL: process.env.NODE_ENV == 'development' ? "http://localhost:3008" : "https://tripster-beta.vercel.app/",
    BASE_URL: 'https://api.test.hotelbeds.com/',
    // http://tripster.technorthstar.com
    NEXTAUTH_URL: process.env.NODE_ENV == 'development' ? "http://localhost:3008" : "https://tripster-beta.vercel.app/",
    // Farooq
    //apikey: '49295928a2cfa7b4b8c2da59d2fe6413',
    //apiSecret: '91f9041c26',
    // Vedashri
    // apikey: '92fa4cd1604a3ef4af3f8a158ea9ab9d',
    // apiSecret:'4d7448545b',
    // Nikhil
    // apikey: '54ca4ed6f46b1ff68140e33cfb3ca015',
    // apiSecret:'3ada2b9063',
    // ZeemZach
    //apikey: '8023206680b14ddbe22d49e427a5e70d',
   // apiSecret:'6ebefd079f',
    //Nikhil new
    apikey: '114443926226a3133a5a8b3207598b15',
    apiSecret: 'f56518c168',
    signature: 'b87b904dd8d22586a7063c4cd68a6f0ab2b5a1ccf50d1d0238e084ab3f54f3e8',
    LOCAL_AUTH_URL: process.env.NODE_ENV == 'development' ? "http://localhost:3008" : "https://tripster-beta.vercel.app/",
    // mongodb://tripster:tripSter@64.227.177.4:27017/?authMechanism=DEFAULT
    MONGODB_URI: process.env.NODE_ENV == 'development' ? 'mongodb+srv://tripster:Kuchnahi021!@cluster0.gkfwuva.mongodb.net/' : 'mongodb+srv://tripster:Kuchnahi021!@cluster0.gkfwuva.mongodb.net/',
    GOOGLE_CLIENT_ID: '1029873607722-n24phnvjrhkj69afndg7kq947l9eumt4.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    SECRET: "wXljAz4IWrq1fhojbROM1VmGkLNNKayOxu7kN4Vqnhg=",
    HOTELBEDS_SMALL_IMAGE_PATH: "http://photos.hotelbeds.com/giata/small/",
    HOTELBEDS_MEDIUM_IMAGE_PATH: "http://photos.hotelbeds.com/giata/medium/",
    HOTELBEDS_IMAGE_PATH: "http://photos.hotelbeds.com/giata/",
    HOTELBEDS_LARGE_IMAGE_PATH: "http://photos.hotelbeds.com/giata/bigger/",
    STRIPE_KEY: "sk_test_51KbGjWASNWrmmoTBs7sFXuRcDAXNYPm98RFW0WnsAVcI3H5sdRXGYvqZQ4OKIeOPrSSN3xzfeEBkAGZ3lknEmM7C00AK2SCxOJ"
  },
  images: {
    unoptimized: true,
  },
};
