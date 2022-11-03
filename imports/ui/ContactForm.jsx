import React, {useState} from "react";
import {ContactsCollection} from "../api/ContactsCollection";

export const ContactForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const saveContact = (e) => {
        e.preventDefault()
        ContactsCollection.insert({name, email, imageUrl})
        setName('')
        setEmail('')
        setImageUrl('')
    }
    return (
        <form>
            <div>
                <label htmlFor={'name'}>
                    Name
                </label>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    id='name'
                    type={'text'}
                />
            </div>

            <div>
                <label htmlFor={'email'}>
                    Email
                </label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id='email'
                    type={'text'}
                />
            </div>


            <div>
                <label htmlFor={'imageUrl'}>
                    ImageUrl
                </label>
                <input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    id='imageUrl' type={'text'}
                />
            </div>
            <button
                onClick={saveContact}
            >Save Contact</button>
        </form>
    )
}