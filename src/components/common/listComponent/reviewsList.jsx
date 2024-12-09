import { Row, Td, Rating, Action} from "./styles/listStyles"
import { formatDate } from "./functions/formatDate"
import { FaStar } from "react-icons/fa"
import { showRating } from "./functions/showRating"

export const ReviewsList = ({ data }) => (
    data.map((review) => (
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
    ))
)