import moment from "moment";
import { supabase } from "../config/supabaseConfig";
import { useSocialContext } from "./SocialContext";

export default function ConfigFunc() {
  const { setPosts } = useSocialContext();
  const fetchFeed = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    if (data) {
      setPosts(data);
    }
    if (error) {
      console.log(error);
    }
  };
  const formatTime = (time) => {
    if (!time) return;
    const formatted = moment(time).startOf("hour").fromNow();
    console.log(moment(time).format("YYYY hh:mm"));
    return formatted;
  };
  return { fetchFeed, formatTime };
}
