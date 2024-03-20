import React, { useState } from "react";
import styled from "styled-components";
import Footer from "./Footer";

function Contact({
  contacts,
  currentUser,
  setIsChatSelected,
  setSelectedContact,
}) {
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (idx, contact) => {
    setIsChatSelected(true);
    setCurrentSelected(idx);
    // console.log("contact is ",contact);
    setSelectedContact(contact);
  };

  // console.log("contacts are ",contacts);
  // console.log(currentUser);
  return (
    <>
      <Container>
        <div className="allContacts">
          {contacts.map((contact, idx) => {
            return (
              <div
                key={idx}
                className={`contact ${
                  idx === currentSelected ? "selected" : ""
                } `}
                onClick={() => changeCurrentChat(idx, contact)}
              >
                <img
                  src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                  alt=""
                />
                <p>
                  <b>{contact.username}</b>
                </p>
              </div>
            );
          })}

          {/* {
        contacts.map((contact,idx)=>{
            return <div key={idx} className={`contact ${idx===currentSelected ? "selected":"" } ` } onClick={()=>changeCurrentChat(idx,contact)}>
                <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="" />
                <p  ><b>{contact.username}</b></p>
            </div>
        })
        
    }  */}
        </div>
      </Container>
      {/* <Footer/> */}
    </>
  );
}

export default Contact;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 67vh;

  .allContacts {
    overflow: auto;
  }
  .contact {
    /* width: 100%; */
    display: flex;
    gap: 3vw;
    align-items: center;
    padding: 0.5rem;
    margin: 0.2rem;
    cursor: pointer;

    img {
      width: 10vw;
      height: 10vh;
    }

    p {
      /* font-size: 30px; */
    }
  }

  .selected {
    border: 5px solid #fca9a9;
    border-radius: 30px;
    background-color: rgb(249, 224, 224, 0.5);
    /* background-color: black; */
  }

  .userName {
    display: flex;
    align-items: center;
    margin-top: auto; /* This will push the .userName section to the bottom */
    flex-grow: 1; /* Allow .userName section to grow and take up remaining space */

    img {
      height: 15vh;
    }
  }
`;
