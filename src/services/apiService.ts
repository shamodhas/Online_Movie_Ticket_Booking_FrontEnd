import axios from "./axiosConfig"
import apiConfig from "./apiConfig"
import Cookies from "js-cookie"
import * as constant from "../configs/constant"
import CommoNFunc from "../utility/commonFunc"

async function callApi(apiObject: any) {
  let body = {}
  let headers: any
  const method = apiObject.method ? apiObject.method.toLowerCase() : "get"

  if (method === "post" || method === "put" || method === "patch") {
    body = apiObject.body ? apiObject.body : {}
  }

  headers = {
    "Content-Type": apiObject.urlencoded
      ? "application/x-www-form-urlencoded"
      : apiObject.multipart
      ? "multipart/form-data"
      : "application/json",
    Channel: "SYSTEM"
  }

  if (apiObject.authentication) {
    headers.Authorization = `Bearer ${Cookies.get(constant.ACCESS_TOKEN)}`
  }

  let serverUrl = apiConfig.serverUrl
  let basePath = apiConfig.basePath

  if (apiObject.basePath) {
    basePath = apiObject.basePath
  }

  const url = `${serverUrl}/${basePath ? `/${basePath}` : ""}${
    apiObject.endpoint
  }`

  let result

  try {
    const response = await axios.request({
      url,
      method,
      data: method !== "get" && method !== "delete" ? body : undefined,
      headers: headers
    })
    const responseData = response.data
    result = {
      ...responseData,
      success: true
    }
  } catch (error: any) {
    if (error !== undefined) {
      if (error.response === undefined) {
        result = {
          success: false,
          status: 5,
          result: "Your connection was interrupted",
          data: null
        }
      } else if (error.response.status === 401) {
        if (apiObject.type !== "AUTH") {
          Cookies.remove(constant.ACCESS_TOKEN)
          CommoNFunc.show(
            "Your session expired! Please login again..",
            "Session expired",
            CommoNFunc.SwalIconType.Error
          )
          window.location.replace("/new-page")
        }
        result = {
          success: false,
          status: 2,
          result: "Your session expired! Please login again..",
          data: null
        }
      } else if (error.response.status === 403) {
        result = {
          success: false,
          status: 2,
          result: "Access is denied.",
          data: null
        }
      } else if (error.response.status === 417) {
        result = {
          success: false,
          status: 2,
          result: "Oops! Something went wrong.",
          data: null
        }
      } else if (error.response.data !== undefined) {
        result = {
          success: false,
          status: 0,
          result: error.response.data.result
            ? error.response.data.result
            : "Sorry, something went wrong",
          data: null
        }
      } else {
        result = {
          success: false,
          status: 2,
          result: "Sorry, something went wrong.",
          data: null
        }
      }
    } else {
      result = {
        success: false,
        status: 2,
        result: "Your connection was interrupted!",
        data: null
      }
    }
  }
  return result
}

export default { callApi }
