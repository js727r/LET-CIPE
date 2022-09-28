import Vue from 'vue'
import VueCookies from 'vue-cookies'
import { apiInstance } from '.'
Vue.use(VueCookies)
const api = apiInstance()

// const interceptor = interceptorInstance()

// 사용자 로그인
async function login(user, success, fail) {
  await api
    .post(`/api/user/login`, JSON.stringify(user))
    .then(success)
    .catch(fail)
}

// 사용자 id, nickname 얻어오기
async function readUser(success, fail) {
  // await interceptor({
  //   url: `/user`,
  //   method: 'get',
  // })
  // console.log(document.cookie.split('access-token=')[1])
  console.log(VueCookies.get('access-token') + 'ssssssssssss')
  await api.get(`/api/user`).then(success).catch(fail)
}

// 사용자 등록
async function signup(user, success, fail) {
  await api.post(`/api/user`, JSON.stringify(user)).then(success).catch(fail)
}

// 사용자 정보 조회 ??
// async function check(userid, success, fail) {
//   await api.get(`/api/user/${userid}`).then(success).catch(fail)
// }

// 사용자 정보 조회??
async function mypage(userid, success, fail) {
  // eslint-disable-next-line dot-notation
  api.defaults.headers['Authorization'] =
    sessionStorage.getItem('Authorization')
  await api.get(`/api/user/${userid}`).then(success).catch(fail)
}

// 사용자 수정
async function modifyMember(userObject, success, fail) {
  // eslint-disable-next-line dot-notation
  api.defaults.headers['Authorization'] =
    sessionStorage.getItem('Authorization')
  await api
    .put('/api/user', JSON.stringify(userObject))
    .then(success)
    .catch(fail)
}

// 사용자 삭제
async function deleteMember(userid, success, fail) {
  await api.patch(`/api/user/${userid}`).then(success).catch(fail)
}

// 내 레시피 조회
async function myrecipe(userid, success, fail) {
  await api.get(`/api/use/recipe/${userid}`).then(success).catch(fail)
}

// 내 레시피리스트 조회
async function myrecipeList(userid, success, fail) {
  await api.get(`/api/use/recipeList/${userid}`).then(success).catch(fail)
}

export {
  login,
  signup,
  readUser,
  //   check,
  mypage,
  modifyMember,
  deleteMember,
  myrecipe,
  myrecipeList,
}
