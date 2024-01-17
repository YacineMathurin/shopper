"use client";

import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
} from "@coreui/react";
import React, { useEffect, useState } from "react";

type ArticleType = {
  name: string;
  description: string;
  price: string;
  photoLink: string;
};

type LastEvaluatedKey = {
  primaryKey: string;
  sortKey: string;
};

export default function Home() {
  const [articles, setArticles] = useState<ArticleType[] | null>(null);
  const [showMore, setShowMore] = useState(false);
  const url =
    "https://bfok72i0qb.execute-api.eu-west-3.amazonaws.com/v1/articles";
  const [lastEvaluatedKey, setLastEvaluatedKey] =
    useState<LastEvaluatedKey | null>(null);

  useEffect(() => {
    fetch(url, {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        setArticles(res.articles);
        setLastEvaluatedKey(res.lastEvaluatedKey);
        setShowMore(true);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleLoadMore = () => {
    fetch(
      url +
        `?primary-key=${lastEvaluatedKey?.primaryKey}&sort-key=${lastEvaluatedKey?.sortKey}`,
      {
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res?.articles) {
          setLastEvaluatedKey(res?.lastEvaluatedKey);
          setArticles((lastArticles) => [
            ...(lastArticles as ArticleType[]),
            ...res.articles,
          ]);
        } else setShowMore(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="flex">
        {articles?.map((article) => (
          <CCard style={{ width: "18rem" }} key={article.name}>
            <CCardImage orientation="top" src={article.photoLink} />
            <CCardBody>
              <CCardTitle>{article.name}</CCardTitle>
              <CCardText>{article.price}</CCardText>
              <CCardText>{article.description}</CCardText>
              <CButton color="primary" variant="outline" size="sm">
                order now
              </CButton>
            </CCardBody>
          </CCard>
        ))}
      </div>
      <br />
      {showMore && (
        <CButton color="primary" onClick={handleLoadMore}>
          More items
        </CButton>
      )}
    </div>
  );
}
