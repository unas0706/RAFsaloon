import { createClient } from '@supabase/supabase-js';

const browserOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
export const APP_URL = (process.env.REACT_APP_APP_URL || browserOrigin).replace(/\/$/, '');

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);
