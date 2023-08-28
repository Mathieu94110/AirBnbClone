# AirBnbClone using NextJs and tailwindCss

This project was create with 'npx create-next-app@latest' (https://nextjs.org/docs).

## Features

- Date and Calendar for book a listing.
- Search Functionality with Server side rendering.
- Mapbox to display the exact geo location.

## Try it out

https://air-bnb-clone-black.vercel.app/

**Warning:** You need a react-map-gl access-token see (https://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens).

## How to Run locally

```bash
$ git clone https://github.com/Mathieu94110/AirBnbClone.git
$ cd AirBnbClone
$ npm insstall
```

You will have to define a NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN variable on a '.env' file and set the following variables on next.config.js

```
  env: {
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
  },
```

Now run:

```bash
$ npm start
```

and visit http://localhost:3000.

## Screenshots

![home](public/airbnb-home.png?raw=true "Login")
![home](public/airbnb-home-2.png?raw=true "Home")
![home](public/airbnb-home-3.png?raw=true "Search")
![searchedResult](public/airbnb-searched-result.png?raw=true "Playlists")

## Screenshots mobiles

![home](public/airbnb-home-mobile.png?raw=true "Home")
![home](public/airbnb-home-2-mobiles.png?raw=true "Home")
![searchedResult](public/airbnb-searched-result-mobiles.png?raw=true "searchedResult")
