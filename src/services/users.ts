import ApiService from "./apiService"

interface ApiObject {
  method?: string
  authentication?: boolean
  endpoint?: string
  body?: any
  type?: any
}

// admin api
export async function getAllUsers(page: number, size: number): Promise<any> {
  const apiObject: ApiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = true
  apiObject.endpoint = `api/users?size=${size}&page=${page}`
  apiObject.body = null
  return await ApiService.callApi(apiObject)
}

export async function getUserById(userId: string): Promise<any> {
  const apiObject: ApiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = true
  apiObject.endpoint = `api/users/${userId}`
  apiObject.body = null
  return await ApiService.callApi(apiObject)
}

// admin api
export async function createUser(userCredentials: {
  username: string
  email: string
  password: string
  role: "Admin" | "Customer" | "TheaterOwner"
}): Promise<any> {
  const apiObject: ApiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = true
  apiObject.endpoint = `api/users/`
  apiObject.body = userCredentials
  return await ApiService.callApi(apiObject)
}

export async function updateUser(
  userId: string,
  userCredentials: {
    username: string
    email: string
    password: string
    role: "Admin" | "Customer" | "TheaterOwner"
  }
): Promise<any> {
  const apiObject: ApiObject = {}
  apiObject.method = "PUT"
  apiObject.authentication = true
  apiObject.endpoint = `api/users/${userId}`
  apiObject.body = userCredentials
  return await ApiService.callApi(apiObject)
}

// admin api
export async function deleteUser(userId: string): Promise<any> {
  const apiObject: ApiObject = {}
  apiObject.method = "DELETE"
  apiObject.authentication = true
  apiObject.endpoint = `api/users/${userId}`
  apiObject.body = null
  return await ApiService.callApi(apiObject)
}
