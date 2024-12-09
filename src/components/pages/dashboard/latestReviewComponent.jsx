import { MdOutlineCheckCircle } from "react-icons/md";
import { MdOutlineBlock } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6"
import { Container, Title, CardsContainer, Card, Text, BottomContainer, InfoContainer, Image, Name, Time, Button } from "./styles/latestReviewStyles"

export const LatestReviewComponent = () => {
    return <Container>
        <Title>Latest Review by Customers</Title>
        <CardsContainer>
            <Card>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</Text>
                <BottomContainer>
                    <InfoContainer>
                        <Image src="https://randomuser.me/api/portraits/men/29.jpg" />
                        <div>
                            <Name>Kusnaidi Anderson</Name>
                            <Time>4m ago</Time>                           
                        </div>
                    </InfoContainer>
                    <div>
                        <Button check>
                            <MdOutlineCheckCircle size={25} />
                        </Button>
                        <Button cross>
                            <MdOutlineBlock size={25} />
                        </Button>                        
                    </div>
                </BottomContainer>
            </Card>
            <Card>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</Text>
                <BottomContainer>
                    <InfoContainer>
                        <Image src="https://randomuser.me/api/portraits/women/29.jpg" />
                        <div>
                            <Name>Bella Saphira</Name>
                            <Time>4m ago</Time>                           
                        </div>                        
                    </InfoContainer>
                    <div>
                        <Button check>
                            <MdOutlineCheckCircle size={25} />
                        </Button>
                        <Button cross>
                            <MdOutlineBlock size={25} />
                        </Button>                        
                    </div>
                </BottomContainer>
            </Card>
            <Card>
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</Text>
                <BottomContainer>
                    <InfoContainer>
                        <Image src="https://randomuser.me/api/portraits/men/30.jpg" />
                        <div>
                            <Name>Thomas Al-Ghazali</Name>
                            <Time>4m ago</Time>                           
                        </div>                        
                    </InfoContainer>
                    <div>
                        <Button check>
                            <MdOutlineCheckCircle size={25} />
                        </Button>
                        <Button cross>
                            <MdOutlineBlock size={25} />
                        </Button>                        
                    </div>
                </BottomContainer>
            </Card>
        </CardsContainer>
        <Button arrow>
            <FaArrowRightLong size={30}/>
        </Button>
    </Container>
}