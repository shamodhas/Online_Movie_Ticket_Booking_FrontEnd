import axios from "axios"
import apiConfig from "./apiConfig"
import * as constant from "../configs/constant"
import Swal from "sweetalert2"
let isRefresh = false
const instance = axios

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response ? error.response.status : 0
    if (status === 401) {
      if (isRefresh) {
        Swal.fire({
          title: "Session expired. Please login again",
          showCancelButton: false,
          confirmButtonText: "Okay"
        }).then((result: any) => {
          if (result.isConfirmed) {
            localStorage.removeItem(constant.ACCESS_TOKEN)
            window.location.replace("/login")
          }
        })
        return
      }
      isRefresh = true

      const URL = `${apiConfig.serverUrl}/api/auth/refresh-token`

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            constant.ACCESS_TOKEN
          )}`,
          isRefreshToken: true
        }
      }

      let isAccessTokenRefreshed = false
      await axios
        .post(`${URL}`, {}, config)
        .then(async (res: any) => {
          await localStorage.setItem(constant.ACCESS_TOKEN, res.data.result)
          isAccessTokenRefreshed = true
        })
        .catch((err) => {
          throw err
          window.location.replace("/login")
        })
      if (isAccessTokenRefreshed) {
        error.config.headers["Authorization"] = `Bearer ${localStorage.getItem(
          constant.ACCESS_TOKEN
        )}`
        return axios.request(error.config)
      }
    } else {
      return Promise.reject(error)
    }
  }
)
export default instance
