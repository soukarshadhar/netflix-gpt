# NetflixGPT

1. First setup the project using `npx create-react-app netflix-gpt`.
2. Configured bootstrap by installing `react-bootstrap` and `bootstrap`.
3. import `bootstrap/dist/css/bootstrap.min.css` in `index.js` to include bootstrap css into the project
4. Configured routing using `react-router-dom`
5. Routing implemented in app
6. Implement Header and Landing page
7. Implement Login and signup page
8. Custom form validation implemented
9. Project is setup with firebase and app can be deployed into production using firebase hosting service
10. Learnt about useRef hook
11. Create user implemented using firebase auth service
12. User login implemented using firebase auth service
13. Project is setup with Redux store
14. Implemented - On login or signup user detail is stored in the redux store
15. Implemented - On successful login or signup user is navigated to browse page
16. Implemented - On logout from browse page user is navigated back to home page
17. If user is logged in and visits `/login` or `/signup` or `/` page then redirect user to `/browse` page
18. If user is logged out and visits `/browse` page then redirect user to `/` page
19. Integrated the app with TMDB APIs for movies and TV shows
20. Implemented - Trending movie clips will be shown on the background and will play in loop
21. Implemented - Now playing and top rated movie list to be shown in horizontal scroll mode
22. Used YouTube iframe API to show clips related to trending movies
23. Implemented `useFetchList` and `useFetchTrending` to fetch data from TMDB API
24. Secured API Keys from being public
25. All API calls memoization implemented i.e. if data is available in redux store, no need to fetch again
26. Event delegation implemented in the navbar for tab selection
27. `Get Started` page integrated with `login` and `signup` page i.e if new user redirect to `signup` page and for existing user redirect to `login` page, used firestore to save user info.
28. Fixed: for authenticated user, when in `browse` page and page is refreshed then user must stay in `browse` page.
29. Implemented: responsive view of the app
30. `Browse` page main video must play through all the videos available for the movie / tv show

# Features

1. Login and Signup page

- Login page
- Signup page
- After authentication redirect to browse page

2. Browse page

- Trailer video playing in background
- Movie title and some description on top of video
- Movie lists \* n

3. GPT page

- Search bar
- Movie suggestion
