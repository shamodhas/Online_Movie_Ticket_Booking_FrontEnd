import ApiService from "./apiService"

interface ApiObject {
  method?: string
  authentication?: boolean
  endpoint?: string
  body?: any
}

export async function getAllBookings(page: number, size: number) {
  const apiObject: ApiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `api/bookings?size=${size}&page=${page}`
  apiObject.body = null
  return await ApiService.callApi(apiObject)
}

export async function getBookingById(bookingId: string): Promise<any> {
  const apiObject: ApiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = false
  apiObject.endpoint = `api/bookings/${bookingId}`
  apiObject.body = null
  return await ApiService.callApi(apiObject)
}

// theater api
export async function createBooking(bookingData: {
  title: string
  description: string
  releaseDate: Date
  director: string
  imageUrl?: string
}): Promise<any> {
  const apiObject: ApiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = true
  apiObject.endpoint = `api/bookings`
  apiObject.body = bookingData

  return await ApiService.callApi(apiObject)
}

// theater api
export async function cancelBooking(bookingId: string): Promise<any> {
  const apiObject: ApiObject = {}
  apiObject.method = "DELETE"
  apiObject.authentication = true
  apiObject.endpoint = `api/bookings/${bookingId}`
  apiObject.body = null
  return await ApiService.callApi(apiObject)
}
