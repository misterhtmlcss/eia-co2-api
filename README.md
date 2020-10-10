## Purpose

- Play with EIA API
- Do something new with MongoDB

## Requirements

- Internet connection
- Nodejs v10.x
- NPM v\*

## How to install and run locally

- `node -v` check to make sure your version is correct; see above requirements
- `npm install`
- Add your API key into the .env-rename file
- Add your mongodb connection string into the .env-rename file
- Rename .env-rename to .env
- Dev `npm run dev` or Prod `npm start`
- States available for testing are:
  - ```
    {
      name: "alabama",
      label: "AL.A",
    },
    {
      name: "alaska",
      label: "AK.A",
    },
    {
      name: "arizona",
      label: "AZ.A",
    },
    {
      name: "arkansas",
      label: "AR.A",
    },
    {
      name: "california",
      label: "CA.A",
    }
    ```

## Routes to test using Postman

- CO2 Emmissions from the year set in the params:
  - [GET] `/api/v1/state?year=1980&state=alabama`
- CO2 Sum of emmissions between the years for the state set in the params:
  - [GET] `/api/v1/tax?startYear=2003&endYear=2006&state=california`
- COS Emissions of the states targetted and the data is pushed to MongoDB:
  - [GET] `/api/v1/local`
  - [POST] `/api/v1/save?state1=alabama&state2=alaska&state3=california&state4=arizona`

## Caveats

- You'll need your own API Key from EIA
- You'll need your own MongDB Atlas Key
- It isn't configured to work in production

## Q&A

Who is this project for?

- No one. It's to meet a made up specification to test my ability to write a backend.

What is the performance criteria?

- None. As long as it runs and deploys then it's right.

# Author

- Roger Kondrat
- URL: rogerkondrat.com
- Twitter: @misterhtmlcss
- Last Updated: 07/10/2020 (DD/MM/YYYY)
