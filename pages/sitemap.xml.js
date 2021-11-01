

const Sitemap = () => {};
export const getServerSideProps = async (pageContext) => {
    let res = pageContext.res;
    const formattedDate = (dateString) => {
        let formatted = new Date(dateString).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
        return formatted;
    }
    // generate endpoint and query
    const sanityQuery = encodeURIComponent(`*[_type == "post"]{
          slug,
          publishedAt,
      }`);
    const backendURL = `https://moiev6e2.api.sanity.io/v1/data/query/production?query=${sanityQuery}`;
    const result = await fetch(backendURL).then(response => response.json());
    const articles = result.result;
    articles.sort((a, b) => a.publishedAt < b.publishedAt ? 1 : -1);
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${articles
        .map((article) => {
                return `
                <url>
                <loc>${ pageContext.req.headers.host + "/articles/" + article.slug.current}</loc>
                <lastmod>${formattedDate(article.publishedAt)}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
                </url>
            `;
            })
            .join("")}
        </urlset>
        `;
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
    return { 
        props: {} 
    };
};

export default Sitemap;