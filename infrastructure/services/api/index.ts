type LastEvaluatedKey = {
  primaryKey: string;
  sortKey: string;
};
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export default {
  getProducts: async () => {
    const urlArticle = `${apiUrl}/v1/articles`;
    const res = await fetch(urlArticle, { mode: "cors" });

    return res.json();
  },
  loadMoreProducts: async (lastEvaluatedKey:LastEvaluatedKey|null)=>{
    const res = await fetch(
      `${apiUrl}/v1/articles` +
        `?primary-key=${lastEvaluatedKey?.primaryKey}&sort-key=${lastEvaluatedKey?.sortKey}`,
      {
        mode: "cors",
      }
    )

    return res.json();
  }
};
