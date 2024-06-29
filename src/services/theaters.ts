import ApiService from "./apiService"

interface ApiObject {
  method?: string
  authentication?: boolean
  endpoint?: string
  body?: any
}

export async function getAllTheaters(page: number, size: number) {
  const apiObject: ApiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `api/theaters?size=${size}&page=${page}`
  apiObject.body = null
  return await ApiService.callApi(apiObject)
}

export async function getTheaterById(theaterId: string): Promise<any> {
  const apiObject: ApiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `api/theaters/${theaterId}`
  apiObject.body = null
  return await ApiService.callApi(apiObject)
}

// theater api
export async function createTheater(theaterData: {
  title: string
  description: string
  releaseDate: Date
  director: string
  imageUrl?: string
}): Promise<any> {
  const apiObject: ApiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = true
  apiObject.endpoint = `api/theaters`
  apiObject.body = theaterData

  return await ApiService.callApi(apiObject)
}

// theater api
export async function updateTheater(
  theaterId: string,
  theaterData: {
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
  apiObject.endpoint = `api/theaters/${theaterId}`
  apiObject.body = theaterData

  return await ApiService.callApi(apiObject)
}

// theater api
export async function deleteTheater(theaterId: string): Promise<any> {
  const apiObject: ApiObject = {}
  apiObject.method = "DELETE"
  apiObject.authentication = true
  apiObject.endpoint = `api/theaters/${theaterId}`
  apiObject.body = null
  return await ApiService.callApi(apiObject)
}
