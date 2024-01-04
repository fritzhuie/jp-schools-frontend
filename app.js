
// TABVIEW ******************************************************************************************

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
    FRIEND_FINDER: "friend-finder",
}

let currentView = TabView.signupDiv

function switchView(view) {
    inboxDiv.hidden = true
    pollsDiv.hidden = true
    profileDiv.hidden = true
    friendFinderDiv.hidden = true

    switch (view) {
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

function handleInboxView() {
    
}

function handlePollsView() {

}

function handleProfileView() {

}

function handleFriendFinderView() {

}


// AXIOS CALLS - Profile **************************************************************************************************
const baseUrl = "localHost:2000"

async function createProfile(data) {
    const response = await axios.post(`${baseUrl}/social/signup`, data)
    // data = { "phone":"123456787", "username": "test", "familyname": "huie", "givenname": "fritz" }
}

async function getProfile() {
    const response = await axios.get(`${baseUrl}/social/profile`)
}

async function getProfileByPhone(phone) {
    const response = await axios.get(`${baseUrl}/social/profile/${phone}`);
}

async function updateAvatar(avatarUrl) {
    const response = await axios.put(`${baseUrl}/social/avatar`, avatarUrl);
}

// Friend finder *******************************************************************************************
async function getFriendRecommendations() {
    const response = await axios.get(`${baseUrl}/social/friend/finder`);
}


// Friend management ***************************************************************************************
async function inviteFriend(id) {
    const response = await axios.put(`${baseUrl}/social/friend/invite`, id);
}

async function acceptFriend(id) {
    const response = await axios.put(`${baseUrl}/social/friend/accept`, id);
}

async function denyFriend(id) {
    const response = await axios.put(`${baseUrl}/social/friend/deny`, id);
}

async function removeFriend(id) {
    const response = await axios.put(`${baseUrl}/social/friend/remove`, id)
    // id = { "phone": "123456789"}
}


// Polls ***************************************************************************************************
async function refreshPolls() {
    const response = await axios.get(`${baseUrl}/social/polls/refresh`);
}

async function getPolls() {
    const response = await axios.get(`${baseUrl}/social/polls`);
}

async function answerPoll(answerData) {
    const response = await axios.post(`${baseUrl}/social/polls/answer`, answerData);
}


// Inbox **************************************************************************************************
async function getInbox() {
    const response = await axios.get(`${baseUrl}/social/inbox`);
}