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
  apiObject.endpoint = `movie/all?size=${size}&page=${page}`
  apiObject.body = null
  return await ApiService.callApi(apiObject)
}

export async function getMovieDetails(movieId: string): Promise<any> {
  const apiObject: ApiObject = {
    method: "GET",
    authentication: false,
    endpoint: `movie/${movieId}`,
    body: null
  }
  return await ApiService.callApi(apiObject)
}

export async function createMovie(movieData: any): Promise<any> {
  const apiObject: ApiObject = {
    method: "POST",
    authentication: false,
    endpoint: `movie`,
    body: movieData
  }
  return await ApiService.callApi(apiObject)
}

export async function updateMovie(
  movieId: string,
  updatedData: any
): Promise<any> {
  const apiObject: ApiObject = {
    method: "PUT",
    authentication: false,
    endpoint: `movie/${movieId}`,
    body: updatedData
  }
  return await ApiService.callApi(apiObject)
}

export async function deleteMovie(movieId: string): Promise<any> {
  const apiObject: ApiObject = {
    method: "DELETE",
    authentication: false,
    endpoint: `movie/${movieId}`,
    body: null
  }
  return await ApiService.callApi(apiObject)
}
