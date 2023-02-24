import Image from 'next/image'
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "lib/auth";
import { UserList } from "components/users/UserList";
import { PromotionList } from "components/promotions/PromotionList";

import { Stack, Button } from '@mui/material'

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps("/auth/base");

export default function Platform(props: any) {

  return (
    <>
      <h1 className="text-3xl">Platform</h1>
      <p className="">name:{props.data?.name}</p>
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>

      <UserList />
      <PromotionList />
    </>
  )
}
