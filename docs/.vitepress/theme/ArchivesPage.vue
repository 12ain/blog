<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { theme } = useData()
const pages = computed(() => theme.value.blog?.pagesData || [])

const archives = computed(() => {
  const result: Record<string, any[]> = {}
  pages.value.forEach((page: any) => {
    const date = page.meta?.date
    if (date) {
      const year = date.split('/')[0]
      if (!result[year]) {
        result[year] = []
      }
      result[year].push(page)
    }
  })
  return result
})

const sortedYears = computed(() => {
  return Object.keys(archives.value).sort((a, b) => Number(b) - Number(a))
})

const totalArticles = computed(() => pages.value.length)

const getSortedPosts = (year: string) => {
  return archives.value[year].sort((a: any, b: any) => {
    const dateA = a.meta?.date || ''
    const dateB = b.meta?.date || ''
    return dateB.localeCompare(dateA)
  })
}
</script>

<template>
  <div class="archives">
    <h1>归档</h1>
    <p class="archives-count">共 {{ totalArticles }} 篇文章</p>

    <div v-for="year in sortedYears" :key="year" class="year-group">
      <div class="year-badge">{{ year }}</div>
      <div class="year-count">{{ archives[year].length }} 篇</div>
      <ul class="post-list">
        <li v-for="post in getSortedPosts(year)" :key="post.route">
          <a :href="post.route">
            <span class="post-date">{{ post.meta?.date?.split(' ')[0] || '' }}</span>
            <span class="post-title">{{ post.meta?.title || '无标题' }}</span>
            <span v-if="post.meta?.categories?.length" class="post-cat">{{ post.meta.categories[0] }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.archives {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 20px;
}

h1 {
  margin: 0 0 8px;
  font-size: 1.6em;
  color: var(--vp-c-text-1);
}

.archives-count {
  margin: 0 0 32px;
  color: var(--vp-c-text-3);
  font-size: 0.9em;
}

.year-group {
  margin-bottom: 32px;
}

.year-badge {
  display: inline-block;
  padding: 4px 14px;
  background: var(--vp-c-brand-1);
  color: #fff;
  border-radius: 4px;
  font-size: 1em;
  font-weight: 600;
  margin-bottom: 4px;
}

.year-count {
  display: inline-block;
  margin-left: 8px;
  color: var(--vp-c-text-3);
  font-size: 0.85em;
  vertical-align: middle;
}

.post-list {
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
}

.post-list li {
  border-left: 2px solid var(--vp-c-divider);
  margin-left: 7px;
  padding-left: 16px;
  position: relative;
}

.post-list li::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 10px;
  width: 8px;
  height: 8px;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 50%;
}

.post-list li:hover {
  border-left-color: var(--vp-c-brand-1);
}

.post-list li:hover::before {
  background: var(--vp-c-brand-1);
}

.post-list a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: color 0.2s;
}

.post-list a:hover {
  color: var(--vp-c-brand-1);
}

.post-date {
  flex-shrink: 0;
  font-size: 0.8em;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

.post-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.95em;
}

.post-cat {
  flex-shrink: 0;
  font-size: 0.75em;
  padding: 1px 8px;
  background: var(--vp-c-default-soft);
  border-radius: 3px;
  color: var(--vp-c-text-2);
}
</style>
