import { useState, useEffect } from "react";

const gameParticipants = [
  {
    name: "Pavels Aleksejevs",
    score: 4,
    id: 1,
    favouriteTeam: "Chelsea FC",
    selectedTeams: [],
  },
  {
    name: "Andy Keaveney",
    score: 8,
    id: 2,
    favouriteTeam: "Chelsea FC",
    selectedTeams: [],
  },
  {
    name: "Martin Stevenson",
    score: 7,
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

  // console.log(isSelected);

  useEffect(() => {
    const data = localStorage.getItem("MY_APP");
    // setParticipants(JSON.parse(data));
    // const items = JSON.parse(localStorage.getItem("MY_APP"));
    if (data) setParticipants(JSON.parse(data));
    // return data ? JSON.parse(data) : [];
  }, []);

  // function showFormSelectTeam() {
  //   setSelectTeam((show) => !show);
  // }

  function hideFormSelectTeam() {
    setSelectTeam(false);
  }

  function handleSelection(participant) {
    // showFormSelectTeam();
    // if (participant?.id !== selectedParticipant?.id)
    setSelectTeam((show) => !show);

    setSelectedParticipant((cur) =>
      cur?.id === participant.id ? null : participant
    );
  }

  function handleSubmitForm(e) {
    e.preventDefault();

    hideFormSelectTeam();
    if (selectedParticipant.selectedTeams?.includes(team))
      return alert("You can't select same team twice! Pick different team");
    selectedParticipant.selectedTeams.push(team);

    localStorage.setItem("MY_APP", JSON.stringify(participants));

    console.log(selectedParticipant);
    console.log(participants);

    setSelectedParticipant(null);
  }

  // useEffect(() => {
  //   localStorage.setItem("MY_APP", JSON.stringify(participants));
  //   console.log(participants);
  // }, [participants]);

  function teamSelection(e) {
    setTeam(e.target.value);
  }

  return (
    <div className="App">
      <div className="section--1">
        <ParticipantList
          participants={participants}
          // onShowFormSelectTeam={showFormSelectTeam}
          onHandleSelection={handleSelection}
          selectedParticipant={selectedParticipant}
          setIsSelected={setIsSelected}
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
    </div>
  );
}

// Example
// function Input() {
//   const storedItems = JSON.parse(localStorage.getItem("MY_APP"));

//   const [input, setInput] = useState(storedItems);
//   console.log(input);
//   // useEffect(() => {
//   //   const storedData = window.localStorage.getItem("MY_APP");
//   //   if (storedData !== null) setInput(JSON.parse(storedData));
//   // }, []);

//   useEffect(() => {
//     localStorage.setItem("MY_APP", JSON.stringify(input));
//   }, [input]);

//   function someInput(e) {
//     setInput(e.target.value);
//   }
//   return (
//     <div>
//       <form onSubmit={(e) => e.preventDefault()}>
//         <input type="text" onChange={someInput} />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

function ParticipantList({
  participants,
  onShowFormSelectTeam,
  onHandleSelection,
  selectedParticipant,
  setIsSelected,
}) {
  return (
    <ul className="participant-list">
      {participants.map((participant) => (
        <Participant
          participant={participant}
          key={participant.id}
          score={participant.score}
          onShowFormSelectTeam={onShowFormSelectTeam}
          onHandleSelection={onHandleSelection}
          selectedParticipant={selectedParticipant}
          setIsSelected={setIsSelected}
        />
      ))}
    </ul>
  );
}

function Participant({
  participant,
  score,
  onShowFormSelectTeam,
  onHandleSelection,
  selectedParticipant,
  setIsSelected,
}) {
  const [points, setPoints] = useState(score);

  const isSelected = selectedParticipant?.id === participant?.id;

  function handlePoints() {
    setPoints(() => points + 1);
  }

  return (
    <li
      className={`participant ${
        participant.favouriteTeam === "Chelsea FC"
          ? "chelsea-background"
          : "manutd-background"
      }`}
      key={participant.id}
    >
      <div className="participant-block" onClick={handlePoints}>
        <h3>{participant.name}</h3>
        <p className="points">{points}</p>
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
  // const [team, setTeam] = useState("");

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
