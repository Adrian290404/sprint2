import { LiaBedSolid } from "react-icons/lia"
import { LuCalendarCheck2 } from "react-icons/lu"
import { TbLogin2 } from "react-icons/tb"
import { TbLogin } from "react-icons/tb"
import { Container, Card, IconContainer, CardNumber, CardText } from "./styles/kpiStyles"

export const KpiComponent = () => {
    return <Container>
        <Card>
            <IconContainer>
                <LiaBedSolid size={30} />
            </IconContainer>
            <div>
                <CardNumber>8,461</CardNumber>
                <CardText>New Booking</CardText>
            </div>
        </Card>
        <Card>
            <IconContainer>
                <LuCalendarCheck2 size={30} />
            </IconContainer>
            <div>
                <CardNumber>963</CardNumber>
                <CardText>Scheduled Room</CardText>
            </div>
        </Card>
        <Card>
            <IconContainer>
                <TbLogin2 size={30} />
            </IconContainer>
            <div>
                <CardNumber>753</CardNumber>
                <CardText>Check In</CardText>
            </div>
        </Card>
        <Card>
            <IconContainer>
                <TbLogin size={30} />
            </IconContainer>
            <div>
                <CardNumber>516</CardNumber>
                <CardText>Check Out</CardText>
            </div>
        </Card>
    </Container>
}