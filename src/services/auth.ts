import ApiService from "./apiService"

interface ApiObject {
  method?: string
  authentication?: boolean
  endpoint?: string
  body?: any
  type?: any
  multipart?: boolean
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

export async function register(userData: FormData) {
  const apiObject: ApiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = false
  apiObject.endpoint = "api/auth/register"
  apiObject.body = userData
  apiObject.multipart = true
  apiObject.type = "AUTH"
  return await ApiService.callApi(apiObject)
}
