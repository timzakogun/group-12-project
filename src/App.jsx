import { useState } from 'react';
import './App.css';


function App() {
  const [reminderInput, setReminderInput] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [reminders, setReminders] = useState([]);

  const addReminder = () => {
    if (!reminderInput || !reminderTime) {
      alert('Please fill in both fields.');
      return;
    }

    const newReminder = {
      text: reminderInput,
      time: new Date(reminderTime),
      id: Date.now(),
    };

    setReminders((prev) => [...prev, newReminder]);

    const timeToReminder = newReminder.time.getTime() - new Date().getTime();
    if (timeToReminder > 0) {
      setTimeout(() => {
        alert(`Reminder: ${reminderInput}`);
      }, timeToReminder);
    } else {
      alert('The reminder time is in the past!');
    }

    setReminderInput('');
    setReminderTime('');
  };

  const editReminder = (id) => {
    const reminder = reminders.find((r) => r.id === id);
    if (reminder) {
      setReminderInput(reminder.text);
      setReminderTime(reminder.time.toISOString().slice(0, 16));
      deleteReminder(id);
    }
  };

  const deleteReminder = (id) => {
    setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
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
            {reminder.text} at {reminder.time.toLocaleString()}
            <button className="edit-btn" onClick={() => editReminder(reminder.id)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteReminder(reminder.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
