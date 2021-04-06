import React, { useState, useEffect } from 'react';
import styles from '@/styles/index.module.less';

export default ({ current, total, pageSize }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [first, setFirst] = useState(null);
  const [last, setLast] = useState(null);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const length = Math.ceil(total/pageSize);
    const pages = new Array(length).fill(1).map((_, index) => (index + 1));
    setFirst(pages[0]);
    setLast(pages[pages.length - 1]);
    setPages(pages);
  }, [total, pageSize]);

  useEffect(() => {
    setCurrentPage(current);
  }, [current]);

  const checkCurrentPage = (page) => {
    if (currentPage === page) {
      return `${styles['page-item']} ${styles.active}`;
    }
    return styles['page-item'];
  };

  const handleClickPrev = () => {
    const newPage = currentPage - 1;
    if (newPage < first) {
      return;
    }
    setCurrentPage(newPage);
  };

  const handleClickNext = () => {
    const newPage = currentPage + 1;
    if (newPage > last) {
      return;
    }
    setCurrentPage(newPage);
  };

  const handleJumpNext = () => {
    let newPage = currentPage + 5;
    if (newPage > last) {
      newPage = last;
    }
    setCurrentPage(newPage);
  };

  const handleJumpPrev = () => {
    let newPage = currentPage - 5;
    if (newPage < first) {
      newPage = first;
    }
    setCurrentPage(newPage);
  };

  const renderPageItem = (pageList) =>
    pageList.map(page => {
      const threshold = Math.abs(page - currentPage);
      // should show 5 items
      // current + threshold > last
      // current - threshold < first
      /*if (currentPage - 5 <= first) {
        if (page - first <= 5) {
          return <div key={page} className={checkCurrentPage(page)} onClick={() => setCurrentPage(page)}>{page}</div>;
        }
      } else if (currentPage + 5 >= last) {
        // 
      }*/
      if (threshold >= 3) {
        if (threshold === 3 && !(page === first || page === last)) {
          if (page - currentPage > 0) {
            return <div key={page} className={checkCurrentPage(page)} onClick={handleJumpNext}>...</div>;
          }
          return <div key={page} className={checkCurrentPage(page)} onClick={handleJumpPrev}>...</div>;
        } else if (page === first || page === last) {
          return <div key={page} className={checkCurrentPage(page)} onClick={() => setCurrentPage(page)}>{page}</div>
        }
        return null;
      }
      return <div key={page} className={checkCurrentPage(page)} onClick={() => setCurrentPage(page)}>{page}</div>;
    });

  return (
    <div className={styles['pagination-wrap']}>
      <div className={styles['prev-btn']} onClick={handleClickPrev} />
      <div className={styles['page-list']}>{renderPageItem(pages)}</div>
      <div className={styles['next-btn']} onClick={handleClickNext} />
    </div>
  );
};
