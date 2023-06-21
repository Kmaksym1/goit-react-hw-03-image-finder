import css from "../imageGallery/image.module.css";
export const ImpageGalleryItem = ({ picture, getId }) => {
  const { id, webformatURL } = picture;
    const handleClick = (id) => {
        getId(id)
    };
    
  return (
    <li className={css.imagesLi} onClick={() => handleClick(id)}>
      {/* <a className={css.galleryLink}> */}
        <img src={webformatURL} alt={id} className={css.imageCard} />
      {/* </a> */}
    </li>
  );
};

