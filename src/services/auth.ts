import ApiService from "./apiService"

export async function signIn(userCredentials) {
  const apiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = false
  apiObject.endpoint = "auth/signIn"
  apiObject.body = userCredentials
  apiObject.type = "AUTH"
  return await ApiService.callApi(apiObject)
}

export async function createNewUser(userCredentials) {
  const apiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = false
  apiObject.endpoint = "auth/signUp"
  apiObject.body = userCredentials
  apiObject.type = "AUTH"
  return await ApiService.callApi(apiObject)
}

export async function changePassword(userCredentials) {
  const apiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = true
  apiObject.endpoint = "auth/changePassword"
  apiObject.body = userCredentials
  return await ApiService.callApi(apiObject)
}

export async function getUserDetailByUserId(id) {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = true
  apiObject.endpoint = `auth/getUserById/${id}`
  apiObject.body = null
  apiObject.notGroup = true
  return await ApiService.callApi(apiObject)
}
