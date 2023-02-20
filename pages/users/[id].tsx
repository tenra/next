import { useCurrentUserContext } from 'lib/CurrentUserContext';
import UserEditModal from 'components/users/UserEditModal';
import PromotionNewModal from 'components/promotions/PromotionNewModal';

type UserProp = {
    user: any;
}

export async function getServerSideProps(context: any) {

    const { id } = context.params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/users/${id}`, {
        headers: {
            "Content-type": "application/json",
            uid: context.req.cookies['uid'],
            client: context.req.cookies['client'],
            "access-token": context.req.cookies['access-token']
        }
    });
    if (!res.ok && res.status === 401) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    const user = await res.json();
    console.log(res)

    return { props: { user } };

}

const UserShow = ({ user }: UserProp) => {
    console.log(user)

    const currentUserContext = useCurrentUserContext()
    const {currentUser, setCurrentUser} = currentUserContext;
    //console.log("currentUser", currentUser)

    return (
        <>
            {currentUser && currentUser.id === user.id ? <><UserEditModal />/<PromotionNewModal /></> : null}
            <h1 className="text-3xl">{user?.name}</h1>
            <p>{user?.sentence}</p>
        </>
    )
}
export default UserShow;
