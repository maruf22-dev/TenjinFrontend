import BlockContent from '@sanity/block-content-to-react';
import ImageBuilder from "@sanity/image-url";
import styles from "../../styles/Article.module.css"
import TitleBar from "../../Components/TitleBar"
import Footer from "../../Components/Footer"
import sanityClient from '@sanity/client';
import Head from 'next/head';
const client = sanityClient({
  projectId: 'moiev6e2',
  dataset: 'production',
  apiVersion: '2021-06-07',
  useCdn: true,
})
const builder = ImageBuilder(client);

function urlForImage(source) {
  return builder.image(source).url();
}
const formattedDate = (dateString) => {
  let formatted = new Date(dateString).toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  return formatted;

}
// article object
export const Article = ({ title, body, image, published, author, description }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <TitleBar />
      <div className={styles.ArticlePage}>
        <div className={styles.mainContainer}>
          {title && <p className={styles.largeParagraph}>{title} </p>}
          {published && <p className={styles.smallParagraph}> {"Published At : " + formattedDate(published)} {author ? (" | " + author) : ("")} </p>}
          {image && <div className={styles.mainImageContainer}><img src={urlForImage(image)} alt="" /></div>}
          {body && <BlockContent className={styles.sanityContainer} blocks={body} projectId={"moiev6e2"} dataset={"production"} imageOptions={{ fit: 'max' }} />}
        </div>
        <div className={styles.AddSpace}>
        </div>
      </div>
      <Footer />
    </>
  )
}
// gets the props for the current slug
export const getServerSideProps = async pageContext => {
  const notApplicable =
  {
    notFound: true
  }
  const slug = pageContext.query.slug;
  // if the slug is null
  if (!slug) {
    return notApplicable;
  }
  // generate endpoint and query
  // const sanityQuery = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"]`);
  const sanityQuery = encodeURIComponent(`*[_type == "post" && slug.current == "${slug}"]{
        title,
        mainImage,
        publishedAt,
        authorName,
        keywords,
        description,
        body[]{
            ..., 
            asset->{
              ...,
              "_key": _id
            }
          }
    }`);
  const backendURL = `https://moiev6e2.api.sanity.io/v1/data/query/production?query=${sanityQuery}`;
  try {
    const result = await fetch(backendURL).then(response => response.json());
    const articleData = result.result[0];
    if (articleData == undefined) {
      return notApplicable;
    }
    const articleProps = { title: null, body: null, image: null, published: null, author: null, keyword: null, description: null };
    if (articleData.title)
      articleProps.title = articleData.title;
    if (articleData.body)
      articleProps.body = articleData.body;
    if (articleData.mainImage)
      articleProps.image = articleData.mainImage;
    if (articleData.publishedAt)
      articleProps.published = articleData.publishedAt;
    if (articleData.authorName)
      articleProps.author = articleData.authorName;
    if (articleData.description)
      articleProps.description = articleData.description;
    return { props: articleProps };
  }
  catch (err) {
    return notApplicable;
  }
};
export default Article;