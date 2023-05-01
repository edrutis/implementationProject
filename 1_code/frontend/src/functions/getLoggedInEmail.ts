import checklogin from "./checklogin";

export default function getLoggedInEmail() {
    if(!checklogin()){
        return
    }
    return JSON.parse(localStorage.getItem("token")!)["email"]

}