import React, { useState} from "react";
import { formatDate } from "../../Utils/formatDate";
import { AiFillStar } from 'react-icons/ai';
import FeedbackForm from "./FeedbackForm";

const Feedback = ({reviews,totalRating}) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  return (
    <>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-[400] text-headingColor mb-[30px]">
          All reviews({totalRating})
        </h4>
        
        
        {reviews.map((review,index)=>
          { < div key={index} className="flex justify-between gap-10 mb-[30px]">
            <div className="flex gabp-3">
              <figure className="w-10 h-10 rounded-full">
                <img src={review?.user?.photo} alt="" />
              </figure>
              <div>
                <h5 className="text-[16px] leading-6 text-primaryColor">
                  {review?.user?.name}
                </h5>
                <p className="text-[12px] leading-6 text-textColor">
                  {" "}
                  {formatDate(review?.createdAt)}
                </p>
                <p className="text__para__small mt-3 font-medium text-[15px]">
                  {review?.reviewText}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(review?.rating).keys()].map((_, index) => <AiFillStar key={index} color='#db2777' />)}
            </div>
          </div>})}
        
      </div>
      {!showFeedbackForm &&
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}> Give Feedback</button>
        </div>}
      {showFeedbackForm && <FeedbackForm/>}
    </>
  );
};

export default Feedback;
