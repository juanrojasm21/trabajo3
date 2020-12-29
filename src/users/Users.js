import React, { useEffect, useState } from 'react';
import HceCarousel from '../hce-carousel/hceCarousel';
import UserSearcher from '../user-searcher/UserSearcher';

function Users() {
  const [imgCarousel, setImgCarousel] = useState(null);
  useEffect(() => {
    fetch(`json/images-carousel.json`)
      .then(res => res.json())
      .then(setImgCarousel)
      .catch(console.error);
  }, []);

  if (imgCarousel) {
    return (
      <>
        <HceCarousel img={imgCarousel} className="mb-5" />
        <UserSearcher></UserSearcher>
      </>
    );
  }
  return null;
}

export default Users;