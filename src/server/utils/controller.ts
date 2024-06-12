export const handleSuccess = (data: any, message = 'success', code = 200) => {
  return {
    code,
    message,
    data
  }
}
