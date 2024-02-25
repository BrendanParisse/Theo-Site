import { useEffect } from "react";
import emailjs from 'emailjs-com';

const ContactForm = ({ sendEmail }) => {
    useEffect(() => {
        emailjs.init('zJXu_ETgZu0IrsE6W');
    }, []);
    return (
        <div className='Formulaire'>
            <form id='contact_form' onSubmit={sendEmail}>
                <div>
                    <input className='Nom' placeholder='Nom' type="text" name="from_name" id="name" />
                    <input className='Email' placeholder='Mail' type="email" name="from_email" id="email" />
                </div>
                <div>
                    <input className='Sujet' placeholder='Sujet' type="text" name="from_Subject" id="sujet" />
                    <input className='Phone' placeholder='Télèphone' type="text" name="from_Phone" id="Phone" />
                </div>
                <textarea name="message" placeholder='Message' id="message" cols="30" rows="10"></textarea>
                <input className='btn' type="submit" value="Envoyer" id="LoginButton" />
            </form>
        </div>
    );
};

export default ContactForm;