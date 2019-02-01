const makeResponse = (code, data = {}, message = '') => {
  switch (code) {
    case 200:
      message = 'Login successfully.'
      break
    case 201:
      message = 'Register successfully.'
      break
    case 400:
      message = 'An error has ocurred.'
      break
    case 401:
      message = 'Invalid username or password.'
      break
    case 402:
      message = 'Name has existed.'
      break
    case 403:
      message = 'Register failed.'
      break
    dafault
      break
  }

  return { code, message, data }
}

exports.makeResponse = makeResponse
