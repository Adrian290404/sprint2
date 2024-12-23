import { Row, Td, Rating, Action} from "./styles/listStyles"
import { formatDate } from "./functions/formatDate"
import { showRating } from "./functions/showRating"
import { useSelector, useDispatch } from "react-redux"
import { fetchReviews } from "../../../features/reviews/reviewsThunks"
import { useEffect } from "react"
import { filterReviews } from "./functions/filterReviews"
import { paginateData } from "./functions/paginateData"

export const ReviewsList = ({ currentPage }) => {
    const dispatch = useDispatch()
    const reviews = useSelector((state) => state.reviews.reviews)
    const { selectedMenu, selectedOption } = useSelector((state) => state.filter)

    const filteredReviews = filterReviews(reviews, selectedMenu, selectedOption)
    const paginatedReviews = paginateData(filteredReviews, 10)[currentPage - 1] || []

    useEffect(() => {
        if (reviews.length === 0) {
            dispatch(fetchReviews())
        }
    }, [dispatch, reviews.length])

    return (
        <>
            {paginatedReviews.map((review) => (
                <Row key={review.order_id} type="body">
                    <Td top>
                        #{review.order_id}
                    </Td>
                    <Td top>
                        {formatDate(review.date)}
                    </Td>
                    <Td top>
                        {review.customer}
                    </Td>
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
    )
}