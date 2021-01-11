import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';

function Cards({carddata, day}) {
        
    const [dayState, setDay] = useState([]);

    useEffect(() => {
        const records = [];
        carddata.forEach(dow => {
            if(dow.day.toLowerCase()===day.toLowerCase()) {
                records.push(dow);
            }
        })
        records.sort((a, b) => {
             return a.time.split(":")[0]-b.time.split(":")[0];
        })
        setDay(records);
    }, [carddata, day]);
    
    return( 
        <>
        {dayState.map((dow, index) => (
            <Card
                bg="info"
                style={{ width: '18rem' }}
                className="mb-2"
                key={index}
                >
                <Card.Header>{dow.day}</Card.Header>
                <Card.Body>
                <Card.Title>{dow.subname}</Card.Title>
                <Card.Text>
                    {dow.time}
                </Card.Text>
                </Card.Body>
            </Card>
        ))}
        </>
    );
};

export default Cards;
