"use client";
import { useState, useEffect } from "react";
import classnames from "classnames/bind";
import { BiSearchAlt } from "react-icons/bi";
import Loader from "@/components/Loader";
import Image from "@/components/Image";
import styles from "./page.module.scss";
import axios from "axios";
import { GET_URL, SEARCH_URL, UNSPLASH_AUTH_HEADER } from "@/lib/constants";

const cx = classnames.bind(styles);

export default function Home() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [emptyText, setEmptyText] = useState("");
  const imagesPerPage = 12;

  useEffect(() => {
    setIsLoading(true);
    if (!isSearching) {
      fetchImages();
    } else {
      fetchSearchResults();
    }
  }, [page]);

  const fetchImages = () => {
    axios
      .get(GET_URL, {
        params: {
          page,
          per_page: imagesPerPage,
        },
        headers: {
          Authorization: UNSPLASH_AUTH_HEADER,
        },
      })
      .then((res) => {
        setImages((prev) => [...prev, ...res.data]);
        if (!res.data) {
          setIsEmpty(true);
          setEmptyText("No images found");
        } else {
          setIsEmpty(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsEmpty(true);
        setEmptyText("Error occurs when trying to fetch images");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchSearchResults = () => {
    axios
      .get(SEARCH_URL, {
        params: {
          query: searchValue,
          page,
          per_page: imagesPerPage,
        },
        headers: {
          Authorization: UNSPLASH_AUTH_HEADER,
        },
      })
      .then((res) => {
        setImages((prev) => [...prev, ...res.data.results]);
        if (!res.data) {
          setIsEmpty(true);
          setEmptyText("No images found");
        } else {
          setIsEmpty(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsEmpty(true);
        setEmptyText("Error occurs when trying to search images");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSearch = () => {
    setIsSearching(true);
    setImages([]);
    setPage(1);
  };

  const handleKeypress = (e) => {
    if (e.which === 13) {
      handleSearch();
    }
  };

  return (
    <main className={cx("main")}>
      <div className={cx("header")}>
        <h1 className={cx("title")}>React with API</h1>
        <img src="/icon.png" className={cx("icon")} />
      </div>
      <div className={cx("search-wrapper")}>
        <input
          className={cx("search-box")}
          placeholder="Search for images"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeypress}
        />
        <button className={cx("search-btn")} onClick={handleSearch}>
          <BiSearchAlt size={20} />
        </button>
      </div>

      <div className={cx("content")}>
        <div className={cx("images-wrapper")}>
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.urls.thumb}
              alt={image.description ? image.description : image.id}
              isLast={index === images.length - 1}
              setNewPage={() => setPage(page + 1)}
            />
          ))}
        </div>
        {isLoading ? <Loader /> : ""}
        {isEmpty ? <p className={cx("empty")}>{emptyText}</p> : ""}
      </div>
    </main>
  );
}
