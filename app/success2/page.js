export const dynamic = "force-dynamic"

import dynamicImport from "next/dynamic"

const SuccessClient = dynamicImport(() => import("./SuccessClient"), {
  ssr: false,
})

export default function Page() {
  return <SuccessClient />
}