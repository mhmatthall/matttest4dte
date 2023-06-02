# Test of Next.js on Google App Engine
This project is a minimal example of a Next.js app running on Google App Engine.

[**View this project live at: https://mattgcloudtest4dte.nw.r.appspot.com/**](https://mattgcloudtest4dte.nw.r.appspot.com)

## How App Engine works
It grabs what we throw at it using `gcloud app deploy`, **BUILDS IT**, then runs it on a serverless platform. All the files are first uploaded to Google Cloud Storage, then it builds the app and takes the minified version of the app and hosts it on what's essentially Google Cloud Run.
 - use App Engine to manage the entire app
 - use Cloud Storage to view the app's files
 - use Logs Explorer to view the app's logs

## What it's missing
- Integration with Google Datastore (for actual backend data storage)
- Integration with Github Actions (for CI/CD; [see addon](https://github.com/google-github-actions/deploy-appengine))
- Final frontend content and structure. It has all the required libs, but doesn't yet follow any of our conventions.