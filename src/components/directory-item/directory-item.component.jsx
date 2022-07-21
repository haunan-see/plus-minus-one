import { useNavigate } from "react-router-dom";
import "./directory-item.styles.scss";

const DirectoryItem = ({ category }) => {
  const { title, imageUrl, route } = category;
  const navigate = useNavigate();
  const useNavigateHandler = () => navigate(route);

  return (
    <div className="directory-item-container" onClick={useNavigateHandler}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="body">
        <h2>{title}</h2>
        <p>see more</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
