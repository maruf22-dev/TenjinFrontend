import styles from "../styles/Landing.module.css"
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import { useState, useEffect } from 'react'
import TitleBar from "../Components/TitleBar";
import sanityClient from '@sanity/client';
import ImageBuilder from "@sanity/image-url";
import ReactPaginate from 'react-paginate';
import Head from 'next/head'
import Link from 'next/link'

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

const GetCurrentArticleSnippets = (articles) => {
    const formattedDate = (dateString) => {
        let formatted = new Date(dateString).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
        return formatted;

    }

    const renderedArticleSnippets = articles.map((article) =>


        <div key={article.slug.current} className={styles.Snippet}>
            <Head>
                <title>Home</title>
                <meta name="description" content="Blog, Articles from Md. Maruf Bin Salim Bhuiyan. Tenjinbyte, Tenjin, Tech, Productivity" />
            </Head>
            <div className={styles.SnippetTitleContainer}>
                <p>{article.title}</p>
            </div>
            <div className={styles.SnippetImageContainer}>
                {article.mainImage && <img src={urlForImage(article.mainImage)} className={styles.SnippetImage} />}
                {!article.mainImage && <img src="/default.png" className={styles.SnippetImage} />}
            </div>
            <div className={styles.SnippetLinkContainer}>
                <Link href={"../articles/" + article.slug.current}>Read This Article</Link>
            </div>
            <div className={styles.SnippetInfoContainer}>
                <p className={styles.SnippetInfo}>{(article.authorName ? (article.authorName + " | ") : ("")) + formattedDate(article.publishedAt)}</p>
            </div>
        </div>
    );
    return renderedArticleSnippets;
}

export const Landing = ({ articles }) => {


    const [loading, setLoading] = useState(true);
    const [currentpage, SetCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const ITEMS_PER_PAGE = 6;

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }
    useEffect(() => {
        SetCurrentPage(0);
        setPageCount(Math.ceil(articles.length / ITEMS_PER_PAGE));
    }, [articles]);

    async function load() {
        await timeout(750);
        setLoading(false);
    }
    const changePage = ({ selected }) => {
        SetCurrentPage(selected);
    }
    load();

    return (
        <div className={styles.Container}>
            <TitleBar Accent />
            {loading && <Loader />}
            {
                !loading &&
                (<>
                    <div className={styles.Main}>
                        <div className={styles.Left}>
                            <div className={styles.ArticleContainer}>
                                {articles && GetCurrentArticleSnippets(articles.slice(currentpage * ITEMS_PER_PAGE, (currentpage + 1) * ITEMS_PER_PAGE))
                                }


                            </div>
                        </div>
                        <div className={styles.Right}>
                            <div>
                                <div className={styles.AvatarContainer}>
                                    <img className={styles.Avatar} src="/Avatar.png">
                                    </img>
                                </div>
                                <div>
                                    <p className={styles.highlighted}>
                                        Md. Maruf Bin Salim Bhuiyan
                                    </p>
                                    <a className={styles.InfoLink} href="https://marufbinsalim.netlify.app/" target="_blank"  rel="noreferrer">
                                        visit profile.
                                    </a>
                                </div>

                            </div>
                            <div>
                                <p className={styles.highlighted}>
                                    Welcome To My Blog.
                                </p>
                                <p className={styles.InfoText}>
                                    I am a tech enthusiast.
                                    I also am keen on productivity.
                                    So, these two topics would be the focal point of discussion for my blog.
                                    But, I would also love to post articles on things that inspire and interests me.
                                </p>
                            </div>
                            <div>
                                <p className={styles.highlighted}>
                                    Social Media.
                                </p>
                                <Link className={styles.InfoLink} href="https://www.youtube.com/channel/UCtcJ8BsIPcw9oKA_Wkkmgmw" target="_blank"  rel="noreferrer">
                                    Youtube
                                </Link>
                            </div>
                        </div>
                    </div>
                </>)
            }
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={styles.PaginationContainer}
                pageLinkClassName={styles.PaginationLink}
                activeClassName={styles.ActivePaginationLink}
            />
            <Footer />
        </div>
    )
}

// gets the props for the current homepage
export const getServerSideProps = async pageContext => {
    const notApplicable =
    {
        notFound: true
    }

    // generate endpoint and query
    const sanityQuery = encodeURIComponent(`*[_type == "post"]{
          title,
          slug,
          publishedAt,
          mainImage,
          authorName,
          keywords,
          description
      }`);

    const backendURL = `https://moiev6e2.api.sanity.io/v1/data/query/production?query=${sanityQuery}`;
    try {

        const result = await fetch(backendURL).then(response => response.json());
        const articles = result.result;
        if (articles == undefined) {
            return notApplicable;
        }
        articles.sort((a, b) => a.publishedAt < b.publishedAt ? 1 : -1);
        return { props: { articles: articles } };
    }
    catch (err) {
        return notApplicable;

    }
};

export default Landing;
