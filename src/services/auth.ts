import ApiService from "./apiService"

interface ApiObject {
  method?: string
  authentication?: boolean
  endpoint?: string
  body?: any
  type?: any
}

export async function login(userCredentials: {
  username: string
  password: string
}) {
  const apiObject: ApiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = false
  apiObject.endpoint = "api/auth/login"
  apiObject.body = userCredentials
  apiObject.type = "AUTH"
  return await ApiService.callApi(apiObject)
}

export async function register(userCredentials: {
  username: string
  email: string
  password: string
  role: "Admin" | "Customer" | "TheaterOwner"
}) {
  const apiObject: ApiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = false
  apiObject.endpoint = "api/auth/register"
  apiObject.body = userCredentials
  apiObject.type = "AUTH"
  return await ApiService.callApi(apiObject)
}