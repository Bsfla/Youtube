import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

const ReplyComment = ({
  commentList,
  parentCommentId,
  videoId,
  refreshFunction,
}) => {
  const [childCommentNumber, setChildCommentNumber] = useState(1);
  const [openReplyComment, setOpenReplyComment] = useState(false);

  const renderReplyComment = (parentCommentId) => {
    return commentList.map((comment, idx) => (
      <>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment
              comment={comment}
              refreshFunction={refreshFunction}
              postId={videoId}
            />
            <ReplyComment
              refreshFunction={refreshFunction}
              parentCommentId={comment._id}
              commentList={commentList}
              postId={videoId}
            />
          </div>
        )}
      </>
    ));
  };

  const onHandleChange = () => {
    setOpenReplyComment(!openReplyComment);
  };

  return (
    <div>
      {childCommentNumber > 0 && (
        <p
          style={{ fontSize: "14px", margin: 0, color: "gray" }}
          onClick={onHandleChange}
        >
          View {childCommentNumber} more Comment(s);
        </p>
      )}

      {openReplyComment && renderReplyComment(parentCommentId)}
    </div>
  );
};

export default ReplyComment;
