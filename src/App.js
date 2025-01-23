import './App.css';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import DateTimePicker from 'react-datetime-picker';
import { useState, useEffect } from 'react';

function App() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [events, setEvents] = useState([]);
  const [filterDate, setFilterDate] = useState(null);

  const session = useSession(); 
  const supabase = useSupabaseClient(); 
  const { isLoading } = useSessionContext();

  useEffect(() => {
    if (session) {
      fetchEvents(); 
    }
  }, [session]);

  if (isLoading) {
    return <></>;
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar',
      },
    });
    if (error) {
      alert('Error logging in to Google provider with Supabase');
      console.log(error);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function createCalendarEvent() {
    console.log('Creating calendar event');
    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + session.provider_token, 
      },
      body: JSON.stringify(event),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        alert('Event created, check your Google Calendar!');
        fetchEvents(); 
      });
  }

  async function fetchEvents() {
    console.log('Fetching calendar events');
    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + session.provider_token,
      },
    });
    const data = await response.json();
    if (data.error) {
      console.log('Error fetching events:', data.error);
    } else {
      setEvents(data.items.sort((a, b) => new Date(b.start.dateTime) - new Date(a.start.dateTime))); // Sort by most recent
    }
  }

  function getFilteredEvents() {
    if (!filterDate) return events;

    const selectedDate = new Date(filterDate).toDateString();
    return events.filter((event) =>
      new Date(event.start.dateTime).toDateString() === selectedDate
    );
  }

  function EventTable({ events }) {
    return (
      <table className="table table-striped table-bordered table-hover" style={{ marginTop: '20px' }}>
  <thead className="table-dark">
    <tr>
      <th>Event Name</th>
      <th>Description</th>
      <th>Start</th>
      <th>End</th>
    </tr>
  </thead>
  <tbody>
    {events.map((event, index) => (
      <tr key={index}>
        <td>{event.summary || 'No Title'}</td>
        <td>{event.description || 'No Description'}</td>
        <td>{new Date(event.start.dateTime).toLocaleString()}</td>
        <td>{new Date(event.end.dateTime).toLocaleString()}</td>
      </tr>
    ))}
  </tbody>
</table>

    );
  }

  return (
    <div className="App container py-4">
  <h1 className="text-center mb-4">Google Calendar Integration</h1>
  {session ? (
    <>
      <h2 className="mb-4">Welcome, {session.user.email}</h2>
      <div className="mb-4">
        <label className="form-label">Filter by Date:</label>
        <input
          type="date"
          className="form-control"
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>
      <h3>Your Events:</h3>
      <EventTable events={getFilteredEvents()} />
      <div className="mt-5">
        <h3>Create Event:</h3>
        <div className="mb-3">
          <label className="form-label">Event Name:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Event Description:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Start:</label>
          <input
            type="datetime-local"
            className="form-control"
            onChange={(e) => setStart(new Date(e.target.value))}
            value={start.toISOString().slice(0, 16)} // Format for datetime-local input
          />
        </div>
        <div className="mb-3">
          <label className="form-label">End:</label>
          <input
            type="datetime-local"
            className="form-control"
            onChange={(e) => setEnd(new Date(e.target.value))}
            value={end.toISOString().slice(0, 16)} // Format for datetime-local input
          />
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={() => createCalendarEvent()}
        >
          Create Calendar Event
        </button>
      </div>
      <button
        className="btn btn-danger mt-3"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </>
  ) : (
    <button
      className="btn btn-success mt-3"
      onClick={() => googleSignIn()}
    >
      Sign In With Google
    </button>
  )}
</div>

  );
}

export default App;
