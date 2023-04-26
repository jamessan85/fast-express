const login = document.querySelector("#login")
const secret = document.querySelector("#secret")
const secretMessage = document.querySelector("#secretMessage")
console.log(secretMessage)
const API = "http://localhost:3010"

console.log(login)

const loginRequest = (path) => {
    return fetch(API + path, {method: "POST"}).then(res => res.json()).then(data => { 
        window.sessionStorage.setItem("accessToken", data.accessToken)
    })
}

const getAccessToken = () => {
    return window.sessionStorage.getItem("accessToken")
}

const makeRequest = ({url, body, method}) => {
    return fetch(API + "/checkToken", {method: "POST", headers: {Authorization: getAccessToken()}})
    .then(res => res.json())
    .then(data => { 
        console.log("ehere")
        window.sessionStorage.setItem("accessToken", data.accessToken)
        return fetch(API + url, {
            method,
        })
    })
}

login.addEventListener("click", async () => {
    loginRequest("/login")
})

secret.addEventListener("click", async (e) => {
    try {
        e.preventDefault()
        const res = await makeRequest({url: "/secret", method: "POST"})
        const data = await res.text()
        secretMessage.textContent = secretMessage.textContent + data
    } catch (error) {
        console.log(error)
    }
})
