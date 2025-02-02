# Project Name

<br>



## Description

An app that let's you look for beers , add it to your favorites list, to drink list, drank list, review them, add your favorite pairings for it and even recommend it to your friends.



<br>

## User Stories

- **404** - A custom page for the 404 error
- **500** - A custom page for the 500 error
- **homepage** - A page that shows a random beer and gives you access to login, signup and a top ten list
- **sign up** - A sign up button that only shows if you are not logged in
- **login** - A login button that only shows if you are not logged in
- **logout** - A logout button that only shows if you are logged in
- **favorite list** - As a user I want to see the list of my favorite and delete them.
- **to drink list** As a user i want to see my list of to drink beers
- **drank list** As a user i want to keep track of all the beers i drank
- **edit user** - As a user I want to be able to edit my profile.
- **result** - As a user I want to see the list of beer filter by my preferences.




<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | {  email, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | { username, email, password  }                                    |
| `GET`      | `/user/edit-profile`            | Private route. Renders `edit-profile` form view.             |                                                          |
| `POST`      | `/user/edit-profile`            | Private route. Sends edit-profile info to server and updates user in DB. | { email, password,  [userName], [firstName], [lastName], [imageUrl] } |
| `GET`      | `/private/favorites`               | Private route. Render the `favorites` view.                  |                                                          |
| `POST`     | `/user/favorites/`              | Private route. Adds a new favorite for the current user.     | { beer_name }                                 |
| `DELETE`   | `/user/favorites/:beerId` | Private route. Deletes the existing favorite from the current user. |                                                          |
| `GET`     | `/user/to-drink/`              |Private route. Render the `to drink` view.                                 |
| `POST`   | `/user/to-drink/` | Private route. Adds a new to drink beer for the current user. |  {beer_name}                                                        |                                                         |
| `DELETE`   | `/user/to-drink/:beerId` | Private route. Deletes the existing favorite beer from the current user. |                                                          |                                        |
| `GET`   | `/user/drank/` | Private route with the drank beers list. |                                                          |                                                         |
| `POST`   | `/user/drank/` | Private route. Adds a new drank beer to the list.| {beer_name}  |                                                         |
| `DELETE`   | `/user/drank/:beerId` | Private route. Deletes the existing drank beer from the current user. | 





## Models

User model

```javascript
{
  name: String,
  email: String,
  password: String,
  favorites: [FavoriteId],
}

```



Favorites model

```javascript
{
  placeId: String,
  review: String,
  rating: Number
}

```



<br>

## API's
https://beer-list.p.rapidapi.com/

<br>


## Packages



<br>



## Backlog

[See the Trello board.](https://trello.com/b/Ni3giVKf/ironhackproject)



<br>



## Links



### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/JRaposo22/Project-Two-BeerApp)

[Deploy Link](https://brew-pal.cyclic.app/)



<br>



### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing)

### Contributors
João Raposo - [`<github-JRaposo22>`](https://github.com/JRaposo22) - [`<linkedin-profile-link>`](www.linkedin.com/in/joãofraposo)

João Carneiro - [`<github-joao621119>`](https://github.com/joao621119) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person2-username)