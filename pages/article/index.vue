<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <ArticleMeta :article="article" />
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body">
        </div>
      </div>
      <hr />
      <div class="article-actions">
        <ArticleMeta :article="article" />
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <ArticleComment :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleBySlug, getArticle } from '@/api/article';
import MarkDownIt from 'markdown-it';
import ArticleMeta from './components/meta';
import ArticleComment from './components/comment'
export default {
  name: 'ArticlePage',
  // 服务端渲染，首屏优化
  async asyncData({ params }) {
    const { data } = await getArticleBySlug(params.slug);
    console.log('wenzhang', data)
    const { article } = data;
    const md = new MarkDownIt()
    // 将markdown转化成html
    article.body = md.render(article.body);
    return {
      article
    }
  },
  components: {
    ArticleMeta,
    ArticleComment
  },
  //  SEO 优化
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description}
      ]
    }
  }
}
</script>

<style>

</style>