import axios from "axios";

export const searchJobs = async filter => {
    return await axios.get("https://159.89.161.233:443/api/jobadds").then(res => {
        return res.data;
    });
};
