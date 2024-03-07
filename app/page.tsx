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
import api from "@/infrastructure/services/api";
import { LastEvaluatedKey } from "@/application/shared/types";
import styled from "styled-components";

type ArticleType = {
  name: string;
  description: string;
  price: string;
  photoLink: string;
};

export default function Home() {
  const [articles, setArticles] = useState<ArticleType[] | null>(null);
  const [showMore, setShowMore] = useState(false);

  const [lastEvaluatedKey, setLastEvaluatedKey] =
    useState<LastEvaluatedKey | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.getProducts();

        setArticles(res.articles);
        setLastEvaluatedKey(res.lastEvaluatedKey);
        setShowMore(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleLoadMore = async () => {
    try {
      const res = await api.loadMoreProducts(lastEvaluatedKey);
      if (res?.articles) {
        setLastEvaluatedKey(res?.lastEvaluatedKey);
        setArticles((lastArticles) => [
          ...(lastArticles as ArticleType[]),
          ...res.articles,
        ]);
      } else setShowMore(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <Wrapper>
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
      </Wrapper>
      <LoadMore>
        {showMore && (
          <CButton color="primary" onClick={handleLoadMore}>
            More items
          </CButton>
        )}
      </LoadMore>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  margin-bottom: 2em;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const LoadMore = styled.div`
  text-align: center;
`;
