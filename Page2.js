import React, { useEffect } from "react"
import { useState } from "react"
import { BLUE, WHITE } from "./App"
import { Button } from "./Login"
import { FaHome, FaRobot } from 'react-icons/fa';
import { db } from './js/firebase';
import { Link, useHistory } from "react-router-dom"

function Page2 ({name, email, setCurrentFeedback}) {

    const [selected, setSelected] = useState(1)
    const [feedback, setFeedback] = useState({
        current: 1,
        c1: 0,
        c2: 0,
        c3: 0,
        c4: 0,
        c5: 0,
        c6: 0,
        c7: 0,
        
    })

    const history = useHistory()
    // useEffect(() => {
    //     console.log(feedback);
    // }, [feedback])

    return(
        <>
            <div style={{
                width:'100%',
                height: '100%',
                flexDirection: 'column',
                display:'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                padding: '2rem'
            }}>

                <div style={{
                    width: '25rem',
                    height: '10rem',
                    border: `0.1rem ${BLUE} solid`,
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '1rem'
                }}>

                    <div style ={{width: '100%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column'}}>


                        <div style={{
                            width: '100%',
                            // height: '100%',
                            border: '1px #303030 solid',
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: '1rem'
                        }}>
                            <div style={{display: 'flex', flexDirection:'row'}}>

                                <div className={`cell`}> {selected === '00' ? (<FaRobot />) : (<div>&nbsp;</div>)} <div className={`num`}></div> </div>
                                <div className={`cell`}> {selected === '01' ? (<FaRobot />) : (<div>&nbsp;</div>)} <div className={`num`}></div> </div>
                                <div className={`cell`}> {selected === '02' ? (<FaRobot />) : (<div>&nbsp;</div>)} <div className={`num`}></div> </div>
                                <div className={`cell`}> {selected === 7 ? (<FaRobot />) : (<div><FaHome /></div>)} <div className={`num`}>7</div> </div>

                            </div>

                            <div style={{display: 'flex', flexDirection:'row'}}>

                                <div className={`cell`}> {selected === '10' ? (<FaRobot />) : (<div>&nbsp;</div>)} <div className={`num`}></div> </div>
                                <div className={`cell`}> {selected === '11' ? (<FaRobot />) : (<div>&nbsp;</div>)} <div className={`num`}></div> </div>
                                <div className={`cell`}> {selected === '12' ? (<FaRobot />) : (<div>&nbsp;</div>)} <div className={`num`}></div> </div>
                                <div className={`cell`}> {selected === 6 ? (<FaRobot />) : (<div>&nbsp;</div>)} <div className={`num`}>6</div> </div>

                            </div>

                            <div style={{display: 'flex', flexDirection:'row'}}>

                                <div className={`cell`}> {selected === '20' ? (<FaRobot />) : (<div>&nbsp;</div>)} <div className={`num`}></div> </div>
                                <div className={`cell`}> {selected === '21' ? (<FaRobot />) : (<div>&nbsp;</div>)} <div className={`num`}></div> </div>
                                <div className={`cell`}> {selected === '22' ? (<FaRobot />) : (<div>&nbsp;</div>)} <div className={`num`}></div> </div>
                                <div className={`cell`}> {selected === 5 ? (<FaRobot />) : (<div>&nbsp;</div>)} <div className={`num`}>5</div> </div>

                            </div>

                            <div style={{display: 'flex', flexDirection:'row'}}>

                                <div className={`cell`}> {selected === 1 ? (<FaRobot />) : (<div>&nbsp;</div>)} <div className={`num`}>1</div> </div>
                                <div className={`cell`}> {selected === 2 ? (<FaRobot />) : (<div>&nbsp;</div>)} <div className={`num`}>2</div> </div>
                                <div className={`cell`}> {selected === 3 ? (<FaRobot />) : (<div>&nbsp;</div>)} <div className={`num`}>3</div> </div>
                                <div className={`cell`}> {selected === 4 ? (<FaRobot />) : (<div>&nbsp;</div>)} <div className={`num`}>4</div> </div>

                            </div>

                        </div>
                    
                        <div style ={{width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>

                            <Button text={`Previous state`} size={6} fontSize={13} action={() => {const val = (selected-1) >= 1 ? selected-1 : selected; setSelected(val)}} />
                            <Button text={`Next state`} size={6} fontSize={13} action={() => {const val = (selected+1) <= 7 ? selected+1 : selected; setSelected(val)}} />
                            <Button text={`submit`} size={5} fontSize={13} action={() => submit(feedback, name, email, history, setCurrentFeedback)} />
                        </div>
                        
                    
                    </div>

                    <div style={{display: 'flex', flexDirection:'column', marginLeft: '1rem', alignItems:'center'}}>
                            <div style={{fontSize: '1.2rem'}}>Feedback</div>
                            <br/>
                            <Button text={`+`} size={5} action={() => positiveFeedback(setFeedback, feedback, selected)} />
                            <br/>
                            <Button text={`-`} size={5} action={() => negativeFeedback(setFeedback, feedback, selected)} />
                        </div>

                </div>
                
            </div>
        </>
    )
}

const submit = (feedback, name, email, history, setCurrentFeedback) => {
    const entry_ref = db.collection(`feedbacks`).doc()
    const currentFeedback = {
        feedback_id: entry_ref.id,
        date: new Date(),
        name: name,
        email: email,
        ...feedback
    }
    entry_ref.set(currentFeedback)

    setCurrentFeedback(currentFeedback)

    history.push("/Page3")
}
const positiveFeedback = (setFeedback, feedback, selected) => {
    // console.log("CLICK");
    if(selected === feedback.current) 
        setFeedback({...feedback, [`c${selected}`]: (parseInt(feedback[`c${selected}`]) || 0) + 1, current: selected})
    else
        setFeedback({...feedback, [`c${selected}`]: 1, current: selected})
}

const negativeFeedback = (setFeedback, feedback, selected) => {

    if(selected === feedback.current) 
        setFeedback({...feedback, [`c${selected}`]: (parseInt(feedback[`c${selected}`]) || 0) - 1, current: selected})
    else
        setFeedback({...feedback, [`c${selected}`]: -1, current: selected})
}
export default Page2;