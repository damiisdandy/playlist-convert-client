import { ChangeEventHandler, FC, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Track from "./track";
import { BsSpotify, BsYoutube, BsApple } from "react-icons/bs";
import { useMutation } from "react-query";
import { axiosInstance } from "../../config";
import toast from "react-hot-toast";

interface PlaylistProps {
  isLoading?: boolean;
  error?: boolean;
  data?: Playlist;
  isDisplay?: boolean;
  setFetchedPlaylist: any;
}

const Playlist: FC<PlaylistProps> = ({
  isLoading,
  error,
  data,
  isDisplay,
  setFetchedPlaylist,
}) => {
  const [playlistName, setPlaylistName] = useState("NEW PLAYLIST");

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPlaylistName(e.target.value);
  };

  const playlistRef = useRef(null);
  const { mutate, isLoading: loading } = useMutation(
    (data) => axiosInstance.post("/generate-playlist", data),
    {
      onError: () => {
        toast.error("Problem generating playlist");
      },
      onSuccess: (data) => {
        setFetchedPlaylist(data.data);
        // @ts-ignore
        playlistRef.current.scrollIntoView();
        toast.success("Playlist generated", {
          icon: "🧞‍♀️",
          style: {
            backgroundColor: "rgba(0,0,0,0.9)",
            color: "#fff",
          },
        });
      },
    }
  );

  return (
    <div className="Playlist" ref={playlistRef}>
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
              {data.platform === "APPLE" ? (
                <BsApple />
              ) : data.platform === "SPOTIFY" ? (
                <BsSpotify />
              ) : (
                <BsYoutube />
              )}
              <img
                src={data.thumbnail}
                alt={data.title}
                className="info-image"
              />
            </div>
            <div className="info-detail">
              {isDisplay ? (
                <input
                  className="name-input"
                  value={playlistName}
                  onChange={onChange}
                  placeholder="Enter playlist name"
                />
              ) : (
                <p className="name">{data.title}</p>
              )}
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
              {!isDisplay && (
                <p className="select">choose streaming platform</p>
              )}
              {!isDisplay ? (
                <div className="converter">
                  {data.platform !== "YOUTUBE" && (
                    <button
                      className="converter-btn yt"
                      disabled={loading}
                      onClick={() =>
                        // @ts-ignore
                        mutate({
                          thumbnail: data.thumbnail,
                          platform: "YOUTUBE",
                          tracks: data.tracks,
                        })
                      }
                    >
                      {loading ? (
                        <AiOutlineLoading3Quarters className="spinner" />
                      ) : (
                        <>
                          <BsYoutube />
                          <span>Youtube</span>
                        </>
                      )}
                    </button>
                  )}
                  {data.platform !== "SPOTIFY" && (
                    <button
                      className="converter-btn spotify"
                      disabled={loading}
                      onClick={() =>
                        // @ts-ignore
                        mutate({
                          thumbnail: data.thumbnail,
                          platform: "SPOTIFY",
                          tracks: data.tracks,
                        })
                      }
                    >
                      {loading ? (
                        <AiOutlineLoading3Quarters className="spinner" />
                      ) : (
                        <>
                          <BsSpotify />
                          <span>Spotify</span>
                        </>
                      )}
                    </button>
                  )}
                  {data.platform !== "APPLE" && (
                    <button
                      className="converter-btn apple"
                      onClick={() => {
                        toast.error("Apple music coming soon", {
                          icon: "🧞‍♂️",
                          style: {
                            backgroundColor: "rgba(0,0,0,0.9)",
                            color: "#fff",
                          },
                        });
                      }}
                    >
                      <BsApple />
                      <span>Apple</span>
                    </button>
                  )}
                </div>
              ) : (
                <button className="converter-btn apple">
                  {data.platform === "SPOTIFY" ? (
                    <BsSpotify />
                  ) : data.platform === "APPLE" ? (
                    <BsApple />
                  ) : (
                    <BsYoutube />
                  )}
                  <span>Signin</span>
                </button>
              )}
            </div>
          </div>
          <div className="Tracks">
            {data.tracks.map((el) => (
              <Track key={el.id} {...el} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Playlist;
