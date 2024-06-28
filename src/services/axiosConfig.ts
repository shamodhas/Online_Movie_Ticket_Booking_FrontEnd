import axios from "axios"
import apiConfig from "./apiConfig"
import * as constant from "../configs/constant"
import Cookies from "js-cookie"
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
            Cookies.remove(constant.ACCESS_TOKEN)
            window.location.replace("/login")
          }
        })
        return
      }
      isRefresh = true

      const URL = `${apiConfig.serverUrl}/${apiConfig.basePath}/auth/refresh-token`

      const config = {
        headers: {
          Authorization: `Bearer ${Cookies.get(constant.ACCESS_TOKEN)}`,
          isRefreshToken: true
        }
      }

      let isAccessTokenRefreshed = false
      await axios
        .post(`${URL}`, {}, config)
        .then(async (res) => {
          await Cookies.set(constant.ACCESS_TOKEN, res.data.result)
          isAccessTokenRefreshed = true
        })
        .catch((err) => {
          throw err
          // window.location = constant.BASE_ROUTE_PATH+'/login';
        })
      if (isAccessTokenRefreshed) {
        error.config.headers["Authorization"] = `Bearer ${Cookies.get(
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
