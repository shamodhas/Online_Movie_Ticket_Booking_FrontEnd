import ApiService from "./apiService"

interface ApiObject {
  method?: string
  authentication?: boolean
  endpoint?: string
  body?: any
}

export async function getAllScreenings(page: number, size: number) {
  const apiObject: ApiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `api/screenings?size=${size}&page=${page}`
  apiObject.body = null
  return await ApiService.callApi(apiObject)
}

export async function getScreeningById(screeningId: string): Promise<any> {
  const apiObject: ApiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `api/screenings/${screeningId}`
  apiObject.body = null
  return await ApiService.callApi(apiObject)
}

// theater api
export async function createScreening(screeningData: {
  title: string
  description: string
  releaseDate: Date
  director: string
  imageUrl?: string
}): Promise<any> {
  const apiObject: ApiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = true
  apiObject.endpoint = `api/screenings`
  apiObject.body = screeningData

  return await ApiService.callApi(apiObject)
}

// theater api
export async function updateScreening(
  screeningId: string,
  screeningData: {
    title?: string
    description?: string
    releaseDate?: Date
    director?: string
    imageUrl?: string
  }
): Promise<any> {
  const apiObject: ApiObject = {}
  apiObject.method = "PUT"
  apiObject.authentication = true
  apiObject.endpoint = `api/screenings/${screeningId}`
  apiObject.body = screeningData

  return await ApiService.callApi(apiObject)
}

// theater api
export async function deleteScreening(screeningId: string): Promise<any> {
  const apiObject: ApiObject = {}
  apiObject.method = "DELETE"
  apiObject.authentication = true
  apiObject.endpoint = `api/screenings/${screeningId}`
  apiObject.body = null
  return await ApiService.callApi(apiObject)
}
