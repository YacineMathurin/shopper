"use client";

import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
} from "@coreui/react";
import styled from "styled-components";
import AddArticle from "../../views/components/organism/add-article";
import protectedPage from "../auth/protectedPage";
import api from "@/infrastructure/services/api";
import { LastEvaluatedKey } from "@/application/shared/types";

type ArticleType = {
  name: string;
  description: string;
  price: string;
  photoLink: string;
};

export default function SellerDashboard() {
  protectedPage();
  const [editing, setEditing] = useState(false);
  const [articles, setArticles] = useState<ArticleType[] | null>(null);
  const [showMore, setShowMore] = useState(false);

  const [lastEvaluatedKey, setLastEvaluatedKey] =
    useState<LastEvaluatedKey | null>(null);

  const handleEditing = () => {
    setEditing((prev) => !prev);
  };

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
    <Wrapper>
      <h1>My Dashboard</h1>
      <p>
        <CButton
          color="info"
          size="sm"
          onClick={handleEditing}
          variant="outline"
        >
          Add more product
        </CButton>
      </p>
      <EditSection $editing={editing}>
        <AddArticle setEditing={setEditing} />
      </EditSection>
      <div>
        <div className="flex">
          {articles?.map((article) => (
            <CCard style={{ width: "18rem" }} key={article.name}>
              <CCardImage orientation="top" src={article.photoLink} />
              <CCardBody>
                <CCardTitle>{article.name}</CCardTitle>
                <CCardText>{article.price}</CCardText>
                <CCardText>{article.description}</CCardText>
              </CCardBody>
            </CCard>
          ))}
        </div>

        {showMore && (
          <CButton color="primary" onClick={handleLoadMore}>
            More items
          </CButton>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 800px;
`;

const EditSection = styled.div<{ $editing?: boolean }>`
  padding: ${(props) => (props.$editing ? "1em" : "0")};
  border: 1px solid #ccc;
  transition: 0.3s;
  overflow: hidden;
  height: ${(props) => (props.$editing ? "900px" : "0")};

  @media screen and (min-width: 768px) {
    height: ${(props) => (props.$editing ? "600px" : "0")};
  }
`;
