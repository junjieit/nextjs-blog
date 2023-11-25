// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ArticleDetail, saveArticle } from '@/lib/posts'
import {
  getFailedResponse,
  getSuccessResponse,
  ResponseData,
} from '@/utils/response'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<null>>,
) {
  let article: ArticleDetail
  try {
    article = JSON.parse(req.body) as ArticleDetail
    saveArticle({
      ...article,
      id: article.id || article.title,
      date: new Date().getTime(),
      year: new Date().getFullYear(),
      tags: article.tags || [],
    })
    res.status(200).json(getSuccessResponse())
  } catch (error) {
    res.status(500).json(getFailedResponse('params is not valid'))
  }
}
