import { createClient } from '@supabase/supabase-js';

// In production, auth emails must always return to the deployed application,
// not whatever origin happened to be used when the request was made.
export const APP_URL = (process.env.REACT_APP_APP_URL || window.location.origin).replace(/\/$/, '');

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);
