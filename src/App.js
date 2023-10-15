import { useState, useEffect } from "react";

const gameParticipants = [
  {
    name: "Pavels Aleksejevs",
    score: 0,
    id: 1,
    favouriteTeam: "Chelsea FC",
    selectedTeams: [],
  },
  {
    name: "Andy Keaveney",
    score: 0,
    id: 2,
    favouriteTeam: "Chelsea FC",
    selectedTeams: [],
  },
  {
    name: "Martin Stevenson",
    score: 0,
    id: 3,
    favouriteTeam: "Manchester United",
    selectedTeams: [],
  },
];

function Button({ onClick, children }) {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}
export default function App() {
  const [participants, setParticipants] = useState(gameParticipants);
  const [selectTeam, setSelectTeam] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [team, setTeam] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [points, setPoints] = useState(0);
  const [updatePoints, setUpdatePoints] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("MY_APP");
    if (data) setParticipants(JSON.parse(data));
  }, []);

  function hideFormSelectTeam() {
    setSelectTeam(false);
  }

  function handleSelection(participant) {
    setSelectTeam((show) =>
      selectedParticipant?.id === participant.id ? !show : true
    );
    setSelectedParticipant((cur) =>
      cur?.id === participant.id ? null : participant
    );
  }

  function updateScore(player, points) {
    const currentParticipantIndex = participants.findIndex(
      (participant) => participant?.id === player[0]?.id
    );

    const curPlayer = participants[currentParticipantIndex];

    if (curPlayer?.score <= 21) {
      const updatedParticipant = {
        ...curPlayer,
        score: curPlayer.score + points,
      };

      const newParticipants = [...participants];
      newParticipants[currentParticipantIndex] = updatedParticipant;
      setParticipants(newParticipants);
      console.log(curPlayer.score);
      console.log(participants);

      if (curPlayer?.score === 21) {
        alert("You win!");
      }
    }

    if (curPlayer?.score > 21) {
      const updatedParticipant = {
        ...curPlayer,
        score: curPlayer.score - points,
      };

      const newParticipants = [...participants];
      newParticipants[currentParticipantIndex] = updatedParticipant;
      setParticipants(newParticipants);
    }
  }

  function participantLocStorage() {
    localStorage.setItem("MY_APP", JSON.stringify(participants));
  }

  function handleSubmitForm(e) {
    e.preventDefault();

    hideFormSelectTeam();
    if (selectedParticipant.selectedTeams?.includes(team))
      return alert("You can't select same team twice! Pick different team");
    selectedParticipant.selectedTeams.push(team);
    participantLocStorage();

    // console.log(selectedParticipant);
    // console.log(participants);

    setSelectedParticipant(null);
  }

  function teamSelection(e) {
    setTeam(e.target.value);
  }

  function showUpdatePoints() {
    // console.log(
    //   participants.map((person) => console.log(person.selectedTeams))
    // );
    if (participants.map((person) => person.selectedTeams.length > 1)) {
      alert(
        "You can't update points before at least one selection has been made"
      );
    } else {
      setUpdatePoints((show) => !show);
    }

    if (selectTeam === true) alert("Please select League and Team first");
  }

  return (
    <div className="App">
      <h1>Last Man Standing</h1>
      <div className="section--1">
        <ParticipantList
          participants={participants}
          onHandleSelection={handleSelection}
          selectedParticipant={selectedParticipant}
          setIsSelected={setIsSelected}
          points={points}
          onUpdatePoints={setUpdatePoints}
        />
        {selectTeam && (
          <FormSelectTeam
            onHideFormSelectTeam={hideFormSelectTeam}
            onHandleSubmitForm={handleSubmitForm}
            teamSelection={teamSelection}
          />
        )}
      </div>
      <ParticipantsSelectedTeams participants={participants} />
      <div className="update-points">
        <Button onClick={showUpdatePoints}>
          {updatePoints === false ? "Update points" : "Close"}
        </Button>
        {updatePoints && (
          <PointsUpdate
            updateScore={updateScore}
            participants={participants}
            participantLocStorage={participantLocStorage}
          />
        )}
      </div>
      <ClearData setParticipants={setParticipants} />
    </div>
  );
}

function ParticipantList({
  participants,
  onShowFormSelectTeam,
  onHandleSelection,
  selectedParticipant,
  setIsSelected,
  points,
  onUpdatePoints,
}) {
  return (
    <ul className="participant-list">
      {participants.map((participant) => (
        <Participant
          participant={participant}
          key={participant.id}
          onHandleSelection={onHandleSelection}
          selectedParticipant={selectedParticipant}
          onUpdatePoints={onUpdatePoints}
        />
      ))}
    </ul>
  );
}

function Participant({
  participant,
  onHandleSelection,
  selectedParticipant,
  onUpdatePoints,
}) {
  const isSelected = selectedParticipant?.id === participant?.id;

  if (isSelected === true) onUpdatePoints(false);

  return (
    <li
      className={`participant ${
        participant.favouriteTeam === "Chelsea FC"
          ? "chelsea-background"
          : "manutd-background"
      } ${isSelected && "selected"} `}
      key={participant.id}
    >
      <div className="participant-block">
        <h3>{participant.name}</h3>
        <p className="points">{participant.score}</p>
      </div>
      <Button onClick={() => onHandleSelection(participant)}>
        {isSelected ? "Close" : "Pick team"}
      </Button>
      <p>
        Following gameweek team: {[...participant.selectedTeams?.slice(-1)]}
      </p>
      {/* <div>
        <p>{participant.selectedTeams}</p>
      </div> */}
    </li>
  );
}

