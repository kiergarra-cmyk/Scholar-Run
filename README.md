# [Scholar-Run] API

Backend API for **[Scholar-Run]**, a tournament game for the SorSU Bulan Campus library.  
CS 313 Software Engineering 1, A.Y. 2026-2027.

- Developer: Kier Espela Garra (`kiergarra-cmyk`), BSCS 3-1
- Group and game concept: Group 3

This is my own build of my group's game concept. Every commit in this repository was made by me, with Git, on my own computer or in my own Codespace.

## Tables

1. `users` — Stores user account and authentication information
2. `hosts` — Stores host/librarian account credentials and information
3. `players` — Stores player profile details
4. `locations` — Stores library location information for the tournament run
5. `tournament_sessions` — Represents an active or ended game room instance
6. `location_routes` — Stores paths and connections between locations
7. `questions` — Stores individual quiz questions and points
8. `session_players` — Tracks players joined in a tournament session
9. `question_choices` — Stores multiple-choice options for each question
10. `runs` — Records player game runs within sessions
11. `run_locations` — Tracks location progress and status during a player's run

## Database scripts

| Command | What it does |
|---|---|
| npm run db:migrate | Runs migrations that have not run yet |
| npm run db:migrate:status | Lists every migration as up or down |
| npm run db:seed | Loads the seed data |
| npm run db:check | Counts the rows in every table |
| npm run db:reset | Empties the database, rebuilds every table and reloads the seed data |
| npm run check | Runs the same automatic check that GitHub runs after every push |


## Tech stack

| Layer | Tool |
|---|---|
| Runtime | Node.js 22 LTS or newer |
| Web framework | Express 5 |
| Database | PostgreSQL 16 or newer |
| ORM and migrations | Sequelize 6 with sequelize-cli |

## Setup

```bash
git clone [https://github.com/kiergarra-cmyk/Scholar-Run.git](https://github.com/kiergarra-cmyk/Scholar-Run.git)
cd Scholar-Run
npm install