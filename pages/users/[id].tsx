import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import Cookies from "js-cookie";

type UserProp = {
    user: any;
}

export async function getServerSideProps(context: any) {

    const { id } = context.params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/users/${id}`);
    const user = await res.json();

    return { props: { user } };

}


const UserShow = ({ user }: UserProp) => {
    console.log(user)

    return (
        <>
            <h1 className="text-3xl">{user?.name}</h1>
        </>
    )
}
export default UserShow;
