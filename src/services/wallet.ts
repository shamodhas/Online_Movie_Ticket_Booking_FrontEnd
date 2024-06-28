import ApiService from "./apiService"

export async function getAllDriverWallet(
  page,
  pageSize,
  keyword,
  driverId,
  vehicleTypeId,
  date
) {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = true
  apiObject.endpoint = `admin/driverWallet/getAll/${page}/${pageSize}?text=${keyword}&driverId=${driverId}&vehicleTypeId=${vehicleTypeId}&date=${date}`
  apiObject.body = null
  return await ApiService.callApi(apiObject)
}

export async function GetDropDownVehicleType() {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = true
  apiObject.endpoint = `admin/vehicleType/getAll`
  apiObject.body = null
  return await ApiService.callApi(apiObject)
}

export async function AddPaymentBill(obj) {
  const apiObject = {}
  apiObject.method = "POST"
  apiObject.authentication = true
  apiObject.endpoint = `admin/commission-payment/add`
  apiObject.body = obj
  apiObject.notGroup = true
  return await ApiService.callApi(apiObject)
}

export async function UpdatePaymentBill(obj) {
  const apiObject = {}
  apiObject.method = "PUT"
  apiObject.authentication = true
  apiObject.endpoint = `admin/commission-payment/update`
  apiObject.body = obj
  apiObject.notGroup = true
  return await ApiService.callApi(apiObject)
}

export async function GetPaymentBillByStatus(
  page,
  pageSize,
  keyword,
  driverId,
  vehicleTypeId,
  status
) {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = true
  apiObject.endpoint = `admin/commission-payment/getAll/${page}/${pageSize}?text=${keyword}&driverId=${driverId}&vehicleTypeId=${vehicleTypeId}&status=${status}`
  apiObject.body = null
  return await ApiService.callApi(apiObject)
}
