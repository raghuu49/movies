Site-https://movies-hklf.vercel.app/

This is a simple movie search app which allows users to search for a movie and get details on it

Home Screen-
The Landing Page has three components, Search Bar,Trending Section and All movies section
Trending Section-demonstrates the currently trending movies and uses a algorithm which will be explained later on
All movies section-contains the top 20 popular movies currently according to TMDB and contains the rating,poster and name of the movie
Search Bar- allows users to search for movies, here i have applied debounce hook which saves api calls and reduces load on server
useDebounce() allows to read  a string certain time after the typing is stopped by the user to save load on server 

Algorithms and Backend-
AppWrite was used as Backend Service
I stored database on Appwrite and used the data to implement a algorithm for trending movies
The algorithm involved tracking clicks and searches to choose most popular movies and show them in trending section
