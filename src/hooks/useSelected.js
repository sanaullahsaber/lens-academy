import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";


const useSelected = () => {
  const { user } = useContext(AuthContext);

  const { refetch, data: bookedCourse = [] } = useQuery({
    queryKey: ["booked-course", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/booked-course?email=${user?.email}`
      );
      return res.json();
    },
  });

  return [bookedCourse, refetch];
}

export default useSelected;
