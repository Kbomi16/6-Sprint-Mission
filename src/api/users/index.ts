import axiosGetInstance from '../../lib/axiosGetInstance'

export async function getUsersMe() {
  try {
    const { data } = await axiosGetInstance.get('/users/me')
    return data
  } catch (error) {
    console.error('getUsersMe 함수에서 오류 발생:', error)
    throw error
  }
}
