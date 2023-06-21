import { Component } from "react";
import { fetchSearch } from "./api.js";
import {SearchBar} from "./searchBar/searchBar.jsx";
import {ImageGallery} from "./imageGallery/imageGallery.jsx";
import { HTTP_ERR_MSG } from "./constants";
import { LoadMore } from "./imageGallery/loadMore";
import { Audio } from "react-loader-spinner";
import { ErrorMessage } from "./searchBar/errorMessage";
import { Notify } from 'notiflix';

class App extends Component {
  abortCtrl;
  state = {
    images: [],
    loading: false,
    error: null,
    input: "",
    pages: 1,
    isLoading: false
  };

  onSearch = (onInput) => {
    this.setState({ input: onInput });
  };

  async componentDidUpdate(_, nextState) {
    if (
      this.state.input === nextState.input &&
      this.state.pages === nextState.pages
    ) {
      return;
    }
    if (this.state.input !== nextState.input) {
      this.setState({
        images: [],
        pages: 1,
      });
    }

    try {
      const { input, pages } = this.state;
      this.abortCtrl = new AbortController();
      this.setState({ loading: true, error: null });

      const fetchedImages = await fetchSearch(this.abortCtrl, input, pages);
      if (fetchedImages.totalhits) {
        Notify.info(`Hooray! We found ${fetchedImages.totalHits} images.`);
      }
      this.setState(
        (prevImages) => ({
          images: [
            ...prevImages.images,
            ...fetchedImages.hits.map(
              ({ tags, id, largeImageURL, webformatURL }) => ({
                tags,
                id,
                largeImageURL,
                webformatURL,
              })
            ),
          ],
          isLoading: true,
        }),
        () => {
          if (pages !== 1)
            window.scrollBy({
              top: 330 * 3,
              behavior: "smooth",
            });
        }
      );
      if (fetchedImages.hits.length < 12) {
        this.setState({
          isLoading: false,
        });
        Notify.failure('Sorry, that is all results.');
      }
    } catch (error) {
      if (error.code !== "ERR_CANCELED") {
        this.setState({ error: HTTP_ERR_MSG });
      }
    } finally {
      this.setState({ loading: false })
      
    }
  }

  componentWillUnmount() {
    this.abortCtrl.abort();
  }

  addPages = () => {
    this.setState((prevState) => ({
      pages: prevState.pages + 1,
    }));
  };

  render() {
    const { error, images, loading, isLoading } = this.state;
    return (
      <div
        style={{
          width: "auto",
          display: "block",
          fontSize: "40px",
          margin: "auto",
        }}>
        <SearchBar onInput={this.onSearch} />
        {loading && (
          <Audio
            width="auto"
            height="80"
            radius="9"
            color="yellow"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        )}
        <ImageGallery images={images} />

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {isLoading && <LoadMore onClick={this.addPages} />}
      </div>
    );
  }
}

export default App;
