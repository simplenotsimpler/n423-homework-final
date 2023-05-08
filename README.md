# N423

## Author

Rebecca H.

## Homework Final

Vercel URL:
https://n423-homework-final.vercel.app/

## Notes

- Although this is a Next.js app, it is more of a client SPA than a server-based app.
- Mostly used vanilla React since Next.js is in process of redoing how they handle SSR, SSG, routing and data fetching. See https://nextjs.org/blog/next-13-4 which describes the updates that just came out of beta.
- As a result, useEffect and router.query is used for data fetching and checking params.
- In a production app, third-party libraries would be used for things like the toast notifications, etc.

## Known Issues

- Refresh of shows/[showId] page is blank
- Refresh of shows/[showId]/edit is blank/does not recognize logged in
- File input for image upload loses mouse cursor. It works, but you can't see it.

## What I learned

- If I were starting from scratch, I would make use of localStorage since state is not retained during refresh (rookie mistake).
- I would not useContext for the shows. It makes sense for the auth context but not shows.
- I would prefer to have set up REST API wrapper functions for the firebase calls, either in the native Next.js API folder or via Firebase functions. This would result in much cleaner code and allow the use of SWR, fetch or Axios.

## TODOS

- Catch firebase init issues
- Fix shows/[showId] & shows/[showId]/edit refresh issues
- Add timeout/interval to notifications
- Fix image upload cursor issue. Best option would be a third-party library that would also provide drag & drop & image preview.
