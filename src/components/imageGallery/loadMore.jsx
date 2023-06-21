// import { Component } from "react";
import css from "../imageGallery/image.module.css";

export const LoadMore =  (props) =>{
    return (
      <button onClick={props.onClick} className={css.loadMore}>Load More</button>
    );
  }
