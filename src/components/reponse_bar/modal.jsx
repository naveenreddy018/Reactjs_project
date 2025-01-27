import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './modal.css';
import ImageComponent from '../ImageComponent/image';
import { assets } from '../../assets/assets';
import { photo } from '../interface/setting'; 

function FormModal({ name }) {
  const [displayModal, setDisplayModal] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [rating, setRating] = useState(0);
  const [profilePhoto, setProfilePhoto] = useState(assets.user_icon);

  // Effect to handle photo retrieval and persistence
  useEffect(() => {
    const storedPhoto = localStorage.getItem('profilePhoto');
    const storedOption = localStorage.getItem('selectedOption');
    const storedRating = localStorage.getItem('rating');

    if (storedPhoto) {
      setProfilePhoto(storedPhoto);
    } else if (photo && photo.length > 0) {
      setProfilePhoto(photo[photo.length - 1]);
    } else {
      setProfilePhoto(assets.user_icon);
    }

    if (storedOption) {
      setSelectedOption(storedOption);
    }

    if (storedRating) {
      setRating(Number(storedRating));
    }
  }, []);

  const modalDisplay = () => {
    setDisplayModal(false);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    localStorage.setItem('selectedOption', e.target.value);
  };

  const handleStarClick = (star) => {
    setRating(star);
    localStorage.setItem('rating', star);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOption && rating > 0) {
      modalDisplay();
    } else {
      alert('Please select an option and provide a rating before submitting.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('profilePhoto');
    localStorage.removeItem('selectedOption');
    localStorage.removeItem('rating');
    setProfilePhoto(assets.user_icon);
    setSelectedOption('');
    setRating(0);
  };

  return (
    <div className="modal-container modal show">
      {displayModal && (
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="modal-title-highlight">Hello, {name}!</span>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form className="form-container" onSubmit={handleSubmit}>
              <div className="user-icon">
                <ImageComponent src={profilePhoto} />
              </div>

              <Form.Group className="mb-3">
                <Form.Label className="custom-label">
                  How would you rate our service?
                </Form.Label>
                <div className="radio-options">
                  <Form.Check
                    type="radio"
                    label="Good"
                    name="pollOptions"
                    value="Good"
                    checked={selectedOption === 'Good'}
                    onChange={handleOptionChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Excellent"
                    name="pollOptions"
                    value="Excellent"
                    checked={selectedOption === 'Excellent'}
                    onChange={handleOptionChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Poor"
                    name="pollOptions"
                    value="Poor"
                    checked={selectedOption === 'Poor'}
                    onChange={handleOptionChange}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="custom-label">Rate Us:</Form.Label>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${star <= rating ? 'selected' : ''}`}
                      onClick={() => handleStarClick(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={modalDisplay} className="custom-button">
              Cancel
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit} className="custom-button">
              Submit
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      )}
    </div>
  );
}

export default FormModal;
