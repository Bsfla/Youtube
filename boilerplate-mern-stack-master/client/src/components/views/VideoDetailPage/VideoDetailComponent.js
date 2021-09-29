import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Comment from "./Section/Comment";

const VideoDetailComponent = (props) => {
  const videoId = props.match.params.videoId;

  const [videoDetail, setVideoDetail] = useState([]);
  const [comments, setComments] = useState([]);

  const refreshData = (newComment) => {
    setComments(comments.concat(newComment));
  };

  useEffect(() => {
    const variable = {
      videoId: videoId,
    };
    axios.post("/api/video/getVideoDetail", variable).then((response) => {
      if (response.data.success) setVideoDetail(response.data.videoDetail);
      else alert("데이터를 불러오는데 실패했습니다");
    });

    axios.post("/api/comment/getComments", variable).then((response) => {
      console.log(response.data);
      if (response.data.success) setComments(response.data.comments);
    });
  }, []);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div
            style={{
              width: "100%",
              padding: "3rem 4rem",
            }}
          >
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${videoDetail.filePath}`}
              controls
            />
            <List.Item>
              <List.Item.Meta avatar title description />
            </List.Item>

            {/* Comment */}
            <Comment
              videoId={videoId}
              commentlist={comments}
              refreshData={refreshData}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default withRouter(VideoDetailComponent);
