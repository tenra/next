import { useCurrentUserContext } from 'lib/CurrentUserContext';

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
            <h1 className="text-3xl">{user?.name}</h1>

            {currentUser && currentUser.id === user.id ?
                (<button className="bg-slate-500">current_user_edit</button>)
            : null}
        </>
    )
}
export default UserShow;
