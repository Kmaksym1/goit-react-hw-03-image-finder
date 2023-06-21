import React from "react";
import { Component } from "react";

import { ImpageGalleryItem } from "./impageGalleryItem";
import css from "./image.module.css";

import { Modale } from "./modal";

export class ImageGallery extends Component {
  state = {
    isModal: false,
    currentImage: {},
  };

  openModal = (id, bool) => {
    this.setState({ isModal: bool });
    this.setState({ isModal: id });
  };
  closeModal = (e) => {
    this.setState({ isModal: false });
  };

  getObj = (id) =>
    this.setState({
      currentImage: this.props.images.find((el) => el.id === id),
      isModal: true,
    });

  render() {
    return (
      <>
        <ul className={css.galleryList}>
          {this.props.images.map((item) => {
            console.log(item.id);

            return (
              <ImpageGalleryItem
                picture={item}
                key={item.id}
                getId={this.getObj}
                isModalTrue={this.openModal}
              />
            );
          })}
        </ul>

        {this.state.isModal && (
          <Modale
            image={this.state.currentImage}
            closeModal={this.closeModal}
            openModal={this.openModal}
          />
        )}
      </>
    );
  }
}

