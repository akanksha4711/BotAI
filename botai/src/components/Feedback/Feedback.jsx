import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { HiOutlineLightBulb } from "react-icons/hi";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(215, 199, 244, 0.2)'
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export default function Feedback({open, handleSubmit}) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(open);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'black';
    subtitle.style.fontSize = '22px';
    subtitle.style.textAlign = 'center';
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div ref={(_subtitle) => (subtitle = _subtitle)}><HiOutlineLightBulb size={30}/>Provide Additional Feedback</div>
        {/* <button onClick={closeModal}>close</button> */}
        <form onSubmit={(e) => {
          handleSubmit(e);
          closeModal();
        }} style={{display:'flex', justifyContent:'center', alignItems:'end', flexDirection:'column'}}>
          <textarea name='feedback' style={{width:"50vh", height:"20vh"}} />
          <button type='submit' className='btn'>Submit</button>
        </form>
      </Modal>
    </div>
  );
}