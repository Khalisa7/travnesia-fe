
import toastr from 'toastr'
window.toastr = toastr

export default class Alert {
  constructor() {
    toastr.options = {
      'closeButton': true,
      'debug': false,
      'newestOnTop': false,
      'progressBar': false,
      'positionClass': 'toast-top-right',
      'preventDuplicates': true,
      'onclick': null,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': '5000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    }
  }

  error(title, message) {
    toastr.error(message, title)
    return Promise.resolve(toastr)
  }

  success(title, message) {
    toastr.success(message, title)
    return Promise.resolve(toastr)
  }

  warning(title, message) {
    toastr.warning(message, title)
    return Promise.resolve(toastr)
  }
}
