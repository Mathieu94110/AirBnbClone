module.exports = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "static8.depositphotos.com",
      "static9.depositphotos.com",
      "st2.depositphotos.com",
      "st3.depositphotos.com",
      "st4.depositphotos.com",
      "static3.depositphotos.com",
      "st.depositphotos.com",
      "news.airbnb.com",
      "a0.muscache.com",
      "www.expatkings.com",
      "www.smartertravel.com",
      "cdn.bisnow.net",
      "media.cntraveler.com",
      "static.trip101.com",
      "image.insider.com",
      "res.cloudinary.com"
    ],
  },
  env: {
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  },

};
