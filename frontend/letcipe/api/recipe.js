import { apiInstance, fileInstance } from '.'
// import { fileInstance } from './multipart'

const api = apiInstance()
const fileapi = fileInstance()

// 레시피 상세 조회
async function RecipeDetail(recipeId, success, fail) {
  await api.get(`/api/recipe/${recipeId}`).then(success).catch(fail)
}

// 레시피 등록
async function selectRecipeDetail(formData, success, fail) {
  await fileapi.post(`/api/recipe`, formData).then(success).catch(fail)
}

// 레시피 수정
async function updateRecipeDetail(recipeId, success, fail) {
  await api.put(`/api/recipe/${recipeId}`).then(success).catch(fail)
}

// 레시피 삭제
async function patchRecipeDetail(recipeId, success, fail) {
  await api.patch(`/api/recipe/${recipeId}`).then(success).catch(fail)
}

// 레시피 검색 임시
// async function searchRecipe(success, fail) {
//     await api.get(`/api/recipe`).then(success).catch(fail)
//   }

// 레시피 좋아요
async function countRecipeLikes(success, fail) {
  await api.post(`/api/recipe/like`).then(success).catch(fail)
}

// 레시피 좋아요 해제
async function decountRecipeLikes(success, fail) {
  await api.delete(`/api/recipe/like`).then(success).catch(fail)
}

// 레시피 북마크 설정
async function selectBookmarks(success, fail) {
  await api.post(`/api/recipe/mark`).then(success).catch(fail)
}

// 레시피 북마크 해제
async function deleteBookmarks(success, fail) {
  await api.delete(`/api/recipe/mark`).then(success).catch(fail)
}

// 레시피 댓글 등록
async function selectComment(success, fail) {
  await api.post(`/api/recipe/comment`).then(success).catch(fail)
}

// 레시피 댓글 수정
async function modifyComment(recipeCommentId, success, fail) {
  await api
    .put(`/api/recipe/comment/${recipeCommentId}`)
    .then(success)
    .catch(fail)
}

// 레시피 댓글 삭제
async function deleteComment(recipeCommentId, success, fail) {
  await api
    .delete(`/api/recipe/comment/${recipeCommentId}`)
    .then(success)
    .catch(fail)
}

export {
  RecipeDetail,
  selectRecipeDetail,
  updateRecipeDetail,
  patchRecipeDetail,
  countRecipeLikes,
  decountRecipeLikes,
  selectBookmarks,
  deleteBookmarks,
  selectComment,
  modifyComment,
  deleteComment,
}
 