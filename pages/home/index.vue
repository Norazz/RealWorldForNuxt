<template>
  <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li v-if="user" class="nav-item">
              <nuxt-link class="nav-link" 
                :class="{active: tab === 'your_feed'}" 
                exact 
                :to="{name: 'home', query: { tab: 'your_feed'}}">Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link"
                :class="{active: tab === 'global_feed'}" 
                exact 
                :to="{name: 'home', query: { tab: 'global_feed'}}">Global Feed</nuxt-link>
            </li>
            <li v-if="tag" class="nav-item">
              <nuxt-link class="nav-link"
                :class="{active: tab === 'tag'}" 
                :to="{name: 'home', query: { tab: 'tag', tag: tag}}">#{{ tag }}</nuxt-link>
            </li>
          </ul>
        </div>

        <div v-for="article in articles" 
          :key="article.slug"
          class="article-preview">
          <div class="article-meta">
            <nuxt-link :to="{name: 'profile', params: { username: article.author.username }}"><img :src="article.author.image" /></nuxt-link>
            <div class="info">
              <nuxt-link :to="{name: 'profile', params: { username: article.author.username }}" class="author">{{ article.author.username }}</nuxt-link>
              <span class="date">{{ article.createdAt | date }}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right"
              :disabled="article.disabled"
              :class="{active: article.favorited}"
              @click="handleFavorite(article)">
              <i class="ion-heart"></i> {{ article.favoritesCount}}
            </button>
          </div>
          <nuxt-link  :to="{name: 'article', params: { slug: article.slug }}" class="preview-link">
            <h1>{{ article.title}}</h1>
            <p>{{ article.description}}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>
        <nav>
          <ul class="pagination">
            <li v-for="item in totalPage"
              class="page-item"
              :class="{active: item === page}"
              :key="item">
              <nuxt-link class="page-link" :to="{name: 'home', query: { page: item, tag: $route.query.tag, tab: tab }}">
                {{ item }}
              </nuxt-link>
            </li>
          </ul>
        </nav>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>
          <div class="tag-list">
            <nuxt-link v-for="tag in tags" :key="tag" :to="{name: 'home', query: { tag: tag, tab: 'tag' }}" class="tag-pill tag-default">{{ tag }}</nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import { getArticles, getFeedArticles, addFavorite, deleteFavorite } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'

export default {
  name: 'HomePage',
  async asyncData({ query, store }) {
    const page = Number.parseInt(query.page || 1);
    const limit = 20;
    const { tag, tab } = query;
    const loadArticles = tab === 'your_feed' && store.state.user ? getFeedArticles : getArticles;
    // Promise.all并行执行接口请求，比串行执行没有依赖关系的请求，性能快
    const [ articlesRes, tagRes ] = await Promise.all([
      loadArticles({
        limit: 5,
        offset: limit * (page - 1),
        tag: query.tag
      }),
      getTags()
    ])
    const { articles, articlesCount } = articlesRes.data;
    const { tags } = tagRes.data;
    articles.forEach(article => articles.disabled = false)
    return {
      articles,
      articlesCount,
      tags,
      limit,
      page,
      tag,
      tab: tab || 'global_feed'
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPage() {
      return this.articlesCount / this.limit
    }
  },
  methods: {
    async handleFavorite(article) {
      article.disabled = true;
      
      if (article.favorite) {
        await deleteFavorite(article.slug);
        article.favorited = false
        article.favoritesCount += -1
      } else {
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.disabled = false;
    }
  }
}
</script>

<style>

</style>