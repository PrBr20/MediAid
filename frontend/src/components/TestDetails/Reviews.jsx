import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthContext from "@/context/AuthContext";
import { useContext, useState, useEffect } from "react";
import ReactStars2 from "react-stars";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/config";
import { set } from "date-fns";
import { useToast } from "@/components/ui/use-toast"
import { MyContext } from "@/context/MyContext";
import { useParams } from "react-router-dom";



const TestReviews = ({test}) => {
  const {toast} = useToast();

  const { state } = useContext(AuthContext);


  // const { id } = useParams();

  const [reviews, setReviews] = useState({
    test: test._id,
    reviewText: "",
    rating: "",
  });

  const [reviewList, setReviewList] = useState([]);

  // console.log(state)

  useEffect(() => {
    const fetchReviews = async () => {
      const res1 = await fetch(`${BASE_URL}/reviewTest?testId=${test._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      if (!res1.ok) {
        throw new Error(result1.message);
      }

      const result1 = await res1.json();

      console.log(result1.data);

      setReviewList(result1.data);
    };

    if (state.user) {
      fetchReviews();
    }
  }, []);
  // console.log(reviews)

  const handleSubmitReview = async () => {
    const res = await fetch(`${BASE_URL}/reviewTest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.token}`,
      },
      body: JSON.stringify(reviews),
    });

    if (!res.ok) {
      toast({
        title: "Review not posted",
        description: "Fillup all fields and try again",
      })
      throw new Error(result.message);
    }
    else {
      toast({
        title: "Review posted",
        description: "Your review has been posted successfully",
      })
    }
    window.location.reload();
  };

  return (
    <div className="bg-slate-100 p-5 flex-col space-y-3 border border-slate-200">
    <h1 className="font-bold text-lg">Reviews</h1>
     {/* all reviews */}
    <div className="flex-col space-y-5 p-5">
      {reviewList.map((review, index) => (
        <div key={index} className="review">
          <div className="flex justify-between space-y-2">
            <div className="flex items-center space-x-5">
              <Avatar className="w-[30px] h-[40px]">
                <AvatarImage src={review.user.photo} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="font-bold">{review.user.name} </p>
            </div>
            <div>
              <ReactStars2
                count={5}
                size={24}
                color2={"#ffd700"}
                value={review.rating}
                edit={false}
              />
            </div>
          </div>

          <div className="pl-12">
            <p className="text-sm">
              {review.reviewText}
            </p>
          </div>
        </div>
      ))}

      
    </div>

    {/* post a review */}

    <h1 className="font-bold text-lg">Leave a review</h1>

    <div className="flex-col space-y-5 p-5">
      <Textarea
        placeholder="Type your review here."
        value={reviews.reviewText}
        onChange={(e) =>
          setReviews({ ...reviews, reviewText: e.target.value })
        }
      />

      <div className="flex justify-between space-y-2">
        <p>Give stars according to your experience : </p>
        <div>
          <ReactStars2
            count={5}
            size={24}
            value={parseInt(reviews.rating)}
            onChange={(val) => setReviews({ ...reviews, rating: val })}
            color2={"#ffd700"}
          />
        </div>
      </div>

      <Button onClick={(e) => handleSubmitReview(e)} className="w-full">
        Post Review
      </Button>
    </div>
  </div>

  );
};
export default TestReviews;

