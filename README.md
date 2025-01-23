Calendar Application

Description

This project is a client-side React application that integrates user authentication and Google Calendar API functionality using Supabase. The application allows users to sign in with Google, create calendar events, and manage authentication efficiently. It demonstrates practical usage of modern frontend techniques and tools.

Key Techniques Used

Supabase Authentication

The project uses Supabase to manage user authentication, including signing in with Google and handling OAuth tokens.

Implements useSupabaseClient from @supabase/auth-helpers-react for seamless integration with the Supabase backend.

Google Calendar API Integration

The app interacts directly with the Google Calendar API to create events.

Uses OAuth 2.0 tokens obtained via Supabase for authorized access to user calendars.

React Hooks and Functional Components

useState is used extensively for managing local state, such as event details and date values.

useSession from @supabase/auth-helpers-react handles session management for authenticated users. Learn more about React Hooks on MDN.

Date and Time Handling

The project uses the react-datetime-picker library for selecting event start and end times, simplifying date and time inputs. Learn more about the library here.

Libraries and Technologies

Supabase: A backend-as-a-service that provides authentication, database, and storage.

Google Calendar API: Used for creating calendar events.

React DateTime Picker: A lightweight and easy-to-use date/time picker component.

Bootstrap: (Optional) For styling, as suggested in discussions, but not explicitly included in the code provided.

Intl.DateTimeFormat: Utilized to dynamically fetch the user's timezone. Read more on MDN.
