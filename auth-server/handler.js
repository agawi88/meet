'use strict';

const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ["https://meet-agnieszkas-projects-7d095870.vercel.app/"];

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    redirect_uris[0]
);

module.exports.getAuthURL = async () => {
    console.log("CLIENT_ID:", process.env.CLIENT_ID);
    console.log("CLIENT_SECRET:", process.env.CLIENT_SECRET);
    console.log("CALENDAR_ID:", process.env.CALENDAR_ID);

  const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            authUrl,
        }),
    };
};

module.exports.getAccessToken = async (event) => {
    const code = decodeURIComponent(`${event.pathParameters.code}`);
    return new Promise((resolve, reject) => {
      /**
       *  Exchange authorization code for access token with a “callback” after the exchange,
       *  The callback in this case is an arrow function with the results as parameters: “error” and “response”
       */
      oAuth2Client.getToken(code, (error, response) => {
        if (error) {
          return reject(error);
        }
        return resolve(response);
      });
    })
      .then((results) => {
        // Respond with OAuth token
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify(results),
        };
      })
      .catch((error) => {
        // Handle error
        return {
          statusCode: 500,
          body: JSON.stringify(error),
        };
      });
};
module.exports.getCalendarEvents = async (event) => {
    const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);

    oAuth2Client.setCredentials({ access_token });

    return new Promise((resolve, reject) => {
      /**
       *  Exchange authorization code for access token with a “callback” after the exchange,
       *  The callback in this case is an arrow function with the results as parameters: “error” and “response”
       */
     calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  })
    .then((results) => {
        // Respond with OAuth token
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ events: results.data.items }),
        };
      })
      .catch((error) => {
        // Handle error
        return {
          statusCode: 500,
          body: JSON.stringify(error),
        };
      });
};
