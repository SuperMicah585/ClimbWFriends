import Button from "react-bootstrap/Button";
import { Modal, Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";

const ClimbsModal = ({ climbsArray, showClimbModal, nameButtonColorArray }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (climbsArray.length > 0) {
      setShow(true);
    }
  }, [climbsArray, showClimbModal]);

  const labelStyle = (item) => {
    return {
      padding: "0.25rem 0.5rem", // smaller padding to look like a label
      borderRadius: "0.25rem", // rounded corners for label effect
      fontSize: "0.75rem", // smaller font size
      textAlign: "center", // center text
      display: "inline-block", // make it inline like a label
      whiteSpace: "nowrap", // prevent text from wrapping to the next line
      overflow: "hidden", // hide any overflowing text
      textOverflow: "ellipsis", // add ellipsis (...) for overflowing text
      color: "white",
      fontFamily: "Comic Sans MS",
      backgroundColor: nameButtonColorArray[item],
    };
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title
            style={{ fontFamily: "Comic Sans MS", color: "#048c7f" }}
          >
            Climbs
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
          {climbsArray.map((item, index) => (
            <div
              key={index}
              style={{ marginTop: "10px", borderBottom: "1px solid lightgrey" }}
            >
              <Card.Title style={{ marginBottom: "10px" }}>
                <div style={{ fontSize: "18px", fontFamily: "Comic Sans MS" }}>
                  {item.name}
                </div>
                <div
                  style={{
                    marginLeft: "5px",
                    marginTop: "5px",
                    fontSize: "10px",
                    color: "grey",
                    fontFamily: "Comic Sans MS",
                  }}
                >
                  {item.grade}
                </div>
              </Card.Title>
              <Card.Text
                style={{
                  marginBottom: "5px",
                  fontStyle: "italic",
                  color: "lightgrey",
                }}
              >
                <div style={{ display: "flex" }}>
                  {item.climber_names.map((climberName, climberIndex) => (
                    <React.Fragment key={climberIndex}>
                      <Button
                        size="sm"
                        variant={nameButtonColorArray[climberName]}
                        style={labelStyle(climberName)}
                      >
                        {climberName}
                      </Button>
                      <div style={{ marginRight: "10px" }}></div>
                    </React.Fragment>
                  ))}
                </div>
              </Card.Text>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ClimbsModal;
