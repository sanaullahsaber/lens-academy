import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useSelected = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: bookedCourse = [] } = useQuery({
    queryKey: ["booked-course", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/booked-course?email=${user?.email}`);
      console.log("res from axios", res);
      return res.data;
    },
  });


  return [bookedCourse, refetch];
};

export default useSelected;