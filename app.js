

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
const profileImage = document.querySelector("img[alt='Profile Image']")
const usernameElement = document.querySelector(".username")
const firstNameElement = document.querySelector(".first-name")
const lastNameElement = document.querySelector(".last-name")
const genderElement = document.querySelector(".gender")

// friend recommendations
const friendRecommendations = document.getElementById("friend-recommendation-container")

// polls
const polls = document.getElementById("poll-container")

//inbox
const inboxContainer = document.getElementById("inbox-container")

let currentView = null

const TabView = {
    LOGIN: "login",
    SIGNUP: "signup",
    INBOX: "inbox",
    POLLS: "polls",
    PROFILE: "profile",
    FRIEND_FINDER: "friend-finder",
}

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
            handleFriendFinderView()
            break
    }

    currentView = view
}

// USER INPUT CALLS ***********************************************************************************************

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
    renderInbox()
}

function handlePollsView() {
    renderNewPoll()
}

function handleProfileView() {
    getProfile()
    .then(response => {
        console.log('profile response: ', response)
        const profile = response
        return profile
    }).then((profile) => {
        profileImage.src = `./img/${profile.avatar}`
        usernameElement.textContent = "@" + profile.username
        firstNameElement.textContent = profile.givenname
        lastNameElement.textContent = profile.familyname
        genderElement.textContent = profile.gender
    })
}

function handleFriendFinderView() {
    getFriendRecommendations()
    .then(response => {
        console.log('friend finder responded', response)
        return response.data
    }).then(friendRecommendations => {
        console.log(friendRecommendations)
        clearFriendRecommendations()
        for(const user of friendRecommendations) {
            appendFriendRecommendation(user)
        }
    })
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
        return config
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
            switchView(TabView.PROFILE)
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
    const response = await axios.get(`${baseUrl}/social/profile`, {})
    console.log('getProfile() returning: ', response)
    return response.data
}

async function getProfileByPhone(phone) {
    const response = await axios.get(`${baseUrl}/social/profile/${phone}`)
    console.log('getProfile() returning: ', response)
    return response.data
}

async function updateAvatar(avatarUrl) {
    const response = await axios.put(`${baseUrl}/social/avatar`, avatarUrl)
}


// Friend management ***************************************************************************************

async function getFriendRecommendations() {
    const response = await axios.get(`${baseUrl}/social/friend/finder`)
    console.log('getFriendRecommendations() returning', response)
    return response
}

async function inviteFriend(id) {
    const response = await axios.put(`${baseUrl}/social/friend/invite`, { phone: id })
}

async function acceptFriend(id) {
    const response = await axios.put(`${baseUrl}/social/friend/accept`, { phone: id })
}

async function denyFriend(id) {
    const response = await axios.put(`${baseUrl}/social/friend/deny`, { phone: id })
}

async function removeFriend(id) {
    const response = await axios.put(`${baseUrl}/social/friend/remove`, { phone: id })
    // id = { "phone": "123456789"}
}


// Polls ***************************************************************************************************
async function refreshPolls() {
    const response = await axios.get(`${baseUrl}/social/polls/refresh`)
}

async function getPolls() {
    const response = await axios.get(`${baseUrl}/social/polls`)
    console.log(response)
    return response.data.response
}

async function answerPoll(poll, chosen) {
    const response = await axios.post(`${baseUrl}/social/polls/answer`, { poll: poll, chosen: chosen})
}


// Inbox **************************************************************************************************
async function getInbox() {
    const response = await axios.get(`${baseUrl}/social/inbox`)
    return response.data.response
}

// General HTML functions ***************************

function clearFriendRecommendations() {
    while (friendRecommendations.firstChild) {
        friendRecommendations.removeChild(friendRecommendations.firstChild)
    }
}

