import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Td, Rating, Action } from "./styles/listStyles";
import { formatDate } from "./functions/formatDate";
import { showRating } from "./functions/showRating";
import { fetchReviews } from "../../../features/reviews/reviewsThunks";
import { filterReviews } from "./functions/filterReviews";
import { paginateData } from "./functions/paginateData";
import { RootState, AppDispatch } from "../../../features/store";
import { Review } from "../../../interfaces/review";

interface ReviewsListProps {
  currentPage: number;
}

export const ReviewsList: React.FC<ReviewsListProps> = ({ currentPage }) => {
  const dispatch = useDispatch<AppDispatch>();

  const reviews = useSelector((state: RootState) => state.reviews.reviews);
  const { selectedMenu, selectedOption } = useSelector((state: RootState) => state.filter);

  const filteredReviews = filterReviews(reviews, selectedMenu, selectedOption);
  const validReviews = filteredReviews.filter(
    (review): review is Review => review !== undefined && review !== null
  );
  const paginatedReviews = paginateData(validReviews, 10)[currentPage - 1] || [];

  useEffect(() => {
    if (reviews.length === 0) {
      dispatch(fetchReviews());
    }
  }, [dispatch, reviews.length]);

  return (
    <>
      {paginatedReviews.map((review: Review) => (
        <Row key={review.order_id} className="body">
          <Td top>#{review.order_id}</Td>
          <Td top>{formatDate(review.date)}</Td>
          <Td top>{review.customer}</Td>
          <Td>
            <Rating>{showRating(review.rating)}</Rating>
            {review.review}
          </Td>
          <Td top>
            {review.action === "pending" && (
              <>
                <Action publish>Publish</Action>
                <Action archive>Archive</Action>
              </>
            )}
          </Td>
        </Row>
      ))}
    </>
  );
};