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

export default function SellerDashboard() {
  protectedPage();
  const [editing, setEditing] = useState(false);
  const [articles, setArticles] = useState<ArticleType[] | null>(null);
  const [showMore, setShowMore] = useState(false);
  const url =
    "https://bfok72i0qb.execute-api.eu-west-3.amazonaws.com/v1/articles";
  const [lastEvaluatedKey, setLastEvaluatedKey] =
    useState<LastEvaluatedKey | null>(null);

  const handleEditing = () => {
    setEditing(true);
  };

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
        <br />
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
  padding-bottom: 5em;
`;

const EditSection = styled.div<{ $editing?: boolean }>`
  border: 1px solid #ccc;
  transition: 0.3s;
  overflow: hidden;
  height: ${(props) => (props.$editing ? "800px" : "0")};
`;
