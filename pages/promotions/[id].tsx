type PromotionProp = {
    promotion: any;
}

export async function getServerSideProps(context: any) {

    const { id } = context.params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/promotions/${id}`, {
        headers: {
            "Content-type": "application/json",
            uid: context.req.cookies['uid'],
            client: context.req.cookies['client'],
            "access-token": context.req.cookies['access-token']
        }
    });
    const promotion = await res.json();
    console.log(res)

    return { props: { promotion } };

}


const PromotionShow = ({ promotion }: PromotionProp) => {
    console.log(promotion)

    return (
        <>
            <h1 className="text-3xl">{promotion?.title}</h1>
            <p>{promotion?.content}</p>
        </>
    )
}
export default PromotionShow;
