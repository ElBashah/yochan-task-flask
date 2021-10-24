import React, { useEffect, useState } from "react";
import { db } from "./js/firebase";
import { Button } from "./Login";
import { Link, useHistory } from "react-router-dom"

const Page3 = ({email, name, feedback_id}) => {

    const [feedbacks, setFeedbacks] = useState([])
    const [currentUserFeedback, setCurrentUserFeedback] = useState({})
    const [loading, setLoading] = useState(true)

    const history = useHistory()

    console.log(feedback_id);

    useEffect(() => {

        const retrieve = async () => {
            setLoading(true)
            const data = []
            const db_data = await db.collection(`feedbacks`).get();
            db_data.forEach(doc => data.push(doc.data()))
            setCurrentUserFeedback(data.filter(d => feedback_id === d.feedback_id)[0])
            setFeedbacks(data)
            setLoading(false)
        }

        retrieve()
    }, [])


    return(
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'column',
            padding: '2rem'
        }}>

            {loading
            ? (
                <div style={{display: 'flex', flexDirection: 'row', marginTop: '3rem'}}>
                    <div style={{fontSize: '20', color: '#32a852'}}><b>Loading data from firestore....</b></div>
                </div>
            )
            : (
                <>
                    <div style={{display: 'flex', flexDirection: 'row', marginTop: '3rem'}}>
                        <div style={{fontSize: '20', color: '#32a852'}}><b>Your feedback has been recorded successfully</b></div>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row', marginTop: '0.5rem'}}>
                        <div style={{fontSize: '20'}}><b>Feedback reference no: </b>{feedback_id}</div>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row', marginTop: '1rem'}}>
                        <div style={{fontSize: '20'}}><b>Name:&nbsp;&nbsp;</b></div>
                        <div style={{fontSize: '20'}}>{name}</div>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row', marginTop: '1rem'}}>
                        <div style={{fontSize: '20'}}><b>Email:&nbsp;&nbsp;</b></div>
                        <div style={{fontSize: '20'}}>{email}</div>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row', marginTop: '2rem'}}>
                        <div style={{fontSize: '20'}}><b>Your feedback</b></div>
                    </div>

                    <FeedbackRow feedback={currentUserFeedback} />

                    <div style={{display: 'flex', flexDirection: 'row', marginTop: '2rem'}}>
                        <div style={{fontSize: '20'}}><b>Other users feedback:</b></div>
                    </div>

                    {feedbacks.map(f => {if(f.feedback_id !== feedback_id) return <FeedbackRow feedback={f} />})}

                    <div style={{display: 'flex', flexDirection: 'row', marginTop: '2rem'}}>
                        <Button text={'Home'} size={10} action={() => history.push("/Page1")} />
                    </div>
                </>
            )
            }

            
        </div>
    )
}

const FeedbackRow = ({feedback}) => {

    return(
        <div className={`feedback`}>

            <div className={`h-f`}>
                <div className={`h-f-h`}>STATE 1</div>
                <div className={`h-f-h`}>STATE 2</div>
                <div className={`h-f-h`}>STATE 3</div>
                <div className={`h-f-h`}>STATE 4</div>
                <div className={`h-f-h`}>STATE 5</div>
                <div className={`h-f-h`}>STATE 6</div>
                <div className={`h-f-h`}>STATE 7</div>
            </div>

            <div className={`h-f`}>
                <div className={`f-h`}>{feedback.c1}</div>
                <div className={`f-h`}>{feedback.c2}</div>
                <div className={`f-h`}>{feedback.c3}</div>
                <div className={`f-h`}>{feedback.c4}</div>
                <div className={`f-h`}>{feedback.c5}</div>
                <div className={`f-h`}>{feedback.c6}</div>
                <div className={`f-h`}>{feedback.c7}</div>
            </div>

        </div>
    )
}

export default Page3;