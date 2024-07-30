const SETTINGS = {
    // BASE_URL: "http://localhost:4000",
    // BASE_URL: "http://10.0.0.1:4000",
    // BASE_URL: "http://192.168.0.105:4000",
    BASE_URL: `http://${window.location.hostname}:4000`
}
console.log(window.location.hostname)
export default SETTINGS;