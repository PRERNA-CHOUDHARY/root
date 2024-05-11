/**
 * @description: This file contains the FeedbackForm component which is used to take feedback from the user.
 */

// Import the modules.
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

// Import the utility functions.
import { BASE_URL, token } from "../../Utils/config";

// Define the FeedbackForm component.
const FeedbackForm = () => {
  // Define the state variables.
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  // Define the function to handle form submission.
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // If the rating or review text is empty, then show an error message.
      if (!rating || !reviewText) {
        setLoading(false);
        return toast.error("Please rate the Therapist");
      }

      // Make a POST request to the server.
      const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, reviewText }),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      setLoading(false);
      toast.success(result.message);
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };
  return (
    <div>
      <form action="">
        <div>
          <h3 className=" text-headingColor text-[16px] leading-6 font-[400] mb-4 ">
            How would you rate the overall experience?
          </h3>
          <div>
            {[...Array(5).keys()].map((_, index) => {
              index += 1;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                  onDoubleClick={() => {
                    setHover(0);
                    setRating(0);
                  }}
                  className={`${
                    index <= ((rating && hover) || hover)
                      ? "text-pinkColor"
                      : "text-gray-400"
                  } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                >
                  <span>
                    <AiFillStar />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-[30px]">
          <h3 className=" text-headingColor text-[16px] leading-6 font-[400] mb-4 ">
            Share your feedback.
          </h3>
          <textarea
            name=""
            id=""
            cols="50"
            rows="5"
            className="border border-solid rounded-md p-4 border-primaryColor focus:outline outline-primaryColor placeholder:text-pink-300 text-pinkColor font-[200]"
            placeholder="Write your feedback here."
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" onClick={handleSubmitReview} className="btn">
          {loading ? <HashLoader size={25} color="#fff" /> : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
