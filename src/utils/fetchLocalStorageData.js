export const fetchUser = () =>{
    const userInfo =
    localStorage.getItem("user") !== "underfind"
    ? JSON.parse(localStorage.getItem("user"))
    : localStorage.clear();

    return userInfo;
}