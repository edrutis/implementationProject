export default function checklogin(): boolean {
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
}
