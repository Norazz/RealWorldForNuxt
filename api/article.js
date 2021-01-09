import request from '@/utils/request'

export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

export const getFeedArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

export const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情 /api/articles/:slug
export const getArticleBySlug = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}
// 获取文章评论 /api/articles/:slug
export const getArticleComment = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}