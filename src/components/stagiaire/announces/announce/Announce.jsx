import React from "react";

const Announce = (props) => {
  return (
    <>
      {props.img && (
        <img src={props.img} alt="Announce" className="announce-image" />
      )}
      <div className="announce-footer">
        {props.desc && <p>{props.desc}</p>}
        Depuis {props.debut} à {props.fin}
      </div>
    </>
  );
};

export default Announce;
