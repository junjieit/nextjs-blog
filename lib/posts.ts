import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { formatDate } from '@/utils/date'

const publishDirectory = path.join(process.cwd(), 'posts/publish')
const draftDirectory = path.join(process.cwd(), 'posts/draft')

interface ArticleItem {
  id: string
  title: string
  date: number
  tags: string[]
  categories: string
  year: number
}

export function getCategoryList(articleList: ArticleItem[]) {
  const categorySet = new Set<string>()
  articleList.forEach((article) => categorySet.add(article.categories))
  return Array.from(categorySet).sort()
}

export function getSortedPostsData(filter: { category?: string } = {}) {
  const fileNames = fs.readdirSync(publishDirectory)
  const allPostsData = [] as Array<ArticleItem>
  fileNames.forEach((fileName) => {
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(publishDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    const { data } = matterResult
    const { title, date, tags, categories } = data
    const dateDate = new Date(date)
    const item = {
      id,
      title,
      date: dateDate.getTime(),
      tags,
      categories,
      year: dateDate.getFullYear(),
    } as ArticleItem
    if (filter.category && filter.category !== categories) {
      return
    }
    allPostsData.push(item)
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getArticleDetail(id: string) {
  const fileName = `${id}.md`
  const fullPath = path.join(publishDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  return fileContents
}

export interface ArticleDetail extends ArticleItem {
  markdown: string
  isPublish?: boolean
}

export function saveArticle({
  id,
  title,
  date,
  tags,
  categories,
  markdown,
  isPublish,
}: ArticleDetail) {
  const fileName = `${id}.md`
  const directory = isPublish ? publishDirectory : draftDirectory
  const fullPath = path.join(directory, fileName)
  const matterSplit = '---'
  const matterStr = [
    matterSplit,
    `title: ${title}`,
    `date: ${formatDate(new Date(date))}`,
    `tags: [${tags.join(', ')}]`,
    `categories: ${categories}`,
  ].join('\n')
  const content = [matterStr, markdown].join('\n')
  fs.writeFileSync(fullPath, content)
}
