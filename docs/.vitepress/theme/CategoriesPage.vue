<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { theme } = useData()
const pages = computed(() => theme.value.blog?.pagesData || [])

// 获取所有分类
const categories = computed(() => {
  const result: Record<string, any[]> = {}
  pages.value.forEach((page: any) => {
    const cats = page.meta?.categories || []
    cats.forEach((cat: string) => {
      if (!result[cat]) {
        result[cat] = []
      }
      result[cat].push(page)
    })
  })
  return result
})

// 按文章数量排序
const sortedCategories = computed(() => {
  return Object.entries(categories.value).sort((a, b) => b[1].length - a[1].length)
})

// 获取所有标签
const allTags = computed(() => {
  const tags: Record<string, number> = {}
  pages.value.forEach((page: any) => {
    const pageTags = page.meta?.tag || []
    pageTags.forEach((tag: string) => {
      tags[tag] = (tags[tag] || 0) + 1
    })
  })
  return Object.entries(tags).sort((a, b) => b[1] - a[1])
})
</script>

<template>
  <div class="categories-page">
    <h1>📚 分类</h1>
    
    <!-- 标签云 -->
    <div class="tags-section">
      <h2>🏷️ 标签</h2>
      <div class="tags-cloud">
        <a
          v-for="[tag, count] in allTags"
          :key="tag"
          :href="`/blogs/?tag=${encodeURIComponent(tag)}`"
          class="tag-item"
        >
          {{ tag }}
          <span class="tag-count">({{ count }})</span>
        </a>
      </div>
    </div>

    <!-- 分类列表 -->
    <div class="categories-section">
      <h2>📁 分类列表</h2>
      <div class="category-list">
        <div v-for="[category, posts] in sortedCategories" :key="category" class="category-item">
          <h3 class="category-name">
            <span class="category-icon">📂</span>
            {{ category }}
            <span class="category-count">({{ posts.length }} 篇)</span>
          </h3>
          <ul class="post-list">
            <li v-for="post in posts" :key="post.route" class="post-item">
              <a :href="post.route" class="post-link">
                <span class="post-title">{{ post.meta?.title || '无标题' }}</span>
                <span class="post-date">{{ post.meta?.date?.split(' ')[0] || '' }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="sortedCategories.length === 0" class="empty-state">
      暂无分类
    </div>
  </div>
</template>

<style scoped>
.categories-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
  color: var(--vp-c-brand-1);
}

h2 {
  margin: 20px 0 15px;
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 10px;
}

/* 标签云 */
.tags-section {
  margin-bottom: 40px;
}

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 20px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 0.9em;
  transition: all 0.2s;
}

.tag-item:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.tag-count {
  color: var(--vp-c-text-3);
  font-size: 0.85em;
}

/* 分类列表 */
.category-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.category-item {
  background: var(--vp-c-bg-soft);
  padding: 20px;
  border-radius: 12px;
}

.category-name {
  margin: 0 0 15px 0;
  font-size: 1.2em;
  color: var(--vp-c-brand-1);
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-icon {
  font-size: 1.2em;
}

.category-count {
  font-size: 0.85em;
  color: var(--vp-c-text-3);
  font-weight: normal;
}

.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-item:last-child {
  border-bottom: none;
}

.post-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s;
}

.post-link:hover {
  color: var(--vp-c-brand-1);
}

.post-title {
  font-weight: 500;
}

.post-date {
  font-size: 0.85em;
  color: var(--vp-c-text-3);
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: var(--vp-c-text-2);
}
</style>