function FormSelectTeam({ onHandleSubmitForm, teamSelection }) {
  const [league, setLeague] = useState("");

  const premierLeagueTeams = [
    "Arsenal",
    "Aston Villa",
    "Bournemouth",
    "Brentford",
    "Brighton",
    "Burnley",
    "Chelsea",
    "Crystal Palace",
    "Everton",
    "Fulham",
    "Liverpool",
    "Luton Town",
    "Manchester City",
    "Manchester United",
    "Newcastle United",
    "Nottingham Forest",
    "Sheffield United",
    "Tottenham Hotspur",
    "West Ham United",
    "Wolverhampton",
  ];

  const championshipTeams = [
    "Birmingham City",
    "Blackburn Rovers",
    "Bristol City",
    "Cardiff City",
    "Coventry City",
    "Huddersfield Town",
    "Hull City",
    "Ipswich Town",
    "Leeds United",
    "Leicester City",
    "Middlesbrough",
    "Millwall",
    "Norwich City",
    "Plymouth Argyle",
    "Preston North End",
    "Queens Park Rangers",
    "Rotherham United",
    "Sheffield Wednesday",
    "Southampton",
    "Stoke City",
    "Sunderland",
    "Swansea City",
    "Watford",
    "West Bromwich Albion",
  ];

  return (
    <div className="team-selection">
      <form className="team-selection__form" onSubmit={onHandleSubmitForm}>
        <div>
          <label>Select league</label>
          <select
            value={league}
            required
            onChange={(e) => setLeague(e.target.value)}
          >
            <option disabled value="">
              -- League --
            </option>
            <option value="premierLeague">Premier League</option>
            <option value="championship">Championship</option>
          </select>
        </div>

        {league === "premierLeague" && (
          <div>
            <select required onChange={teamSelection}>
              <option disabled selected value="">
                -- Team --
              </option>
              {premierLeagueTeams.map((team) => (
                <option>{team}</option>
              ))}
            </select>
          </div>
        )}

        {league === "championship" && (
          <div>
            <select onChange={teamSelection}>
              <option disabled selected value>
                -- Team --
              </option>
              {championshipTeams.map((team) => (
                <option
                // value={
                //   team[0].toLowerCase() +
                //   team.substring(1).split(" ").join("")
                // }
                >
                  {team}
                </option>
              ))}
            </select>
          </div>
        )}
        <Button>Submit</Button>
      </form>
    </div>
  );
}

function ParticipantsSelectedTeams({ participants }) {
  return (
    <div className="selectedTeams">
      <h3>Selected teams by participant</h3>
      {/* <table className="teamsTable">
        <tr>
          {participants.map((participant) => (
            <th>{participant.name}</th>
          ))}
        </tr>
        <tr>
          {participants.map((teams) => (
            <td className="selectedTeams">{teams.selectedTeams}</td>
          ))}
        </tr>
      </table> */}
      {participants.map((participant) => (
        <p>
          {participant.name} -
          {/* {participants.map((teams) => [...teams.selectedTeams])} */}
          {/* <span>{[...participant.selectedTeams]}</span> */}
          {participant.selectedTeams?.map((teams, i) => (
            <span key={participant.id}>
              {(i ? `, (${i + 1}) ` : "(1) ") + teams}

              {/* {participant.selectedTeams.length < teams[i] ? "," : ""} */}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

function PointsUpdate({ updateScore, participants, participantLocStorage }) {
  const [participant, setParticipant] = useState("");
  const [participantPoints, setParticipantPoints] = useState(null);

  function scoreUpdate(e) {
    e.preventDefault();

    if (!participant) {
      setParticipantPoints(0);
      return;
    }

    updateScore(participant, participantPoints);
    // setParticipant("");
    setParticipantPoints(0);
  }

  console.log(participant);

  return (
    <div className="update-points__form">
      <h3>Adding points</h3>
      <form onSubmit={scoreUpdate} className="update-points__form--main">
        <label>Select participant</label>
        <select
          onChange={(e) =>
            setParticipant(
              participants.filter((person) => person.name === e.target.value)
            )
          }
        >
          <option disabled value="" selected>
            -- Participant --
          </option>
          {participants.map((participant) => (
            <option required key={participant.id} value={participant.name}>
              {participant.name}
            </option>
          ))}
        </select>
        <select
          value={participantPoints}
          onChange={(e) => setParticipantPoints(Number(e.target.value))}
        >
          {Array.from({ length: 11 }, (_, i) => i - 1 + 1).map((num) => (
            <option>{num}</option>
          ))}
        </select>
        <Button onClick={participantLocStorage()}>Add</Button>
      </form>
    </div>
  );
}

function ClearData({ setParticipants }) {
  function dataClear() {
    let result = window.confirm("Are you sure you want to clear all data?");
    if (result) {
      localStorage.removeItem("MY_APP");
    }

    setParticipants(gameParticipants);
    window.location.reload();
  }

  return (
    <div className="reset-data">
      <Button onClick={dataClear}>Reset Data</Button>
    </div>
  );
}
