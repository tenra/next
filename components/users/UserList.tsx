import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import Cookies from "js-cookie";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface Users {
    id: number;
    name: string;
}

type UsersGetResponse = Users[];

const fetchUsers = async () => {

    const { data } = await axios.request<UsersGetResponse>({
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_BACK_URL}/users`,
        headers: {
            "Content-type": "application/json",
            uid: Cookies.get("uid"),
            client: Cookies.get("client"),
            "access-token": Cookies.get("access-token")
        },
    });
    return data
}

export const UserList = () => {
    const { data: UserList, isLoading } = useQuery(['users'], fetchUsers)
    console.log(UserList);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <div>
            <h2 className="text-3xl">UserList</h2>
            {UserList?.map(({ id, name }) => (
                <div key={id}>
                    <Link href={`/users/${id}`}>
                        <p>id: {id}</p>
                        <p>name: {name}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};
