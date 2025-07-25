import { useParams } from "react-router";
const Videos = () => {
  const { videoId } = useParams();
  return <div>Videos param = {videoId}</div>;
};
export default Videos;
