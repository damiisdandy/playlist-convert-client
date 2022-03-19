import { FC } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Track from "./track";

interface PlaylistProps {
  isLoading?: boolean;
  error?: boolean;
  data?: Playlist;
}

const Playlist: FC<PlaylistProps> = ({ isLoading, error, data }) => {
  return (
    <div className="Playlist">
      {isLoading ? (
        <div className="loader">
          <AiOutlineLoading3Quarters className="loading" />
          <p>Fetching playlist...</p>
        </div>
      ) : error ? (
        <div className="error">
          <span>💀</span>
          <p>Error fetching playlist!</p>
        </div>
      ) : !data ? (
        <div className="floating-genie">
          <span>🧞‍♀️</span>
          <p>Paste playlist url above</p>
        </div>
      ) : (
        <>
          <div className="info">
            <div className="image">
              <img
                src={data.thumbnail}
                alt={data.title}
                className="info-image"
              />
            </div>
            <div className="info-detail">
              <p className="name">{data.title}</p>
              <p
                className="info"
                dangerouslySetInnerHTML={{
                  __html: data.description,
                }}
              ></p>
              <p className="who">
                Created by {data.author} ({" "}
                <span className="detail">
                  {data.duration} | {data.trackCount} Tracks
                </span>{" "}
                )
              </p>
            </div>
          </div>
          <div className="Tracks">
            {data.tracks.map((el) => (
              <Track key={el.searchKey} {...el} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Playlist;
