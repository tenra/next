import Image from 'next/image'
import { useEffect, useState } from "react";
import { PromotionList } from "components/PromotionList";

export default function Home() {

  return (
    <>
      <h1>home</h1>
      <PromotionList />
    </>
  )
}
