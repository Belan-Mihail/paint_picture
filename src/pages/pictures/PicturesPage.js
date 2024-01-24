import React from "react";
import styles from "../../styles/PicturesPage.module.css";

function PicturesPage({ message, filter = "" }) {
  const [pictures, setPictures] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const { data } = await axiosReq.get(`/pictures/?${filter}`);
        setPictures(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchPictures();
  }, [filter, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}></Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2"></Col>
    </Row>
  );
}

export default PicturesPage;
