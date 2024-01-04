import axios from 'axios'

const loginDiv = document.querySelector(".login")
const signupDiv = document.querySelector(".signup")
const inboxDiv = document.querySelector(".inbox")
const pollsDiv = document.querySelector(".polls")
const profileDiv = document.querySelector(".profile")
const friendFinderDiv = document.querySelector(".friend-finder")

const TabView = {
  LOGIN: "login",
  SIGNUP: "signup",
  INBOX: "inbox",
  POLLS: "polls",
  PROFILE: "profile",
  FRIEND_FINDER: "friend-finder"
}

let currentView = TabView.signupDiv

function switchView(view) {
  loginDiv.hidden = true
  signupDiv.hidden = true
  inboxDiv.hidden = true
  pollsDiv.hidden = true
  profileDiv.hidden = true
  friendFinderDiv.hidden = true

  switch (view) {
    case TabView.LOGIN:
      loginDiv.hidden = false
      break
    case TabView.SIGNUP:
      signupDiv.hidden = false
      break
    case TabView.INBOX:
      inboxDiv.hidden = false
      break
    case TabView.POLLS:
      pollsDiv.hidden = false
      break
    case TabView.PROFILE:
      profileDiv.hidden = false
      break
    case TabView.FRIEND_FINDER:
      friendFinderDiv.hidden = false
      break
  }

  currentView = TabView
}

// TABVIEW CALLBACKS ************************************************************************************************

function handleLoginView() {
// Handle login view logic here
}

function handleSignupView() {
// Handle signup view logic here
}

function handleInboxView() {
// Handle inbox view logic here
}

function handlePollsView() {
// Handle polls view logic here
}

function handleProfileView() {
// Handle profile view logic here
}

function handleFriendFinderView() {
// Handle friend finder view logic here
}

// AXIOS CALLS **************************************************************************************************

const social = axios.create({
    baseURL: baseUrl // Replace with your actual server URL
  })
  
  // Signup endpoint
  social.post("/signup", {})
    .then(response => {
      // Handle successful signup
    })
    .catch(error => {
      // Handle signup error
    })
  
  // Your profile endpoint
  social.get("/profile")
    .then(response => {
      // Handle retrieved profile data
    })
    .catch(error => {
      // Handle profile fetching error
    })
  
  // Other people's profiles endpoint
  social.get("/profile/:phone", { params: { phone: phoneNumber } })
    .then(response => {
      // Handle retrieved profile data
    })
    .catch(error => {
      // Handle profile fetching error
    })
  
  // Update avatar endpoint
  social.put("/avatar", formData) // Assuming avatar data is in formData
    .then(response => {
      // Handle successful avatar update
    })
    .catch(error => {
      // Handle avatar update error
    })
  
  // Friend recommendations endpoint
  social.get("/friend/finder")
    .then(response => {
      // Handle retrieved friend recommendations
    })
    .catch(error => {
      // Handle friend finder error
    })
  
  // Friend list/invites endpoints
  social.put("/friend/remove", {})
    .then(response => {
      // Handle successful friend removal
    })
    .catch(error => {
      // Handle friend removal error
    })
  
  social.put("/friend/accept", {})
    .then(response => {
      // Handle successful friend acceptance
    })
    .catch(error => {
      // Handle friend acceptance error
    })
  
  social.put("/friend/deny", {})
    .then(response => {
      // Handle successful friend denial
    })
    .catch(error => {
      // Handle friend denial error
    })
  
  social.put("/friend/invite", {})
    .then(response => {
      // Handle successful friend invite
    })
    .catch(error => {
      // Handle friend invite error
    })
  
  // Opinion polls endpoints
  social.get("/polls/refresh")
    .then(response => {
      // Handle refreshed polls
    })
    .catch(error => {
      // Handle poll refresh error
    })
  
  social.get("/polls")
    .then(response => {
      // Handle retrieved polls
    })
    .catch(error => {
      // Handle poll fetching error
    })
  
  social.post("/polls/answer", {})
    .then(response => {
      // Handle successful poll answer submission
    })
    .catch(error => {
      // Handle poll answer submission error
    })
  
  // Inbox endpoint
  social.get("/inbox")
    .then(response => {
      // Handle retrieved inbox items
    })
    .catch(error => {
      // Handle inbox fetching error
    })
  