export async function authHeader(type: any) {
  const token = 'DPxFQi8jwup1ZAbPe21G6dU3JRSbW1jByAkVjl4LyLXFMktKDfpxfKhVRvxy0sDJ'

  if (token) {
    if (type === 'FormData') {
      return {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      }
    } else {
      return { Authorization: 'Bearer ' + token }
    }
  } else {
    localStorage.clear()
  }
}