function appendFriendRecommendation(user) {
    const containerDiv = document.createElement("div")
    containerDiv.classList.add("friend-recommendation")

    containerDiv.appendChild(createFriendDataElement("img", user.avatar))
    containerDiv.appendChild(createFriendDataElement("h3", user.username))
    containerDiv.appendChild(createFriendDataElement("p", user.givenname))
    containerDiv.appendChild(createFriendDataElement("p", user.familyname))
    const addButton = document.createElement("button")
    addButton.textContent = "Send friend request"
    addButton.onclick = () => {
        console.log("sending request to: ", user.phone)
        inviteFriend(user.phone)
        .then(() => { 
            console.log("Friend request sent to: ", user.phone)
            addButton.hidden = true 
        })
        .catch(e => { console.log(e) })
    }
    containerDiv.appendChild(addButton)

    
    function createFriendDataElement(type, value) {
        const element = document.createElement(type)
        element.textContent = value
        return element
    }

    friendRecommendations.appendChild(containerDiv)
}

function displayPollElement(pollData) {
    const containerDiv = document.createElement("div")
    containerDiv.classList.add("poll")

    const emoji = document.createElement("h1")
    const message = document.createElement("h3")
    emoji.textContent = pollData.emoji
    message.textContent = pollData.message
    containerDiv.appendChild(emoji)
    containerDiv.appendChild(message)

    const choice0 = pollData.senderData[0].firstname + " " + pollData.senderData[0].lastname.slice(0,1)
    const choice1 = pollData.senderData[1].firstname + " " + pollData.senderData[1].lastname.slice(0,1)
    const choice2 = pollData.senderData[2].firstname + " " + pollData.senderData[2].lastname.slice(0,1)
    const choice3 = pollData.senderData[3].firstname + " " + pollData.senderData[3].lastname.slice(0,1)

    console.log("poll object:", pollData)
    console.log("poll id: ", pollData._id.toString())

    containerDiv.appendChild(createChoiceButton(choice0, pollData._id.toString(), pollData.choices[0]))
    containerDiv.appendChild(createChoiceButton(choice1, pollData._id.toString(), pollData.choices[1]))
    containerDiv.appendChild(createChoiceButton(choice2, pollData._id.toString(), pollData.choices[2]))
    containerDiv.appendChild(createChoiceButton(choice3, pollData._id.toString(), pollData.choices[3]))

    function createChoiceButton(choice, pollId, chosen) {
        console.log("chosen: ", chosen)
        const addButton = document.createElement("button")
        addButton.textContent = choice
        addButton.onclick = () => {
            console.log("answering poll with: ", chosen)
            const response = answerPoll(pollId, chosen)
            .then(() => { 
                polls.removeChild(containerDiv)
                renderNewPoll()
            })
            .catch(e => { console.log(e) })
        }
        return addButton
    }

    polls.appendChild(containerDiv)
}

async function renderNewPoll() {
    while (polls.firstChild) {
        polls.removeChild(polls.firstChild)
    }

    try {
        const pollsList = await getPolls()
        console.log("polls from mongo:", pollsList)

        if (!pollsList[0]) { 
            console.log("no polls left")
            const noMorePollsView = document.createElement("div")
            noMorePollsView.classList.add("poll")

            const message = document.createElement("h3")
            message.textContent = "No more polls :("

            noMorePollsView.appendChild(message)
            polls.appendChild(noMorePollsView)
            return
        }

        let nextPoll = pollsList[0]

        console.log("rendering poll:", nextPoll)
        nextPoll.senderData = []
        for(const id of nextPoll.choices) {
            console.log("pulling: ", id)
            const user = await getProfileByPhone(id)
            console.log(user)
            const c = {
                firstname: user.givenname,
                lastname: user.familyname,
                avatar: user.avatar
            }
            nextPoll.senderData.push(c)
        }
        console.log("added sender id to: ", nextPoll)
        displayPollElement(nextPoll)
    } catch (error) {
        console.log("poll created failed: ", error)
    }
}

async function renderInbox() {

    while (inboxContainer.firstChild) {
        inboxContainer.removeChild(inboxContainer.firstChild)
    }

    inboxContainer.removeChild

    const inboxData = await getInbox()
    console.log(inboxData)

    for(const inboxItem of inboxData) {
        const containerDiv = document.createElement("div")
        containerDiv.classList.add("inbox-item")

        const emoji = document.createElement("h1")
        const message = document.createElement("h3")
        emoji.textContent = inboxItem.emoji
        message.textContent = inboxItem.message
        containerDiv.appendChild(emoji)
        containerDiv.appendChild(message)
        inboxContainer.appendChild(containerDiv)
    }
}