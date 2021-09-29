import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

const Comment = ({ videoId, commentlist, refreshData }) => {
  const user = useSelector((state) => state.user);
  const [commentValue, setCommentValue] = useState("");

  const handleClick = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const variable = {
      content: commentValue,
      writer: user.userData._id,
      postId: videoId,
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

  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />

      {/* Comment List */}
      {commentlist &&
        commentlist.map(
          (comment, idx) =>
            !comment.responseTo && (
              <>
                <SingleComment
                  key={idx}
                  comment={comment}
                  videoId={videoId}
                  refreshData={refreshData}
                />
                <ReplyComment
                  key={idx}
                  commentList={commentlist}
                  videoId={videoId}
                  parentCommentId={comment._id}
                  refreshData={refreshData}
                />
              </>
            )
        )}

      <form style={{ display: "flex", marginTop: "10px" }} onSubmit={onSubmit}>
        <textarea
          style={{
            width: "100%",
            borderRadius: "5px",
            height: "50px",
            resize: "none",
            outline: "none",
            border: "1px solid #90caf9",
          }}
          placeholder="코멘트 작성하세요."
          onChange={handleClick}
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
    </div>
  );
};

export default withRouter(Comment);
