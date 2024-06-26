import toastr from "toastr"
import Swal from "sweetalert2"

export enum MessageType {
  Warning = "warning",
  Error = "error",
  Success = "success",
  Info = "info"
}

export const notifyMessage = (
  type: MessageType,
  msg: string,
  title?: string,
  place?: string,
  duration?: number
) => {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: place ? `toast-top-${place}` : "toast-top-right",
    preventDuplicates: true,
    showDuration: 5000,
    hideDuration: 2500,
    timeOut: duration ? duration : 4500,
    extendedTimeOut: 2500,
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
  }

  toastr[type](msg || type, title || type)
}

enum SwalIconType {
  Warning = "warning",
  Error = "error",
  Success = "success",
  Info = "info"
}

const show = (
  title: string,
  text: string,
  icon: SwalIconType,
  callBackConfirum?: () => void
) => {
  Swal.fire({
    title,
    text,
    icon
  }).then((result) => {
    if (result.isConfirmed) {
      if (callBackConfirum) {
        callBackConfirum()
      }
    } else {
    }
  })
}

const CommoNFunc = {
  MessageType,
  notifyMessage,
  SwalIconType,
  show
}

export default CommoNFunc
