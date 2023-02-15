import Image from 'next/image'
import { useEffect, useState } from "react";
import { UserList } from "components/users/UserList";
import { PromotionList } from "components/promotions/PromotionList";

export default function Home() {

  return (
    <>
      <h1>home</h1>
      <UserList />
      <PromotionList />
    </>
  )
}
