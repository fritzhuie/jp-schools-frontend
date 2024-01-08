# Compliment Social

## Description

_Compliment Social_ is a social networking application designed to spread positivity by allowing users to send each other pre-written compliments anonymously. Users can engage with one another by answering polls, which are at the heart of the compliment exchange mechanism.

## MVP Features

- **Basic Backend CRUD**: Fundamental create, read, update, and delete operations for user management.
- **Authentication**: Users can sign up and log into the platform.
- **Profiles**: Users can view and edit their profiles, including updating avatars.
- **Friend Recommendations**: Users can find new friends through our recommendation system.
- **Friend Management**: Users can send friend requests, accept requests, or deny them.
- **Polls**: Users can answer polls which are used to generate compliments sent to others.
- **Inbox**: A dedicated page where users can see compliments they have received.

## Stretch Goals (Completed)

- **Full-fledged Social Network**: A working social network with the following pages:
  - Login
  - Inbox
  - Profile/Friends List
  - Connect (for finding new friends)
- **Compliment Exchange**: Users can send and receive compliments via polls.

## Routes

Below are the API endpoints provided by _Compliment Social_:

```plaintext
POST   /signup            - Sign up a new user
GET    /profile           - Retrieve the profile of the logged-in user
GET    /profile/:phone    - Retrieve the profile by phone number
PUT    /avatar            - Update user avatar
GET    /friend/finder     - Get list of friend recommendations
PUT    /friend/remove     - Remove a friend
PUT    /friend/accept     - Accept a friend request
PUT    /friend/deny       - Deny a friend request
PUT    /friend/invite     - Invite a user to be friends
GET    /polls/refresh     - Refresh the list of polls
GET    /polls             - Get the list of polls
POST   /polls/answer      - Answer a poll
GET    /inbox             - Get the inbox messages
