# Test of Next.js on Google App Engine
This project is a minimal example of a Next.js app running on Google App Engine.

## How App Engine works
It grabs what we throw at it using `gcloud app deploy`, **BUILDS IT**, then runs it on a serverless platform. All the files are first uploaded to Google Cloud Storage, then it builds the app and takes the minified version of the app and hosts it on what's essentially Google Cloud Run.
 - use App Engine to manage the entire app
 - use Cloud Storage to view the app's files
 - use Logs Explorer to view the app's logs