import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import "./App.css";
import AlbumRatingForm from "./components/AlbumRatingForm";

// Set up Supabase client.
const { VITE_SUPABASE_URL, VITE_SUPABASE_API_KEY } = import.meta.env;
const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_API_KEY);

export default function App() {
  useEffect(() => {
    const fetchGenres = async () => {
      const { data, error } = await supabase.from("genres").select();

      console.log({ data, error });
    };

    fetchGenres(); // Don't forget to call the function!
  }, []);

  return <AlbumRatingForm />;
}
