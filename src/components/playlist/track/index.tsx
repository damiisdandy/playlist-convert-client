import { FC } from "react";

const Track: FC<Track> = ({
  artists,
  duration,
  isExplicit,
  thumbnail,
  url,
  title,
}) => {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="Track">
      <div className="image">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="Track-details">
        <div className="Track-info">
          <p className="title">{title}</p>
          <p className="title-bottom">
            {isExplicit && <span className="explicit">E</span>}
            <span className="artists">By {artists}</span>
          </p>
        </div>
        <p className="duration">{duration}</p>
      </div>
    </a>
  );
};

export default Track;
