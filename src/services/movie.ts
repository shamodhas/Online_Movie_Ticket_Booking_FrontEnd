import ApiService from "./apiService"

interface ApiObject {
  method?: string
  authentication?: boolean
  endpoint?: string
  body?: any
}

export async function getAllMovies(page: number, size: number) {
  const apiObject: ApiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `api/movies?size=${size}&page=${page}`
  apiObject.body = null
  return await ApiService.callApi(apiObject)
}

export async function getMovieById(theaterId: string): Promise<any> {
  const apiObject: ApiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = true
  apiObject.endpoint = `api/movies/${theaterId}`
  apiObject.body = null
  return await ApiService.callApi(apiObject)
}

// theater api
export async function createMovie(movieData: any): Promise<any> {
  const apiObject: ApiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = true
  apiObject.endpoint = `api/movies`
  apiObject.body = movieData
  return await ApiService.callApi(apiObject)
}

// theater api
export async function updateMovie(
  movieId: string,
  movieData: {
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
  apiObject.endpoint = `api/movies/${movieId}`
  apiObject.body = movieData

  return await ApiService.callApi(apiObject)
}

// theater api
export async function deleteMovie(movieId: string): Promise<any> {
  const apiObject: ApiObject = {}
  apiObject.method = "DELETE"
  apiObject.authentication = false
  apiObject.endpoint = `api/movies/${movieId}`
  apiObject.body = null
  return await ApiService.callApi(apiObject)
}
