import { useState } from "react";

function Player({ name, symbol }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(isEditing => !isEditing);
  }

  const handleChange = (e) => {
    setPlayerName(e.target.value);
  }

  let playerNameLabel = <span className="player-name">{playerName}</span>;
  let btnCaption = "Edit";
  if(isEditing) {
    playerNameLabel = <input type="text" value={playerName} onChange={handleChange} required />;
    btnCaption = "Save";
  }

  return (
    <li>
      <span className="player">
        {playerNameLabel}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
}

export default Player;