import React from "react";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "@/context/MyContext";
import AuthContext from "@/context/AuthContext";
import { useParams } from "react-router-dom";
import { BASE_URL } from "@/config";
import { set } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactStars2 from "react-stars";


const MedReview = () => {
  const med = useContext(MyContext);

  const { medid } = useParams();

  const [reviews, setReviews] = useState([]);

  const { state } = useContext(AuthContext);

  // console.log(state)

  useEffect(() => {
    const fetchReviews = async () => {
      const res1 = await fetch(
        `${BASE_URL}/medicine/review?medid=${medid}&user=${state.user._id}`,
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

      setReviews(result1.data);
    };

    if (state.user) {
      fetchReviews();
    }
  }, []);

  return (
    <div className="bg-gray-100 p-3 rounded-lg flex-col space-y-2">
      <div className="flex-col space-y-5 p-5">
        {reviews.map((review, index) => (
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
              <p className="text-sm">{review.reviewText}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedReview;
