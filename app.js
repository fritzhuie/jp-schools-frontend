

// Tabview *****************************************************

const loginDiv = document.querySelector(".login")
const signupDiv = document.querySelector(".signup")
const inboxDiv = document.querySelector(".inbox")
const pollsDiv = document.querySelector(".polls")
const profileDiv = document.querySelector(".profile")
const friendFinderDiv = document.querySelector(".friend-finder")
const tabviewDiv = document.querySelector(".tabs")

// Singup page *************************************************
const phoneInput = document.getElementById("phone")
const usernameInput = document.getElementById("username")
const firstNameInput = document.getElementById("firstName")
const lastNameInput = document.getElementById("lastName")
const genderInput = document.getElementById("gender")

// profile page
const profileImage = document.querySelector("img[alt='Profile Image']");
const usernameElement = document.querySelector(".username");
const firstNameElement = document.querySelector(".first-name");
const lastNameElement = document.querySelector(".last-name");
const genderElement = document.querySelector(".gender");

let profile = null
let friends = null
let friendRequests = []
let polls = []

const TabView = {
    LOGIN: "login",
    SIGNUP: "signup",
    INBOX: "inbox",
    POLLS: "polls",
    PROFILE: "profile",
    FRIEND_FINDER: "friend-finder",
}

let currentView = TabView.signupDiv

function switchView(view) {
    signupDiv.hidden = true
    loginDiv.hidden = true
    inboxDiv.hidden = true
    pollsDiv.hidden = true
    profileDiv.hidden = true
    friendFinderDiv.hidden = true
    tabviewDiv.hidden = false

    switch (view) {
        case TabView.SIGNUP:
            signupDiv.hidden = false
            tabviewDiv.hidden = true
            break
        case TabView.INBOX:
            inboxDiv.hidden = false
            handleInboxView()
            break
        case TabView.POLLS:
            pollsDiv.hidden = false
            handlePollsView()
            break
        case TabView.PROFILE:
            profileDiv.hidden = false
            handleProfileView()
            break
        case TabView.FRIEND_FINDER:
            friendFinderDiv.hidden = false
            handleFriendFinderView
            break
    }

    currentView = TabView
}

function showLogin() {
    document.querySelector(".login").hidden = false
    document.querySelector(".signup").hidden = true
}

function showSignup() {
    document.querySelector(".login").hidden = true
    document.querySelector(".signup").hidden = false
}

function handleLogin() {
    const phoneInput = document.getElementById("phone-login")
    login(phoneInput.value)
}

function handleSignupSubmit() {

    const signupData = {
        phone: phoneInput.value,
        username: usernameInput.value,
        givenname: firstNameInput.value,
        familyname: lastNameInput.value,
        gender: genderInput.value
    }
  
    console.log(phoneInput)
    console.log(phoneInput.value)
    console.log(signupData)
    createProfile(signupData)
    .then((response) => { 
        if (response && response.status === 200) {
            console.log("Signup successful!")
            login(signupData.phone)
        }
    })
}

function handleInboxView() {
    
}

function handlePollsView() {

}

function handleProfileView() {
    getProfile()
    .then(response => {
        console.log('profile response: ', response.data)
        profile = response.data
    }).then(() => {
        profileImage.textContent = 
        usernameElement.textContent = document.querySelector(".username");
        firstNameElement.textContent = document.querySelector(".first-name");
        lastNameElement.textContent = document.querySelector(".last-name");
        genderElement.textContent = document.querySelector(".gender");
    })
}

function handleFriendFinderView() {

}


// AXIOS CALLS - Profile **************************************************************************************************
const baseUrl = "http://localhost:2000"

async function loadBearerToken() {
    console.log(localStorage.getItem("accessToken"))
    axios.interceptors.request.use( (config) => {
        const accessToken = localStorage.getItem("accessToken")
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error) => {
        return error
    })
}

async function login(phoneNumber) {
    // data = { "phone":"123456787" }
    try {
        const response = await axios.post(`${baseUrl}/social/login`, {phone: phoneNumber})
        const token = response.data.token
        if(token) {
            localStorage.setItem("accessToken", token)
            await loadBearerToken()
            console.log("loadBearerToken completed")
            switchView(tabviewDiv.FRIEND_FINDER)
            return
        } else {
            console.log("no token found in response")
            return
        }
    } catch (error) {
       console.log(`axios error in login: ${error}`)
    }
}

async function createProfile(data) {
    // data = { "phone":"123456787", "username": "test", "familyname": "huie", "givenname": "fritz" }
    const response = await axios.post(`${baseUrl}/social/signup`, data)
}

async function getProfile() {
    const response = await axios.get(`${baseUrl}/social/profile`, {
        timeout: 5000
    })
    console.log('profile response: ', response)
    return response.data
}

async function getProfileByPhone(phone) {
    const response = await axios.get(`${baseUrl}/social/profile/${phone}`)
}

async function updateAvatar(avatarUrl) {
    const response = await axios.put(`${baseUrl}/social/avatar`, avatarUrl)
}

// Friend finder *******************************************************************************************

async function getFriendRecommendations() {
    const response = await axios.get(`${baseUrl}/social/friend/finder`)
}


// Friend management ***************************************************************************************
async function inviteFriend(id) {
    const response = await axios.put(`${baseUrl}/social/friend/invite`, id)
}

async function acceptFriend(id) {
    const response = await axios.put(`${baseUrl}/social/friend/accept`, id)
}

async function denyFriend(id) {
    const response = await axios.put(`${baseUrl}/social/friend/deny`, id)
}

async function removeFriend(id) {
    const response = await axios.put(`${baseUrl}/social/friend/remove`, id)
    // id = { "phone": "123456789"}
}


// Polls ***************************************************************************************************
async function refreshPolls() {
    const response = await axios.get(`${baseUrl}/social/polls/refresh`)
}

async function getPolls() {
    const response = await axios.get(`${baseUrl}/social/polls`)
}

async function answerPoll(answerData) {
    const response = await axios.post(`${baseUrl}/social/polls/answer`, answerData)
}


// Inbox **************************************************************************************************
async function getInbox() {
    const response = await axios.get(`${baseUrl}/social/inbox`)
}