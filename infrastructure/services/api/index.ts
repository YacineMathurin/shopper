import { LastEvaluatedKey, SaveProduct } from "@/application/shared/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const urlImageStorage = `${apiUrl}/v1/images`;
const urlProductsStorage = `${apiUrl}/v1/articles`;

export default {
  getProducts: async () => {
    const res = await fetch(urlProductsStorage, { mode: "cors" });

    return res.json();
  },
  loadMoreProducts: async (lastEvaluatedKey: LastEvaluatedKey | null) => {
    const res = await fetch(
      urlProductsStorage +
        `?primary-key=${lastEvaluatedKey?.primaryKey}&sort-key=${lastEvaluatedKey?.sortKey}`,
      {
        mode: "cors",
      }
    );

    return res.json();
  },
  saveProductImage: async (formData: FormData) => {
    const res = await fetch(urlImageStorage, {
      method: "PUT",
      mode: "cors",
      body: formData,
    });

    return res.json();
  },
  saveProduct: async ({sellerId, name, description, price, savedImageObj}: SaveProduct) => {
    await fetch(urlProductsStorage, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sellerId,
        name,
        description,
        price,
        photoLink: savedImageObj.link,
      }),
    });
  },
};
