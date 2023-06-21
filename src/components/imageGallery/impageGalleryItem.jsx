import css from "./image.module.css";
export const ImpageGalleryItem = ({ picture,isModalTrue, getId }) => {
  const { id, webformatURL } = picture;
    const handleClick = (id) => {
        // console.log("Clicked item ID:", id);
        getId(id)
    };
    
  return (
    <li className={css.imagesLi} onClick={() => handleClick(id)}>
      <a className={css.galleryLink}>
        <img src={webformatURL} alt={id} className={css.imageCard} />
      </a>
    </li>
  );
};

