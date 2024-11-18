// import { useState } from "react";
// import "./App.css";

// function App() {
//   const [reminderInput, setReminderInput] = useState("");
//   const [reminderTime, setReminderTime] = useState("");
//   const [reminders, setReminders] = useState([]);

//   const addReminder = () => {
//     if (!reminderInput || !reminderTime) {
//       alert("Please fill in both fields.");
//       return;
//     }

//     const newReminder = {
//       text: reminderInput,
//       time: new Date(reminderTime),
//       id: Date.now(),
//     };

//     setReminders((prev) => [...prev, newReminder]);

//     const timeToReminder = newReminder.time.getTime() - new Date().getTime();
//     if (timeToReminder > 0) {
//       setTimeout(() => {
//         alert(`Reminder: ${reminderInput}`);
//       }, timeToReminder);
//     } else {
//       alert("The reminder time is in the past!");
//     }

//     setReminderInput("");
//     setReminderTime("");
//   };

//   const editReminder = (id) => {
//     const reminder = reminders.find((r) => r.id === id);
//     if (reminder) {
//       setReminderInput(reminder.text);
//       setReminderTime(reminder.time.toISOString().slice(0, 16));
//       deleteReminder(id);
//     }
//   };

//   const deleteReminder = (id) => {
//     setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
//   };

//   return (
//     <div className="container">
//       <h1>Reminder App</h1>
//       <input 
//         type="text"
//         value={reminderInput}
//         onChange={(e) => setReminderInput(e.target.value)}
//         placeholder="Enter your reminder"
//       />
//       <input
//         type="datetime-local"
//         value={reminderTime}
//         onChange={(e) => setReminderTime(e.target.value)}
//       />
//       <button onClick={addReminder}>Add Reminder</button>
//       <ul>
//         {reminders.map((reminder) => (
//           <li key={reminder.id}>
//             {reminder.text} at {reminder.time.toLocaleString()}
//             <button
//               className="edit-btn"
//               onClick={() => editReminder(reminder.id)}
//             >
//               Edit
//             </button>
//             <button
//               className="delete-btn"
//               onClick={() => deleteReminder(reminder.id)}
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;






import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [reminderInput, setReminderInput] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [reminders, setReminders] = useState([]);

  // Request notification permission on load
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const addReminder = () => {
    if (!reminderInput || !reminderTime) {
      alert("Please fill in both fields.");
      return;
    }

    const reminderDateTime = new Date(reminderTime); // Local time conversion
    const now = new Date(); // Current local time
    const timeToReminder = reminderDateTime.getTime() - now.getTime();

    if (timeToReminder <= 0) {
      alert("The reminder time is in the past!");
      return;
    }

    const newReminder = {
      text: reminderInput,
      time: reminderDateTime,
      id: Date.now(),
    };

    setReminders((prev) => [...prev, newReminder]);

    setTimeout(() => {
      showNotification(newReminder.text);
    }, timeToReminder);

    setReminderInput("");
    setReminderTime("");
  };

  const showNotification = (message) => {
    if (Notification.permission === "granted") {
      new Notification("Reminder Alert!", {
        body: message,
        icon: "https://via.placeholder.com/48", // Replace with your custom icon URL
      });
    } else if (Notification.permission === "denied") {
      alert(`Reminder: ${message}`);
    }
  };

  const editReminder = (id) => {
    const reminder = reminders.find((r) => r.id === id);
    if (reminder) {
      setReminderInput(reminder.text);
      setReminderTime(reminder.time.toISOString().slice(0, 16)); // Format for datetime-local
      deleteReminder(id);
    }
  };

  const deleteReminder = (id) => {
    setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
  };

  const formatTo12HourTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM/PM
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div className="container">
      <h1>Reminder App</h1>
      <input
        type="text"
        value={reminderInput}
        onChange={(e) => setReminderInput(e.target.value)}
        placeholder="Enter your reminder"
      />
      <input
        type="datetime-local"
        value={reminderTime}
        onChange={(e) => setReminderTime(e.target.value)}
      />
      <button onClick={addReminder}>Add Reminder</button>
      <ul>
        {reminders.map((reminder) => (
          <li key={reminder.id}>
            {reminder.text} at {formatTo12HourTime(reminder.time)}
            <button
              className="edit-btn"
              onClick={() => editReminder(reminder.id)}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => deleteReminder(reminder.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
