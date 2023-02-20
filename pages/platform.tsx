import Image from 'next/image'
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "lib/auth";
import { UserList } from "components/users/UserList";
import { PromotionList } from "components/promotions/PromotionList";

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps("/auth/base");

export default function Platform(props: any) {

  return (
    <>
      <h1 className="text-3xl">Platform</h1>
      <p className="">name:{props.data?.name}</p>
      <UserList />
      <PromotionList />
    </>
  )
}
