import React, { useState, useRef, useEffect } from 'react';
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

export const AddAdmin = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [matchPwd, setMatchPwd] = useState('');

    const [validName, setValidName] = useState(false);

    useEffect(() => {
        setValidName(USER_REGEX.test(name));
    }, [name])  //if fall under regex test set true or else false 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, pwd)
    }

    return (
        <div>AddAdmin

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">User Name:</label>
                <input type="text" id="name" name="name" required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    aria-describedby="uidnote"
                />
                {/* <div>put proper username  </div> */}
                <p id="uidnote" >
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>

                <label htmlFor="name">Email:</label>
                <input type="text" id="email" name="email" required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <label htmlFor="password">Password:</label>
                <input type="text" id="password" name="password" required
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                />

                <label htmlFor="confirmPass">confirm Password:</label>
                <input type="text" id="confirmPass" name="confirmPass" required
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                />
                <button type='submit'>Sign Up</button>

            </form>

        </div>
    )
}






