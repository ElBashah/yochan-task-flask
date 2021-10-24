import React from "react"
import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { BLUE, WHITE } from "./App"


function Login ({
    email,
    name,
    handleEmailChane,
    handleNamedChane,
}) {

    const history = useHistory()
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
                    flexDirection: 'row',
                }}>
                    <div style={{
                        fontSize: '20px'
                    }}>Email: </div>

                    <TextBox value={email} handler={ handleEmailChane} isPassword={false} />
                </div>

                <div style={{
                    flexDirection: 'row',
                    marginTop: '1rem'
                }}>
                    <div style={{
                        fontSize: '20px'
                    }}>Name: </div>

                    <TextBox value={name} handler={handleNamedChane} isPassword={false} />
                </div>

                <div style={{marginTop: '1rem'}}>
                    <Button text={'Login'} size={17} action={() => history.push("/Page2")} />
                </div>
            </div>
        </>
    )
}

export const Button = ({text, size, action, fontSize, component, to, }) => {

    return(
        <div 
           
            onClick={action}
            style={{
                cursor: 'pointer',
                width: `${size}rem`,
                height: '2rem',
                borderRadius: '0.3rem',
                backgroundColor: BLUE,
                color: WHITE,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: fontSize || '20px'
            }}
        >
            {text}

        </div>
    )
}
export const TextBox = ({isPassword,  handler, value}) => {

    return (
        <div 
            style={{
                width: '17rem',
                height: '1.5rem',
                // padding: '0.3rem',
                backgroundColor: WHITE,
                borderRadius: '0.3rem',
                border: '0.1rem #303030 solid'
            }}>
                <input type={isPassword? 'password' : 'text'}
                onChange={handler}
                // onFocus={handler}
                value={value}
                style={{
                    outline: 'unset',
                    width: '95%',
                    height: '75%',
                    backgroundColor: WHITE,
                    border: 'none'
                }} />
        </div>
    )
}
export default Login;