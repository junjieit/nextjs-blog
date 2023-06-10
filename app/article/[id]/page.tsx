import Header from "@/components/Header";
import { getArticleDetail, getSortedPostsData } from "@/lib/posts";
import Render from "./Render";
import styles from "./page.module.css";
import classNames from "classnames";

interface Props {
  params: {
    id: string;
  };
}

export default async function ArticlePage({ params }: Props) {
  const { id } = params;
  const title = decodeURI(id);
  const markdown = await getArticleDetail(title);

  return (
    <>
      <Header mainStyles={classNames(styles.main, "pt-4")} title={title} />
      <div className={styles.main}>
        <Render markdown={markdown} />
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getSortedPostsData();

  return posts.map((post) => ({
    id: post.id,
  }));
}
