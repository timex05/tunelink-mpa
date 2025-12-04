# TuneLink Multi-Page Application (MPA)

This repository contains the static frontend for TuneLink (Multi-Page Application). It provides HTML, CSS and client-side JavaScript that interact with the TuneLink backend API.

## Summary

The TuneLink MPA is a simple, static frontend that supports browsing and managing linktrees, user profiles, authentication flows, and basic social interactions such as likes and comments. It is intended to be used together with the TuneLink backend (Express + Prisma).

## Key Features

- Client-side authentication integration (JWT and Google OAuth flows)
- Create, edit and delete linktrees (collections of music links)
- User profile management and avatar updates
- Like and comment interactions for linktrees
- Static deployment friendly (no server-side rendering required)

## Requirements

- A running TuneLink backend API. See the [TuneLink Backend](https://github.com/timex05/tunelink-backend) for setup instructions.
- A static web server to serve the files (for local preview a simple HTTP server is sufficient).
- set ur backend- and frontenddomain in `js/genral.js`

## Local preview

Because the frontend is static, you can preview it with any static file server. Example options:

1. VS Code: Use the Live Server extension.
2. Python (from the project root):

```powershell
python -m http.server 5500
```

Open `http://127.0.0.1:5500` in your browser (or the address/port you choose).

If your backend runs on a different host or port, adjust the API base URL in `js/general.js` (the `backendDomain` variable).



## License

See the `LICENSE` file in this repository.

## References

### Main

- [Main TuneLink project](https://github.com/timex05/tunelink-main)

### Frontend

- [TuneLink Mulit Page Application (mpa)](https://github.com/timex05/tunelink-mpa)
- [TuneLink Single Page Application (spa)](https://github.com/timex05/tunelink-spa)

### Backend

- [TuneLink REST-Api](https://github.com/timex05/tunelink-rest)
