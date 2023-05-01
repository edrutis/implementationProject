export default function getUserType(): string {
  let userType = undefined;
  if (localStorage.getItem("token")) {
    userType = JSON.parse(localStorage.getItem("token") ?? "")["type"] ?? null;
  }
  return userType;
}
