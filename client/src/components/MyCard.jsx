import { Button, Card } from 'react-bootstrap';
import "./MyCard.css"

function MyCard({ image, title, description }) {
    const { Img, Body, Title, Text } = Card;

    return (
        <Card className='w-25 rounded-3'>
            <Img className='card-image object-fit-cover' src={image} />
            <Body>
                <Title>{title}</Title>
                <Text>{description}</Text>
                <Button variant="primary">Add to Cart</Button>
            </Body>
        </Card>
    );
}

export default MyCard;