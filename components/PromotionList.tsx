import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import Cookies from "js-cookie";

interface Promotions {
    userId: number;
    id: number;
    title: string;
    content: string;
}

type PromotionsGetResponse = Promotions[];

const fetchPromotions = async () => {

    const { data } = await axios.request<PromotionsGetResponse>({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_BACK_URL}/promotions`,
      headers: {
          "Content-type": "application/json",
          uid: Cookies.get("uid"),
          client: Cookies.get("client"),
          "access-token": Cookies.get("access-token")
      },
    });
    return data
}

export const PromotionList = () => {
    const { data: PromotionList, isLoading } = useQuery(['promotions'], fetchPromotions)
    console.log(PromotionList);

    if (isLoading) {
      return <div className="loader"></div>;
    }

    return (
      <div>
        {PromotionList?.map(({ id, title, content }) => (
          <div key={id}>
            <p>id: {id}</p>
            <p>title: {title}</p>
            <p>content: {content}</p>
          </div>
        ))}
      </div>
    );
};
