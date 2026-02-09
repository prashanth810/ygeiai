import Baseurl from "./Baseurl";

export const loginApi = (data) => Baseurl.post("/login", data);
