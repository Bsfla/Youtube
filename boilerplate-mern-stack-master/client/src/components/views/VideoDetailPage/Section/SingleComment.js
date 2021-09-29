import React, { useState } from "react";
import { Comment, Avatar } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import cookieParser from "cookie-parser";

const SingleComment = ({ comment, videoId, refreshData }) => {
  const [openReply, setOpenReply] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const user = useSelector((state) => state.user);

  const onClickReplyOpen = () => {
    setOpenReply(!openReply);
  };

  const onHandleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variable = {
      content: commentValue,
      writer: user.userData._id,
      postId: videoId,
      responseTo: comment._id,
    };

    axios.post("/api/comment/saveComment", variable).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
        refreshData(response.data.result);
      } else {
        alert("댓글 저장 실패");
      }
    });
  };
  const actions = [
    <>
      <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
        Reply to
      </span>
    </>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={comment.writer.name}
        avatar={comment.writer.image}
        content={comment.content}
      />

      {openReply && (
        <form style={{ display: "flex", margin: "20px 0" }} onSubmit={onSubmit}>
          <textarea
            style={{
              width: "70%",
              borderRadius: "5px",
              border: "1px solid #90caf9",
              height: "50px",
              resize: "none",
              outline: "none",
            }}
            onChange={onHandleChange}
            value={commentValue}
            placeholder="코멘트 작성하세요."
          />
          <br />

          <button
            style={{
              width: "20%",
              height: "52px",
              outline: "none",
              marginLeft: "10px",
              backgroundColor: "#bbdefb",
              border: "1px solid #90caf9",
              borderRadius: "5px",
            }}
            onClick={onSubmit}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default SingleComment;
